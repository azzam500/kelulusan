import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../services/studentService';
import { Student } from '../types';
import { Users, FileText, Settings, LogOut, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getAllStudents().then(setStudents);
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(filter.toLowerCase()) || 
    s.nisn.includes(filter)
  );

  return (
    <div className="flex-grow flex bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <span className="font-bold text-xl text-emerald-800">Admin Panel</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <a href="#" className="flex items-center px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                    <Users className="w-5 h-5 mr-3" />
                    Data Siswa
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="w-5 h-5 mr-3" />
                    Laporan
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 mr-3" />
                    Pengaturan
                </a>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <Link to="/" className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                </Link>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Data Kelulusan</h1>
                    <p className="text-sm text-gray-500">Kelola data siswa dan status kelulusan tahun ajaran 2023/2024</p>
                </div>
                <div className="flex space-x-3">
                     <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm">
                        + Tambah Data
                     </button>
                     <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Import Excel
                     </button>
                </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="relative w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Cari nama atau NISN..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <span className="text-sm text-gray-500">Total: <strong>{students.length}</strong> Siswa</span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama / NISN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Rata-rata</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => {
                                const avg = (student.grades.reduce((a, b) => a + b.score, 0) / student.grades.length).toFixed(1);
                                return (
                                    <tr key={student.nisn} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={student.photoUrl} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-sm text-gray-500">{student.nisn}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.className}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                student.status === 'LULUS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {avg}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</a>
                                            <a href="#" className="text-red-600 hover:text-red-900">Hapus</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Student, GraduationStatus } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, Download, ArrowLeft, Printer, Share2 } from 'lucide-react';
import { generateSKL } from '../utils/pdfGenerator';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student as Student | undefined;
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!student) {
      navigate('/');
      return;
    }

    if (student.status === GraduationStatus.PASS) {
      // Fire confetti
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [student, navigate]);

  const handleDownload = async () => {
    if (!student) return;
    setDownloading(true);
    await generateSKL(student);
    setDownloading(false);
  };

  if (!student) return null;

  const isPassed = student.status === GraduationStatus.PASS;

  return (
    <div className="flex-grow bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Pencarian
            </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Status */}
          <div className={`p-8 text-center relative overflow-hidden ${isPassed ? 'bg-emerald-600' : 'bg-red-600'}`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
                {isPassed ? (
                    <CheckCircle className="w-20 h-20 mb-4 drop-shadow-md" />
                ) : (
                    <XCircle className="w-20 h-20 mb-4 drop-shadow-md" />
                )}
                <h2 className="text-xl md:text-2xl font-semibold opacity-90">Status Kelulusan Anda</h2>
                <h1 className="text-4xl md:text-6xl font-black mt-2 tracking-wide drop-shadow-lg">
                    {student.status}
                </h1>
                {isPassed && (
                    <p className="mt-4 text-emerald-100 max-w-lg mx-auto">
                        Selamat! Anda telah menyelesaikan jenjang pendidikan SMA dengan baik. Sukses untuk langkah selanjutnya!
                    </p>
                )}
                {!isPassed && (
                    <p className="mt-4 text-red-100 max-w-lg mx-auto">
                        Jangan patah semangat. Hubungi pihak sekolah untuk informasi lebih lanjut mengenai perbaikan nilai atau ujian susulan.
                    </p>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
             {/* Sidebar: Photo & Actions */}
             <div className="bg-gray-50 p-8 border-r border-gray-100 flex flex-col items-center text-center">
                <div className="w-40 h-52 bg-gray-200 rounded-lg shadow-md mb-6 overflow-hidden">
                    {student.photoUrl ? (
                        <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Photo</div>
                    )}
                </div>
                
                <div className="w-full space-y-3">
                    <button 
                        onClick={handleDownload}
                        disabled={downloading}
                        className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition-all hover:shadow-md disabled:opacity-70"
                    >
                        {downloading ? (
                             <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : (
                             <Download className="w-4 h-4 mr-2" />
                        )}
                        Unduh SKL (PDF)
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm transition-all"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Cetak Halaman
                    </button>
                </div>
             </div>

             {/* Main Content: Bio & Grades */}
             <div className="md:col-span-2 p-8">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6">Identitas Siswa</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600 mb-8">
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Nama Lengkap</span>
                        <span className="text-gray-900 font-medium text-lg">{student.name}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Kelas</span>
                        <span className="text-gray-900 font-medium text-lg">{student.className}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">NISN</span>
                        <span className="text-gray-900 font-medium text-lg">{student.nisn}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Nomor Ujian</span>
                        <span className="text-gray-900 font-medium text-lg">{student.examNumber}</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Tempat, Tanggal Lahir</span>
                        <span className="text-gray-900 font-medium text-lg">
                            {student.birthPlace}, {new Date(student.birthDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                        </span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Daftar Nilai</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Mata Pelajaran</th>
                                <th className="px-4 py-3 text-right rounded-r-lg">Nilai Ujian</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {student.grades.map((grade, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-700">{grade.subject}</td>
                                    <td className="px-4 py-3 text-right font-bold text-emerald-700">{grade.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                    <strong>Catatan:</strong> Dokumen SKL yang diunduh melalui halaman ini bersifat sementara. Ijazah asli dapat diambil di sekolah sesuai jadwal yang ditentukan oleh bagian Tata Usaha.
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;
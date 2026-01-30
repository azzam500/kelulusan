import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { Search, Lock, AlertCircle, Info } from 'lucide-react';
import { getStudentByQuery } from '../services/studentService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Set default date to the past to show "Open" state immediately for demo, 
  // or set to future to show countdown. 
  // Let's set it to a future date relative to "now" but provide a dev override.
  // actually, for the best user experience in this context, let's defaults to OPEN 
  // but allow a reset via a small hidden interaction or just default to Open.
  // Requirements say "Before countdown reaches zero...". 
  // I'll default to a date in the past so the UI is usable immediately.
  const [targetDate, setTargetDate] = useState<Date>(new Date(Date.now() - 1000)); 
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCountdownComplete = () => {
    setIsAnnouncementOpen(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      const student = await getStudentByQuery(query);
      if (student) {
        navigate('/result', { state: { student } });
      } else {
        setError('Data siswa tidak ditemukan. Periksa NISN/No. Ujian Anda.');
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Dev helper to reset timer
  const resetTimer = () => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + 10);
    setTargetDate(d);
    setIsAnnouncementOpen(false);
  };

  return (
    <div className="flex-grow flex flex-col relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            <div className="absolute top-0 -left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-3xl">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Portal Resmi Kelulusan
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-serif tracking-tight">
            Pengumuman Kelulusan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              Angkatan 2024
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Selamat datang di laman resmi pengumuman kelulusan SMA Negeri 1 Padangan. 
            Silakan pantau hitung mundur di bawah ini untuk mengakses hasil kelulusan.
          </p>
        </div>

        {/* Countdown / Status Section */}
        <div className="w-full mb-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/10 blur-3xl"></div>

            <Countdown targetDate={targetDate} onComplete={handleCountdownComplete} />
        </div>

        {/* Search Section - Conditionally Rendered/Locked */}
        <div className={`w-full max-w-xl transition-all duration-700 ease-in-out transform ${isAnnouncementOpen ? 'opacity-100 translate-y-0' : 'opacity-60 scale-95 grayscale'}`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative">
                
                {!isAnnouncementOpen && (
                    <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-2xl text-center p-6">
                        <Lock className="w-12 h-12 text-gray-400 mb-3" />
                        <h3 className="text-xl font-bold text-gray-700">Akses Terkunci</h3>
                        <p className="text-gray-500 mt-2">Formulir pencarian akan terbuka otomatis setelah hitung mundur selesai.</p>
                        <button onClick={resetTimer} className="mt-4 text-xs text-emerald-600 underline hover:text-emerald-800">
                            (Demo: Reset Timer 10s)
                        </button>
                    </div>
                )}

                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Search className="w-6 h-6 mr-2 text-emerald-600" />
                    Cek Status Kelulusan
                </h3>

                <form onSubmit={handleSearch} className="space-y-5">
                    <div>
                        <label htmlFor="nisn" className="block text-sm font-medium text-gray-700 mb-2">
                            Masukkan NISN atau Nomor Ujian
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="nisn"
                                placeholder="Contoh: 1234567890"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                disabled={!isAnnouncementOpen || loading}
                                className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {loading && (
                                <div className="absolute right-4 top-3.5">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            *Pastikan data yang dimasukkan sesuai dengan kartu ujian.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start text-sm">
                            <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isAnnouncementOpen || loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none disabled:shadow-none"
                    >
                        {loading ? 'Memeriksa Data...' : 'Lihat Hasil'}
                    </button>
                </form>
            </div>
        </div>
        
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-start space-x-4">
                <Info className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-800">Layanan Bantuan</h4>
                    <p className="text-sm text-gray-600 mt-1">Jika mengalami kendala teknis atau data tidak ditemukan, hubungi panitia via WhatsApp: <strong>0812-3456-7890</strong>.</p>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-800">Peringatan Penting</h4>
                    <p className="text-sm text-gray-600 mt-1">Dilarang melakukan konvoi atau corat-coret seragam. Rayakan kelulusan dengan hal positif dan bermanfaat.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
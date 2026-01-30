import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GraduationCap, Phone, MapPin, Instagram, Globe } from 'lucide-react';

const Navbar: React.FC = () => (
  <nav className="bg-emerald-900 text-white shadow-xl sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-full">
                <GraduationCap className="h-6 w-6 text-emerald-900" />
            </div>
            <Link to="/" className="font-serif font-bold text-lg md:text-xl tracking-wide">
                SMAN 1 PADANGAN
            </Link>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-emerald-200 transition-colors">Beranda</Link>
          <Link to="/admin" className="hover:text-emerald-200 transition-colors">Admin</Link>
        </div>
      </div>
    </div>
  </nav>
);

const Footer: React.FC = () => (
  <footer className="bg-emerald-950 text-emerald-100 pt-12 pb-6 border-t border-emerald-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4 font-serif">SMAN 1 PADANGAN</h3>
          <p className="text-sm leading-relaxed opacity-80">
            Mewujudkan generasi cerdas, berkarakter, dan berdaya saing global dengan berlandaskan iman dan taqwa.
          </p>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Kontak Kami</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>Jl. Dr. Soetomo No. 2, Padangan, Kab. Bojonegoro, Jawa Timur</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>(0353) 551486</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Sosial Media</h3>
          <div className="flex space-x-4">
             <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Globe className="h-5 w-5" />
             </a>
             <a href="#" className="p-2 bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors">
                <Instagram className="h-5 w-5" />
             </a>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-emerald-900 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} SMA Negeri 1 Padangan. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
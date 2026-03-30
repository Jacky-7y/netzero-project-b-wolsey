import { useState } from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-dark text-white py-5 sticky top-0 z-[1000]">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-widest uppercase text-white">
          Antique Alley
        </Link>
        <nav>
          <ul className={`max-md:absolute max-md:top-[70px] max-md:right-5 max-md:bg-brand-dark max-md:p-5 max-md:rounded-lg flex gap-8 items-center ${isOpen ? 'flex' : 'max-md:hidden'}`}>
            <li><Link to="/" className="hover:text-brand-gold">Home</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">About</Link></li>
            <li>
              <Link to="/admin" className="text-brand-gold border border-brand-gold px-3 py-1 rounded hover:bg-brand-gold hover:text-white transition-all">
                Admin
              </Link>
            </li>
            <li><Link to="/contact" className="btn-primary">Visit Us</Link></li>
          </ul>
          <div className="hidden max-md:block text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>☰</div>
        </nav>
      </div>
    </header>
  );
}
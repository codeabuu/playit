
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
  <img 
    src="/youthupsbg.png" // Replace with your logo path
    alt="SportsAid Logo"
    className="h-10.5 w-10" // Adjust size as needed
  />
  <span className="font-heading font-bold text-xl">SportsAid</span>
</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/campaigns" className="font-medium hover:text-primary transition-colors">
            Campaigns
          </Link>
          <Link to="/about" className="font-medium hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          <Button asChild>
            <Link to="/campaigns">Donate Now</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/campaigns" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Campaigns
            </Link>
            <Link 
              to="/about" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button asChild className="w-full mt-2">
              <Link to="/campaigns" onClick={toggleMenu}>Donate Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

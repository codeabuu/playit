
import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="text-primary" size={24} />
              <span className="font-heading font-bold text-xl">SportsAid</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Empowering youth through sports. We help local teams raise funds for equipment, 
              uniforms, and travel expenses so young athletes can focus on their passion.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="Twitter"
              >
                t
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="Instagram"
              >
                i
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-gray-600 hover:text-primary transition-colors">All Campaigns</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Sports Avenue, Athletic City, AC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:contact@sportsaid.org" className="text-gray-600 hover:text-primary transition-colors">
                  contact@sportsaid.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SportsAid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

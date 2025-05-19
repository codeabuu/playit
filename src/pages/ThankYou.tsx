
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Share } from 'lucide-react';

const ThankYou = () => {
  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="container-custom py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <Heart className="inline-block text-primary" size={60} />
          </div>
          
          <h1 className="font-heading text-4xl font-bold mb-6">Thank You for Your Support!</h1>
          
          <p className="text-xl mb-6">
            Your generous donation will help young athletes achieve their dreams
            and experience the joy and benefits of team sports.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="font-heading text-xl font-semibold mb-2">What Happens Next?</h2>
            <p className="text-gray-700 mb-0">
              You'll receive an email receipt for your donation shortly. The team will be notified
              of your support, and they'll provide updates on how your donation is making a difference.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="font-heading text-lg font-medium mb-4">Help spread the word!</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={18} />
                <span>Share on Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={18} />
                <span>Share on Twitter</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={18} />
                <span>Email to a Friend</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/campaigns">Support More Teams</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;

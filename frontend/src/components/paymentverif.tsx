import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyDonation } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, XCircle, Heart, Trophy, Users } from 'lucide-react';

const DonationVerify = () => {
  const { reference } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(8); // Longer to read the message

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus('error');
        setMessage('Missing payment reference');
        return;
      }

      try {
        const result = await verifyDonation(reference);
        setMessage(result.message || 'Your donation is changing young lives!');
        setStatus(result.status ? 'success' : 'error');
        
        if (result.status) {
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/campaigns');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('We hit a snag verifying your donation. Our team has been notified.');
      }
    };

    verify();
  }, [reference, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {status === 'loading' && (
          <div className="p-8 text-center">
            <motion.div variants={itemVariants}>
              <div className="flex justify-center mb-6">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Generous Gift</h2>
              <p className="text-gray-600">We're confirming your donation to help young athletes</p>
            </motion.div>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-6 text-white text-center">
              <motion.div variants={itemVariants}>
                <Heart className="h-12 w-12 mx-auto mb-4 fill-current" />
                <h1 className="text-3xl font-bold mb-2">From the Bottom of Our Hearts</h1>
                <p className="text-lg opacity-90">Thank you for supporting young athletes</p>
              </motion.div>
            </div>

            <div className="p-8 text-center">
              <motion.div variants={itemVariants} className="mb-8">
                <div className="max-w-lg mx-auto">
                  <p className="text-xl text-gray-700 mb-6">
                    Because of your generosity, young players will experience the joy of sports, 
                    the lessons of teamwork, and the confidence that comes from being part of 
                    something bigger than themselves.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 my-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm">Building Champions</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm">Creating Community</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <Heart className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-sm">Inspiring Dreams</p>
                    </div>
                  </div>

                  <p className="text-gray-600 italic">
                    "Sports do not build character. They reveal it." — John Wooden
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-blue-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <p className="text-blue-800">
                    You'll be redirected to our campaigns in {countdown} seconds
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  onClick={() => navigate('/campaigns')}
                  className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white py-6 text-lg"
                >
                  Return to Campaigns
                </Button>
              </motion.div>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="p-8 text-center">
            <motion.div variants={itemVariants}>
              <div className="flex justify-center mb-6">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">We Need Your Help</h2>
              <p className="text-gray-600 mb-6">
                We couldn't verify your donation, but our young athletes still need support.
                Please try again or contact us directly.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 max-w-md mx-auto">
              <Button 
                onClick={() => navigate('/donate')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              >
                Try Donating Again
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full py-6 text-lg"
              >
                Contact Our Team
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="text-sm text-gray-500">
                If the amount was deducted from your account, it will be refunded automatically within 3-5 business days.
              </p>
            </motion.div>
          </div>
        )}

        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-sm text-gray-500">
            With gratitude from the <span className="font-semibold">Youth Sports Foundation</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationVerify;
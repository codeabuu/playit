
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <main>
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions about donating? Want to submit a team for funding? 
            We're here to help you make a difference.
          </p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours. 
                We're happy to answer your questions or help you submit a team for funding.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <a href="mailto:contact@sportsaid.org" className="text-gray-600 hover:text-primary">
                      contact@sportsaid.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Phone</h3>
                    <a href="tel:(555) 123-4567" className="text-gray-600 hover:text-primary">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Address</h3>
                    <address className="text-gray-600 not-italic">
                      123 Sports Avenue<br />
                      Athletic City, AC 12345
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="font-heading text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your question or request..."
                    required
                    className="mt-1 min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Submission */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-semibold mb-4">Submit Your Team</h2>
            <p className="text-gray-600 text-lg mb-8">
              Are you a coach, parent, or team manager looking to raise funds for a youth sports team? 
              We'd love to help you create a campaign.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-heading text-xl font-semibold mb-4">Here's how it works:</h3>
              <ol className="text-left space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">1</span>
                  <div>
                    <strong className="font-medium">Submit your team information</strong>
                    <p className="text-gray-600">Complete our team verification form with details about your team and funding needs.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">2</span>
                  <div>
                    <strong className="font-medium">Verification process</strong>
                    <p className="text-gray-600">Our team will verify your information and work with you to create a compelling campaign.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">3</span>
                  <div>
                    <strong className="font-medium">Launch your campaign</strong>
                    <p className="text-gray-600">Once approved, your campaign goes live and we help you promote it to potential donors.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">4</span>
                  <div>
                    <strong className="font-medium">Receive funds</strong>
                    <p className="text-gray-600">Funds are transferred directly to your team's bank account as donations come in.</p>
                  </div>
                </li>
              </ol>
              <Button size="lg" className="w-full sm:w-auto">
                Submit Your Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;


import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CampaignCard from '@/components/CampaignCard';
import TestimonialCard from '@/components/TestimonialCard';
import { campaigns, testimonials, impactStats } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

const Home = () => {
  // Show only the first 3 campaigns on the homepage
  const featuredCampaigns = campaigns.slice(0, 3);
  
  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
            alt="Youth playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Support Youth Sports in Your Community
            </h1>
            <p className="text-xl mb-8 text-white">
              Help young athletes stay focused, build confidence, and develop teamwork skills through sports.
              Your donation makes a direct impact on a child's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-primary font-semibold">
                <Link to="/campaigns">Support a Team</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Elements */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">Why Support Youth Sports?</h2>
            <p className="text-gray-600 text-lg">
              Your donation directly impacts young athletes and their communities, creating positive change that lasts a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-success" size={24} />
                <h3 className="font-heading text-xl font-semibold">100% Direct Funding</h3>
              </div>
              <p className="text-gray-600">
                Every dollar goes directly to the team you choose to support. We never take a cut of your donation.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-success" size={24} />
                <h3 className="font-heading text-xl font-semibold">Verified Campaigns</h3>
              </div>
              <p className="text-gray-600">
                We personally verify every campaign to ensure legitimacy and establish direct connections with coaches.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-success" size={24} />
                <h3 className="font-heading text-xl font-semibold">See Your Impact</h3>
              </div>
              <p className="text-gray-600">
                Receive updates on how your donation helped the team and the difference it made in young lives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">Active Campaigns</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              These teams need your support now. Every contribution helps provide equipment,
              uniforms, and opportunities for young athletes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                goalAmount={campaign.goalAmount}
                raisedAmount={campaign.raisedAmount}
                daysLeft={campaign.daysLeft}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">Our Impact Together</h2>
            <p className="text-xl max-w-3xl mx-auto">
              With the help of donors like you, we've made a significant difference in youth sports programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">{stat.value}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <p className="text-blue-100">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">What Teams Are Saying</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hear from the coaches and young athletes who have benefited from generous donations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Your donation, no matter the size, has a direct impact on young athletes in your community. 
            Help them build skills that last a lifetime.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/campaigns">Donate Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;

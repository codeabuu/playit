import { useParams, Link } from 'react-router-dom';
import { campaigns } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import DonationForm from '@/components/DonationForm';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = campaigns.find(c => c.id === id);
  
  if (!campaign) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold mb-4">Campaign Not Found</h1>
        <p className="mb-8">The campaign you're looking for doesn't exist or has ended.</p>
        <Button asChild>
          <Link to="/campaigns">Browse Active Campaigns</Link>
        </Button>
      </div>
    );
  }
  
  const percentRaised = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);
  
  return (
    <main>
      {/* Campaign Header */}
      <section className="bg-primary text-white py-10">
        <div className="container-custom">
          <Link to="/campaigns" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to All Campaigns
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{campaign.title}</h1>
          <p className="text-xl mb-0">{campaign.fullDescription}</p>
        </div>
      </section>
      
      {/* Campaign Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-80 object-cover rounded-lg mb-8" 
              />
              
              {/* Progress and Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between mb-2 font-semibold">
                  <span>${campaign.raisedAmount.toLocaleString()} raised</span>
                  <span>Goal: ${campaign.goalAmount.toLocaleString()}</span>
                </div>
                <Progress value={percentRaised} className="h-3 mb-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-2xl font-bold text-primary">{percentRaised}%</div>
                    <div className="text-sm text-gray-600">Funded</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-2xl font-bold text-primary">{campaign.daysLeft}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-2xl font-bold text-primary">
                      {Math.ceil(campaign.goalAmount - campaign.raisedAmount).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Still Needed</div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {campaign.location}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 size={16} />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
              
              {/* Team Story */}
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">Our Story</h2>
                <div className="prose max-w-none">
                  {campaign.story.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Team Needs */}
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">What We Need</h2>
                <ul className="space-y-2">
                  {campaign.teamNeeds.map((need, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-success font-bold">✓</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <DonationForm campaignName={campaign.title} />
                
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <h3 className="font-heading text-lg font-semibold mb-3">Campaign Timeline</h3>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Campaign ends in {campaign.daysLeft} days</p>
                      <p className="text-gray-600 text-sm">
                        Donations after the end date will still be accepted and used by the team.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                  <h3 className="font-heading text-lg font-semibold mb-3">Why Support Youth Sports?</h3>
                  <p className="text-gray-700 mb-4">
                    Your donation helps young athletes develop teamwork skills, build confidence, 
                    and stay engaged in positive activities.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Link to="/about" className="underline">Learn more about our mission</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Campaigns */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="font-heading text-2xl font-semibold mb-6">Other Teams That Need Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns
              .filter(c => c.id !== id)
              .slice(0, 3)
              .map(campaign => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link to={`/campaign/${campaign.id}`}>
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-40 object-cover" 
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold mb-2">
                      <Link to={`/campaign/${campaign.id}`} className="hover:text-primary">
                        {campaign.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between text-sm mb-2">
                      <span>${campaign.raisedAmount.toLocaleString()} raised</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <Progress value={Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)} className="h-1 mb-4" />
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/campaign/${campaign.id}`}>Support This Team</Link>
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default CampaignDetails;

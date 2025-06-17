import { useParams, Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import DonationForm from '@/components/DonationForm';
import { useEffect, useState } from 'react';
import { fetchCampaignById, fetchCampaigns, Campaign } from '@/lib/api';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>()!;
  const navigate = useNavigate();
  console.log('URL ID parameter:', id, 'Type:', typeof id);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [otherCampaigns, setOtherCampaigns] = useState<Campaign[]>([]);
  const isValidUUID = (id: string | undefined) => {
    return id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  };

   useEffect(() => {
    const loadCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!isValidUUID(id)) {
          throw new Error('Invalid campaign URL - ID format is incorrect');
        }

        const data = await fetchCampaignById(id!);
        if (!data) {
          throw new Error('Campaign not found');
        }

        setCampaign(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaign');
        console.error('Campaign load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [id]);

  useEffect(() => {
    const loadOtherCampaigns = async () => {
      try {
        const allcampaigns = await fetchCampaigns();
        setOtherCampaigns(allcampaigns);
      } catch (err) {
        console.error('Failed to load other campaigns:', err);
      }
    };

    loadOtherCampaigns();
  }, []);

  if (!isValidUUID(id)) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Campaign URL</h1>
        <p className="mb-4">The campaign link appears to be broken or incomplete.</p>
        <Button asChild>
          <Link to="/campaigns">Browse All Campaigns</Link>
        </Button>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <p>Loading campaign details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold mb-4">Error Loading Campaign</h1>
        <p className="mb-8 text-red-500">{error}</p>
        <Button asChild>
          <Link to="/campaigns">Browse Active Campaigns</Link>
        </Button>
      </div>
    );
  }

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
  // const daysLeft = campaign.daysLeft || 30; // Fallback to 30 days if not provided
  
  return (
    <main>
      {/* Campaign Header */}
      <section className="bg-primary text-white py-8">  {/* Reduced padding */}
  <div className="container-custom">
    <Link to="/campaigns" className="inline-flex items-center text-blue-100 hover:text-white mb-3 text-sm">  {/* Smaller back link */}
      <ArrowLeft size={14} className="mr-1.5" />  {/* Smaller icon */}
      Back to All Campaigns
    </Link>
    <h1 className="font-heading text-xl md:text-2xl font-bold mb-2">  {/* Reduced heading size */}
      {campaign.title}
    </h1>
    <p className="text-sm md:text-base mb-0">  {/* Smaller paragraph text */}
      {campaign.fullDescription}
    </p>
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
                  {/* <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-2xl font-bold text-primary">{daysLeft}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div> */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-2xl font-bold text-primary">
                      {Math.ceil(campaign.goalAmount - campaign.raisedAmount).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Still Needed</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md flex flex-col justify-center">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          document.getElementById('donation-form')?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }}
                      >
                        Donate Now
                      </Button>
                    </div>
                  </div>
                
                <div className="mt-6 flex justify-between items-center">
                  {/* <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {campaign.location || "Various locations"}
                  </div> */}
                  
                  {/* <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 size={16} />
                    <span>Share</span>
                  </Button> */}
                </div>
              </div>
              
              {/* Team Story */}
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">Our Story</h2>
                <div className="prose max-w-none">
                  {(campaign.story || campaign.ourStory).split('\n\n').map((paragraph, index) => (
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
              <div id="donation-form" className="sticky top-20">
                <DonationForm
                  campaignId={campaign.id}
                  campaignName={campaign.title}
                />
                
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <h3 className="font-heading text-lg font-semibold mb-3">Campaign Timeline</h3>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-primary mt-1" />
                    <div>
                      {/* <p className="font-medium">Campaign ends in {daysLeft} days</p> */}
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
            {otherCampaigns
              .filter(c => c.id !== campaign.id) // Exclude current campaign
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
                      {/* <span>{campaign.daysLeft || 30} days left</span> */}
                    </div>
                    <Progress value={Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)} className="h-1 mb-4" />
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/campaign/${campaign.id}`);
                      }}
                    >
                      Support This Team
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
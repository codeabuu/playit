import { useState, useEffect } from 'react';
import CampaignCard from '@/components/CampaignCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchCampaigns, Campaign } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        console.log('Fetched campaigns:', data); 
        setCampaigns(data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Header */}
      <section className="bg-primary text-white py-12 md:py-16">  {/* Reduced vertical padding on mobile */}
  <div className="container-custom text-center">
    <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">  {/* Reduced heading size */}
      Support Youth Sports Teams
    </h1>
    <p className="text-base md:text-lg max-w-3xl mx-auto">  {/* Smaller paragraph text */}
      Browse active campaigns and help young athletes achieve their full potential.
      Every donation makes a difference.
    </p>
  </div>
</section>

      {/* Search and Campaigns */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-10 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-center space-y-2">
          <h3 className="font-heading text-xl font-semibold">Loading Campaigns</h3>
          <p className="text-muted-foreground">
            Gathering the latest youth sports initiatives...
          </p>
        </div>
      </div>
          ) : filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  description={campaign.description}
                  image={campaign.image}
                  goalAmount={campaign.goalAmount}
                  raisedAmount={campaign.raisedAmount}
                  // daysLeft={campaign.daysLeft}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="font-heading text-xl mb-2">No campaigns found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or check back later for new campaigns.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help Start a Campaign */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-semibold mb-4">Need Help for Your Team?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            If you're a coach or team manager looking to raise funds for your youth sports team,
            we'd love to help you create a campaign.
          </p>
          <a
            href="/contact"
            className="btn-primary inline-block"
          >
            Submit Your Team
          </a>
        </div>
      </section>
    </main>
  );
};

export default Campaigns;

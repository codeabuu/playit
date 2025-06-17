
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
}

const CampaignCard = ({
  id,
  title,
  description,
  image,
  goalAmount,
  raisedAmount,
}: CampaignCardProps) => {
  if (!id) {
    console.error('CampaignCard received undefined ID:', { id, title });
    return null; // or a fallback UI
  }
  const percentRaised = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100);
  
  return (
    <div className="campaign-card flex flex-col h-full">
      <Link to={`/campaign/${id}`} className="block overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/campaign/${id}`} className="block">
          <h3 className="font-heading text-lg font-semibold mb-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="space-y-4 mt-auto">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-semibold">${raisedAmount.toLocaleString()} raised</span>
              <span>of ${goalAmount.toLocaleString()}</span>
            </div>
            <Progress value={percentRaised} className="h-2" />
          </div>
          
          <div className="flex justify-between">
            {/* <span className="text-sm text-gray-500">
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </span> */}
            <span className="text-sm font-medium text-primary">
              {percentRaised}% funded
            </span>
          </div>
          
          <Button asChild className="w-full">
  <Link 
    to={`/campaign/${id}`}
    onClick={() => window.scrollTo(0, 0)}
  >
    Support This Team
  </Link>
</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

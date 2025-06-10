
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface DonationFormProps {
  campaignName?: string;
}

const DonationForm = ({ campaignName = "Local Youth Sports" }: DonationFormProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number | string>("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const predefinedAmounts = [25, 50, 100, 250];
  
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This would be replaced with actual Stripe integration
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Thank you for your donation!",
        description: `Your $${amount} donation to ${campaignName} has been processed.`,
      });
      setAmount("");
    }, 1500);
  };
  
  return (
    <Card className="p-6">
      <h3 className="font-heading text-xl font-semibold mb-4">Support {campaignName}</h3>
      <p className="text-gray-600 mb-6">
        Your donation helps young athletes achieve their dreams. 100% of funds go directly to the team.
      </p>
      
      <form onSubmit={handleDonate} className="space-y-6">
        <div>
          <Label htmlFor="amount" className="mb-1 block">Select or enter donation amount</Label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {predefinedAmounts.map(preset => (
              <Button
                key={preset}
                type="button"
                variant={amount === preset ? "default" : "outline"}
                onClick={() => setAmount(preset)}
                className="h-12"
              >
                ${preset}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input 
              id="amount"
              type="number" 
              min="1"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Other amount"
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="recurring" 
            checked={isRecurring} 
            onCheckedChange={(checked) => setIsRecurring(checked as boolean)} 
          />
          <Label htmlFor="recurring" className="cursor-pointer">Make this a monthly donation</Label>
        </div>
        
        <div>
          <Button 
            type="submit" 
            className="w-full h-12 text-lg" 
            disabled={!amount || loading}
          >
            {loading ? "Processing..." : isRecurring ? "Donate Monthly" : "Donate Now"}
          </Button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Secure payment processed by Stripe</p>
          <p className="mt-1">100% of your donation goes to the team</p>
        </div>
      </form>
    </Card>
  );
};

export default DonationForm;

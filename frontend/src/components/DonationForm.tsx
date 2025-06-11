import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { initializeDonation, redirectToPaystack } from '@/lib/api';

interface DonationFormProps {
  campaignId: number;
  campaignName?: string;
}

const DonationForm = ({ 
  campaignId, 
  campaignName = "Local Youth Sports" 
}: DonationFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const predefinedAmounts = [5, 10, 15, 25];
  
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !email) {
      toast({
        title: "Error",
        description: "Please enter both email and amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      
      console.log("Sending donation data:", {
      email,
      amount: numericAmount,
      campaign_id: campaignId,
      is_recurring: isRecurring
    });

      const response = await initializeDonation({
        email,
        amount: numericAmount * 100, // Convert to kobo (Paystack expects amount in kobo)
        campaign_id: campaignId,
        is_recurring: isRecurring
      });

      if (response.status) {
        window.location.href = response.data.authorization_url;
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to initialize payment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your donation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="p-6">
      <h3 className="font-heading text-xl font-semibold mb-4">Support {campaignName}</h3>
      <p className="text-gray-600 mb-6">
        Your donation helps young athletes achieve their dreams. 100% of funds go directly to the team.
      </p>
      
      <form onSubmit={handleDonate} className="space-y-6">
        {/* Add email input field */}
        <div>
          <Label htmlFor="email" className="mb-1 block">Email Address</Label>
          <Input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
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
              required
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
            disabled={!amount || !email || loading}
          >
            {loading ? "Processing..." : isRecurring ? "Donate Monthly" : "Donate Now"}
          </Button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Secure payment processed by Paystack</p>
          <p className="mt-1">100% of your donation goes to the team</p>
        </div>
      </form>
    </Card>
  );
};

export default DonationForm;
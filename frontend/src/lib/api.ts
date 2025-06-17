// src/api/api.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://risetoplay.onrender.com';

interface DonationInitRequest {
  email: string;
  amount: number;
  campaign_id: string;
  is_recurring?: boolean;
}

interface DonationInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    reference: string;
  };
}



const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  transformRequest: [
    (data) => JSON.stringify(data), // Explicit serialization
  ],
});

// Initialize Donation
export const initializeDonation = async (data: {
  email?: string;  // Made optional
  amount: number;
  campaign_id: string;
  is_recurring: boolean;
}) => {
  try {
    // Create payload with proper field names and fallback for email
    const payload = {
      email: data.email || `anonymous-${Date.now()}@example.com`, // Fallback email
      amount: data.amount,
      campaign_id: data.campaign_id,  // Keep as campaign_id to match backend
      is_recurring: data.is_recurring
    };

    console.log('Sending payload:', payload);
    const response = await axios.post(`${API_BASE_URL}/initialize`, payload);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data);
    throw error;
  }
};

// Verify Donation
export const verifyDonation = async (reference: string): Promise<{status: boolean, message: string}> => {
  try {
    const response = await apiClient.get(`/donations/verify/${reference}/`);
    return {
      status: response.data.status === "success",
      message: response.data.message || "Thank you for your donation!"
    };
  } catch (error) {
    handleError(error);
    return {
      status: false,
      message: "Verification failed. Please contact support."
    };
  }
};

// Redirect to Paystack
export const redirectToPaystack = (url: string): void => {
  window.location.href = url;
};

// Handle and log errors nicely
const handleError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    console.error('API Error:', err.response?.data || err.message);
  } else {
    console.error('Unexpected Error:', error);
  }
};


export interface Campaign {
  id: string;  // Changed from number to string
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  teamNeeds: string[];
  story: string;
}

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/campaigns/`);
  return response.data.map((campaign: any) => ({
    id: campaign.campaign_id,  // Now keeping as string
    title: campaign.title,
      description: campaign.description,
      fullDescription: campaign.full_description,
      image: campaign.image,
      goalAmount: campaign.goal_amount,
      raisedAmount: campaign.total_raised,
      teamNeeds: campaign.team_needs,
      story: campaign.full_description,
  }));
  
};

export const fetchCampaignById = async (id: string): Promise<Campaign | null> => {
  const response = await axios.get(`${API_BASE_URL}/api/campaigns/${id}/`);
  const data = response.data;
  return {
    id: data.campaign_id,
    title: data.title,
    description: data.description,
    fullDescription: data.full_description,
    image: data.image,
    goalAmount: data.goal_amount,
    raisedAmount: data.total_raised,
    teamNeeds: data.team_needs,
    story: data.full_description,
  };
};

// Add this function below your existing API calls

export const sendContactMessage = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const response = await apiClient.post('/api/contact/', formData);
    
    // Return the complete success response
    return {
      success: response.data.success || false,
      message: response.data.message
    };
  } catch (error) {
    handleError(error);
    
    if (axios.isAxiosError(error) && error.response?.data) {
      return {
        success: false,
        error: error.response.data.error || "Failed to send message"
      };
    }
    
    return {
      success: false,
      error: "An unexpected error occurred"
    };
  }
};

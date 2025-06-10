import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/";

interface DonationInitRequest {
    email: string;
    amount: number
    campaign_id: number;
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

interface DonationVerifyResponse {
  status: string;
  message: string;
  data: {
    amount: number;
    is_recurring: boolean;
    campaign_id: number;
  };
}

interface CampaignStatsResponse {
  campaign_id: number;
  total_raised: number;
  active_recurring_donations: number;
}

interface ApiError {
  message: string;
  details?: any;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initializeDonation = async (
  donationData: DonationInitRequest
): Promise<DonationInitResponse> => {
  try {
    const response = await apiClient.post<DonationInitResponse>(
      '/initialize',
      donationData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.error || 'Failed to initialize donation',
        details: error.response?.data,
      } as ApiError;
    }
    throw {
      message: 'An unexpected error occurred during donation initialization',
      details: error,
    } as ApiError;
  }
};


export const verifyDonation = async (
  reference: string
): Promise<DonationVerifyResponse> => {
  try {
    const response = await apiClient.get<DonationVerifyResponse>(
      `/verify/${reference}/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.error || 'Failed to verify donation',
        details: error.response?.data,
      } as ApiError;
    }
    throw {
      message: 'An unexpected error occurred during donation verification',
      details: error,
    } as ApiError;
  }
};

export const getCampaignStats = async (
  campaignId: number
): Promise<CampaignStatsResponse> => {
  try {
    const response = await apiClient.get<CampaignStatsResponse>(
      `/campaign/${campaignId}/stats/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.error || 'Failed to fetch campaign stats',
        details: error.response?.data,
      } as ApiError;
    }
    throw {
      message: 'An unexpected error occurred while fetching campaign stats',
      details: error,
    } as ApiError;
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
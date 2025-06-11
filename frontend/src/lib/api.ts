// src/api/api.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

interface DonationInitRequest {
  email: string;
  amount: number;
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

interface CampaignStats {
  campaign_id: number;
  total_raised: number;
  active_recurring_donations: number;
}

interface GenericResponse {
  status: string;
  message?: string;
  data?: any;
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
export const initializeDonation = async (
  data: DonationInitRequest
): Promise<DonationInitResponse> => {
  try {
    console.log('Sending payload:', JSON.stringify(data, null, 2));
    const response = await apiClient.post<DonationInitResponse>('/initialize', data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Verify Donation
export const verifyDonation = async (reference: string): Promise<{status: boolean, message: string}> => {
  try {
    const response = await apiClient.get(`/verify/${reference}/`);
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

// Get Campaign Stats
export const getCampaignStats = async (
  campaignId: number
): Promise<CampaignStats> => {
  try {
    const response = await apiClient.get<CampaignStats>(`/campaign/${campaignId}/stats/`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
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
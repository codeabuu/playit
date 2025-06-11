import requests
from django.conf import settings

#handle paystack donations
class PaystackService:
    @staticmethod
    def initialize_transaction(email, amount, reference, callback_url=None, metadata=None):
        url="https://api.paystack.co/transaction/initialize"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "email": email,
            "amount": int(amount),
            "currency": "USD",
            "reference": reference,
        }
        if callback_url:
            payload["callback_url"] = callback_url
        if metadata:
            payload["metadata"] = metadata

        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    
    @staticmethod
    def verify_transaction(reference):
        url = f"https://api.paystack.co/transaction/verify/{reference}"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.get(url, headers=headers)
        return response.json()

    @staticmethod
    def create_subscription(email, amount, authorization_code, interval="monthly", metadata=None):
        """
        Create a subscription without needing a pre-defined plan
        by using the authorization directly
        """
        url = "https://api.paystack.co/transaction/initialize"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "email": email,
            "amount": int(amount),
            "authorization_code": authorization_code,
            "currency": "USD",
            "plan": "",  # Empty for dynamic amounts
            "invoice_limit": 0,  # 0 = unlimited
            "metadata": metadata or {}
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    

    @staticmethod
    def charge_recurring(email, amount, authorization_code, metadata=None):
        """
        Charge an existing authorization for recurring donations
        """
        url = "https://api.paystack.co/transaction/charge_authorization"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "email": email,
            "amount": int(amount),
            "authorization_code": authorization_code,
            "metadata": metadata or {}
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    

    @staticmethod
    def disable_subscription(authorization_code):
        """Disable a recurring donation"""
        url = "https://api.paystack.co/customer/deactivate_authorization"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "authorization_code": authorization_code
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()

    @staticmethod
    def list_recurring_donations(email=None):
        """List recurring donations (filter by email if provided)"""
        url = "https://api.paystack.co/customer"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        }
        params = {"perPage": 100}
        if email:
            params["email"] = email
        
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            return response.json().get('data', {}).get('subscriptions', [])
        return []
    
    # @staticmethod
    # def disable_subscription(subscription_code, token):
    #     url = f"https://api.paystack.co/subscription/disable"
    #     headers = {
    #         "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
    #         "Content-Type": "application/json"
    #     }
    #     payload = {
    #         "code": subscription_code,
    #         "token": token
    #     }
    #     response = requests.post(url, json=payload, headers=headers)
    #     return response.json()
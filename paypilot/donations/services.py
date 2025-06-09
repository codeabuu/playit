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
            "amount": int(amount*100),
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
    def create_subscription(email, plan_code, authorization):
        url = "https://api.paystack.co/subscription"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        paylaod = {
            "customer": email,
            "plan": plan_code,
            "authorization": authorization,
        }
        response = requests.post(url, json=paylaod, headers=headers)
        return response.json()
    
    @staticmethod
    def disable_subscription(subscription_code, token):
        url = f"https://api.paystack.co/subscription/disable"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "code": subscription_code,
            "token": token
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
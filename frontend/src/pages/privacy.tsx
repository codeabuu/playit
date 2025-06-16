import { Helmet}  from 'react-helmet';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | RiseToPlay</title>
        <meta name="description" content="RiseToPlay's privacy policy regarding donations and data handling" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-blue">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-2">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <p className="mb-6">
            At <strong>RiseToPlay</strong>, your privacy is very important to us. This Privacy Policy outlines how we collect, use, and protect your information when you interact with our website and make donations to support youth sports initiatives.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect only the information that is necessary to process your donation:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>When making a donation</strong>, we may collect:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                {/* <li>Your name</li> */}
                <li>Email address</li>
                <li>Donation amount</li>
                <li>Payment details (processed securely via Paystack)</li>
              </ul>
            </li>
          </ul>
          <p>
            We do <strong>not</strong> require account creation, and we do <strong>not</strong> collect or store sensitive personal data beyond what is required to complete your donation.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To process one-time or recurring donations via our secure payment gateway (Paystack)</li>
            <li>To send confirmation emails or receipts</li>
            <li>To contact you only if necessary (e.g., in case of recurring donation updates or queries)</li>
          </ul>
          <p>
            We do <strong>not</strong> sell, rent, or share your information with any third parties.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Recurring Donations</h2>
          <p className="mb-4">
            If you opt in for a <strong>recurring donation</strong>, your billing authorization is managed by Paystack. RiseToPlay does not store your payment details.
          </p>
          <p>
            To cancel a recurring donation, please <strong>contact us directly</strong> at <a href="mailto:support@risetoplay.org" className="text-blue-600 hover:underline">support@risetoplay.org</a>, and our team will assist you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. All transactions are encrypted and processed securely via Paystack.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Cookies & Tracking</h2>
          <p>
            Our website may use basic cookies to improve user experience. We do <strong>not</strong> use tracking cookies or third-party analytics to monitor your behavior.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Children's Privacy</h2>
          <p>
            RiseToPlay is designed to serve youth sports organizations, but it is not intended for use by children under 13. We do not knowingly collect information from children.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy as needed. All updates will be posted on this page, with the revised effective date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-2">
            If you have any questions about this Privacy Policy or your data, please contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Email</strong>: <a href="mailto:support@risetoplay.org" className="text-blue-600 hover:underline">support@risetoplay.org</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
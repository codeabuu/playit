import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | RiseToPlay</title>
        <meta name="description" content="Legal terms governing donations and use of RiseToPlay's platform" />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
            <p className="text-gray-500 mb-8">Last Updated: June 15, 2025</p>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using RiseToPlay ("Platform"), you agree to comply with these Terms. If you disagree, please refrain from using our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">2. Donation Policies</h2>
              <h3 className="font-medium text-gray-700 mb-2">2.1 Payment Processing</h3>
              <p className="text-gray-600 mb-4">
                All donations are processed securely via Paystack. We do not store your full payment details.
              </p>
              
              <h3 className="font-medium text-gray-700 mb-2">2.2 Recurring Donations</h3>
              <p className="text-gray-600 mb-2">
                Recurring donations will continue until:
              </p>
              <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
                <li>You cancel by emailing <a href="mailto:support@risetoplay.org" className="text-blue-600 hover:underline">support@risetoplay.org</a></li>
                <li>We receive a failed payment notification</li>
              </ul>

              <h3 className="font-medium text-gray-700 mb-2">2.3 Refunds</h3>
              <p className="text-gray-600">
                Donations are non-refundable except in cases of:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Unauthorized transactions</li>
                <li>Clear errors in donation amount</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">3. Team Campaigns</h2>
              <p className="text-gray-600 mb-4">
                Teams seeking funding must:
              </p>
              <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
                <li>Provide verifiable contact information</li>
                <li>Use funds solely for youth sports purposes</li>
                <li>Comply with our anti-discrimination policy</li>
              </ul>
              <p className="text-gray-600">
                RiseToPlay may remove campaigns that violate these requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">4. Limitation of Liability</h2>
              <p className="text-gray-600">
                RiseToPlay is not responsible for:
              </p>
              <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                <li>How recipient teams use donated funds</li>
                <li>Technical issues beyond our reasonable control</li>
                <li>Third-party payment processor errors</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">5. Privacy</h2>
              <p className="text-gray-600">
                Your data is handled according to our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">6. Changes to Terms</h2>
              <p className="text-gray-600 mb-2">
                We may update these Terms periodically. Material changes will be:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Posted on this page with a new "Last Updated" date</li>
                <li>Communicated via email for recurring donors</li>
              </ul>
            </section>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Contact Us</h3>
              <p className="text-gray-600">
                Questions? Email <a href="mailto:legal@risetoplay.org" className="text-blue-600 hover:underline">legal@risetoplay.org</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
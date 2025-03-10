/* eslint-disable react/no-unescaped-entities */
const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-8">Effective Date: 4/10/2024</p>

      <p className="leading-relaxed mb-6">
        Thank you for choosing our API service. We prioritize your privacy and
        are committed to safeguarding any information we may collect while
        delivering our services. This Privacy Policy details the types of
        information collected, its use, and the limited circumstances under
        which data is stored.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
      <p className="leading-relaxed mb-6">
        Our API does not collect, store, or process any personal information
        from users, except in the following limited cases:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">
          <strong>Rate Limiting:</strong> To monitor and enforce rate limits,
          basic usage data, such as request frequency and timestamps, is
          temporarily stored for calculation purposes. This data does not
          contain personal identifiers.
        </li>
        <li className="mb-2">
          <strong>Device Information and IP Address:</strong> When the API
          administrator (who is the owner of the API) logs into the system,
          information such as IP address and device ID is collected strictly for
          authentication purposes. This data is not shared or sold, and pertains
          only to the API administrator.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        2. Who Has Access to the Information
      </h2>
      <p className="leading-relaxed mb-6">
        Only the API administrator has access to the system. Any data collected,
        such as IP address and device ID during login, is restricted solely to
        the administrator. No other users can log in or access the API in a way
        that involves authentication.
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Data Retention</h2>
      <p className="leading-relaxed mb-6">
        <strong>Rate Limiting Data:</strong> Data used to enforce rate limits is
        temporarily stored and discarded after the calculation is complete.
      </p>
      <p className="leading-relaxed mb-6">
        <strong>Administrator Data:</strong> Information such as IP address and
        device ID is retained only during the session and is not stored beyond
        the session's lifecycle.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Use of Cookies</h2>
      <p className="leading-relaxed mb-6">
        Our API does not use cookies or any tracking technologies to collect
        personal data.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Third-Party Sharing</h2>
      <p className="leading-relaxed mb-6">
        We do not share, sell, or disclose any collected data to third parties.
        The data is used strictly for operational purposes and to maintain the
        security of the API.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Security Measures</h2>
      <p className="leading-relaxed mb-6">
        We implement industry-standard security measures to ensure the integrity
        and confidentiality of any temporarily stored data. Access to the system
        is restricted to the administrator, and only necessary information is
        collected for operational purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
      <p className="leading-relaxed mb-6">
        As we do not collect personal data from users of the API, there are no
        specific rights such as data access, modification, or deletion
        applicable to public users. For administrators, session-specific data is
        deleted automatically once the session ends.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
      <p className="leading-relaxed mb-6">
        We may update this Privacy Policy periodically. Any changes will be
        posted on this page with an updated effective date. Continued use of the
        API signifies acceptance of the updated Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
      <p className="leading-relaxed mb-6">
        If you have any questions regarding this Privacy Policy, please contact
        us at:
        <br />
        <strong className="underline">
          <a href="/contact">Email</a>
        </strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;

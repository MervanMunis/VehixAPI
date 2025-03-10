/* eslint-disable react/no-unescaped-entities */
const TermsConditions = () => {
  return (
    <div className="container mx-auto py-12 px-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-lg mb-8">Effective Date: 4/10/2024</p>

      <p className="leading-relaxed mb-6">
        Welcome to the Vehix API! These Terms and Conditions govern your access
        to and use of the API services provided by Vehix API, developed and
        maintained by Vehix API. By using our API, you agree to comply
        with these terms. If you do not agree, please refrain from using our
        services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Purpose of the API</h2>
      <p className="leading-relaxed mb-6">
        The Vehix API is designed to provide real-time vehicle information for
        developers. Whether you're building a commercial application or using it
        for personal purposes, our API delivers comprehensive vehicle data. This
        API may be used for a wide variety of applications, but all usage is
        subject to the terms described here.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Use of the API</h2>
      <p className="leading-relaxed mb-6">
        By accessing and using our API, you agree to the following conditions:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">
          <strong>Open Use:</strong> You may use the API for personal,
          educational, or commercial purposes. However, the creators of the API
          bear no responsibility for how it is used.
        </li>
        <li className="mb-2">
          <strong>API Access Limits:</strong> Reasonable rate limits may be
          applied to prevent excessive usage and to maintain system integrity.
          Rate limits are enforced automatically.
        </li>
        <li className="mb-2">
          <strong>Responsible Use:</strong> You agree to use the API responsibly
          and refrain from activities such as overloading the system,
          reverse-engineering the API, or attempting unauthorized access to
          data.
        </li>
        <li className="mb-2">
          <strong>No Personal Data Collection:</strong> We do not collect any
          personal data except for minimal information required for enforcing
          rate limits (e.g., request frequency and timing).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
      <p className="leading-relaxed mb-6">
        All intellectual property rights related to the Vehix API and the data
        provided through it (except third-party materials) remain the property
        of Vehix API. You are granted a non-exclusive,
        non-transferable license to use the API, but you may not modify,
        reproduce, or distribute its code or content for illegal or harmful
        purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        4. Disclaimer of Warranties
      </h2>
      <p className="leading-relaxed mb-6">
        The Vehix API is provided "as-is" and "as-available" without warranties
        of any kind, either express or implied. We do not guarantee that:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">
          The API will be error-free or available at all times.
        </li>
        <li className="mb-2">
          The data provided will be free of inaccuracies, omissions, or errors.
        </li>
        <li className="mb-2">
          The API will be suitable for commercial use or any specific purpose.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        5. Limitation of Liability
      </h2>
      <p className="leading-relaxed mb-6">
        In no event shall the creators, developers, or any associated parties be
        liable for any indirect, incidental, special, or consequential damages
        arising from the use or inability to use the API, including but not
        limited to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">
          Loss of data, profits, or business interruptions.
        </li>
        <li className="mb-2">
          Errors, inaccuracies, or omissions in the content delivered by the
          API.
        </li>
        <li className="mb-2">Unauthorized access to the API or its systems.</li>
      </ul>
      <p className="leading-relaxed mb-6">
        Your use of this API is at your own risk, and we encourage you to verify
        the accuracy of the data where necessary.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
      <p className="leading-relaxed mb-6">
        We reserve the right to suspend or terminate access to the API at any
        time without prior notice. This includes the right to limit or revoke
        access in case of misuse or violation of these Terms and Conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        7. Modifications to the Terms
      </h2>
      <p className="leading-relaxed mb-6">
        We may modify these Terms and Conditions at any time. Any changes will
        be posted on this page with an updated effective date. Continued use of
        the API after changes are made implies acceptance of the updated Terms
        and Conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
      <p className="leading-relaxed mb-6">
        These Terms and Conditions are governed by the laws of [Your Country or
        Jurisdiction], without regard to conflict of law principles.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
      <p className="leading-relaxed mb-6">
        If you have any questions regarding these Terms and Conditions, feel
        free to reach out to us at:
        <br />
        <strong className="underline">
          <a href="/contact">Email</a>
        </strong>
      </p>
    </div>
  );
};

export default TermsConditions;

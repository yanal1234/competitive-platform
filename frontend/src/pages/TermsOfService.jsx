import "../components/TermsOfService/TermsOfService.css";

function TermsOfService() {
  return (
    <div className="terms-page-container">
      {/* Header */}
      <div className="terms-header">
        <span className="badge-pill badge-legal">LEGAL</span>

        <h1 className="terms-title">
          Terms of <span className="highlight-purple">Service</span>
        </h1>

        <p className="terms-subtitle">
          Please read these terms carefully before using CodeForge AI.
          <br />
          By using the platform, you agree to use it responsibly and fairly.
        </p>
      </div>

      {/* Terms Card */}
      <div className="terms-card">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>

          <p>
            By accessing or using CodeForge AI, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms,
            you may not use our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. User Accounts</h2>

          <p>
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account. You agree to provide accurate and complete information.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Use of Service</h2>

          <p>
            You agree to use CodeForge AI only for lawful purposes and in
            accordance with these terms. You must not use the platform to
            distribute harmful content, spam, or engage in activities that
            could harm other users or the platform.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitation of Liability</h2>

          <p>
            CodeForge AI is provided "as is" and "as available" without
            warranties of any kind. We are not liable for any indirect,
            incidental, or consequential damages arising from your use of the
            service.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Changes to Terms</h2>

          <p>
            We may update these terms from time to time. Continued use of the
            platform after changes means you accept the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfService;

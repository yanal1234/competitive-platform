import "../components/PrivacyPolicy/PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-page-container">
      {/* Header */}
      <div className="privacy-header">
        <span className="badge-pill badge-legal">LEGAL</span>

        <h1 className="privacy-title">
          Privacy <span className="highlight-purple">Policy</span>
        </h1>

        <p className="privacy-subtitle">
          Your privacy matters.
          <br />
          Learn how CodeForge AI collects, uses, and protects your information.
        </p>
      </div>

      {/* Privacy Policy Card */}
      <div className="privacy-card">
        <section className="privacy-section">
          <h2>1. Information We Collect</h2>

          <p>
            We collect information you provide directly to us, such as your
            name, email address, username, profile picture, and any other
            information you choose to share. We may also collect usage data,
            including your activity on the platform, submissions, and learning
            progress.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. How We Use Your Information</h2>

          <p>
            We use your information to provide and improve our services,
            personalize your experience, communicate with you, and maintain
            the security and reliability of the CodeForge AI platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Data Security</h2>

          <p>
            We take reasonable measures to protect your information from
            unauthorized access, alteration, disclosure, or destruction.
            However, no online service can guarantee complete security.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Your Rights</h2>

          <p>
            You can access, update, or delete certain personal information
            through your account settings. If you have questions about your
            data or privacy, you can contact us for further assistance.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

import { useState } from "react";
import { Send, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import { sendMessage } from "../../services/contactmessages";
import "./ContactUs.css";

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await sendMessage(formData);

      setSuccess(response.data?.message || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="contact-page-container">
      {/* Header Section */}
      <div className="contact-header">
        <span className="badge-support">SUPPORT</span>
        <h1 className="contact-title">
          Contact <span className="highlight-purple">Us</span>
        </h1>
        <p className="contact-subtitle">
          Have a question, suggestion, or need help? We'd love to hear from you.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="contact-content-grid">
        {/* Left Side: Form */}
        <div className="contact-card form-card">
          <h2 className="card-heading">Send us a message</h2>

          {success && <div className="alert-message success-message">{success}</div>}
          {error && <div className="alert-message error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="required-star">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Subject <span className="required-star">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Message <span className="required-star">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="form-textarea"
              />
            </div>

            <button type="submit" className="submit-btn">
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right Side: Info Panel */}
        <div className="contact-card info-card">
          <div className="info-list">
            <div className="info-item">
              <div className="info-icon-wrapper">
                <Mail size={18} />
              </div>
              <div className="info-details">
                <span className="info-label">Email</span>
                <a href="mailto:support@codeforge.ai" className="info-value email-link">
                  support@codeforge.ai
                </a>
                <span className="info-subtext">We'll reply as soon as possible.</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={18} />
              </div>
              <div className="info-details">
                <span className="info-label">Location</span>
                <span className="info-value">Amman, Jordan</span>
                <span className="info-subtext">Our team is remote.</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrapper">
                <Clock size={18} />
              </div>
              <div className="info-details">
                <span className="info-label">Business Hours</span>
                <span className="info-value">Monday - Friday</span>
                <span className="info-subtext">9:00 AM - 6:00 PM (GMT+3)</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <span className="social-title">Follow us</span>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaGithub size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaTwitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaLinkedin size={18} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaDiscord size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;

import "./CallToAction.css";
import { ArrowRight, Sparkles } from "lucide-react";

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-glow-wrapper">
        <div className="cta-container">
          <span className="cta-badge">
            <Sparkles size={12} /> START FREE TODAY
          </span>

          <h2 className="cta-title">
            Ready to <span className="purple-text">level up?</span>
          </h2>

          <p className="cta-description">
            Join us to sharpen your skills on CodeForge AI. No credit card required.
          </p>

          <div className="cta-actions">
            <button className="cta-btn primary-btn">
              <span>Start your journey</span>
              <ArrowRight size={16} />
            </button>
            <button className="cta-btn secondary-btn">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;

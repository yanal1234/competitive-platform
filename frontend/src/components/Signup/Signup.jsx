import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Target,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Signup.css";
import logoSvg from "../../assets/logo.svg";

function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    Confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.Confirm_password) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setSuccess("Account created successfully!");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="signup-page">
      {/* عناصر الخلفية والإضاءة التفاعلية */}
      <div className="bg-glow-purple"></div>
      <div className="bg-glow-blue"></div>
      <div className="bg-glow-cyan"></div>
      <div className="circuit-lines-bg"></div>

      {/* مجموعة الأشكال الهندسية العائمة بالخلفية (المزيدة) */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      <div className="floating-shape shape-4"></div>
      <div className="floating-shape shape-5"></div>
      <div className="floating-shape shape-6"></div>

      {/* Header */}
      <header className="signup-header">
        <div className="brand-logo">
          <img src={logoSvg} alt="CodeForge AI Logo" className="logo-img" />
        </div>

        {/* زر العودة المطور بأسلوب Glassmorphism */}
        <Link to="/" className="back-to-home-btn">
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="signup-container">
        {/* Left Side: Brand Showcase */}
        <section className="showcase-section">
          <span className="tagline">
            YOUR PERSONAL{" "}
            <span className="highlight-text-cyan">COMPETITIVE EDGE</span>
          </span>

          <h1 className="hero-heading">
            Your next <span className="highlight-gradient">rating</span>.
            <br />
            <span className="hero-subtext">
              Built <span className="highlight-text-purple">one skill</span> at
              a time.
            </span>
          </h1>

          <p className="hero-description">
            One focused workspace for{" "}
            <span className="text-light">recommendations</span>,{" "}
            <span className="text-light">skill growth</span>, and{" "}
            <span className="text-light">real contests</span>.
          </p>

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-info">
                <span className="stat-label">New roadmap length</span>
                <span className="stat-value">6 weeks</span>
              </div>
              <Clock className="stat-icon" size={20} />
            </div>

            <div className="stat-card highlight-card">
              <div className="stat-info">
                <span className="stat-label">Starter target</span>
                <span className="stat-value purple-text">Specialist</span>
              </div>
              <Target className="stat-icon purple-text" size={20} />
            </div>
          </div>

          {/* Code Snippet Window */}
          <div className="code-snippet-card">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="window-title">training_session.cpp</span>
            </div>
            <div className="code-body">
              <div className="code-line">
                <span className="line-num">01</span>
                <code>
                  <span className="code-keyword">vector</span>&lt;
                  <span className="code-type">int</span>&gt; targets ={" "}
                  <span className="code-func">recommend</span>(profile);
                </code>
              </div>
              <div className="code-line">
                <span className="line-num">02</span>
                <code>
                  <span className="code-keyword">for</span> (
                  <span className="code-keyword">auto</span> problem : targets)
                  &#123;
                </code>
              </div>
              <div className="code-line">
                <span className="line-num">03</span>
                <code>
                  &nbsp;&nbsp;<span className="code-func">solve</span>(problem);
                </code>
              </div>
              <div className="code-line">
                <span className="line-num">04</span>
                <code>&#125;</code>
              </div>
            </div>
            <div className="code-footer">
              <span className="status-indicator"></span>
              <span className="status-text">ROADMAP READY</span>
              <span className="status-detail">
                12 focused problems queued for this week
              </span>
            </div>
          </div>
        </section>

        {/* Right Side: Form Card */}
        <section className="form-section">
          <div className="signup-card">
            <h2 className="form-title">
              Create your <span className="highlight-gradient">account</span>
            </h2>
            <p className="form-subtitle">
              Start a roadmap built around{" "}
              <span className="highlight-text-cyan">your goals</span>.
            </p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="user_name">Username</label>
                <div className="input-wrapper">
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    placeholder="Choose your coder name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                  <User className="input-icon" size={18} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Mail className="input-icon" size={18} />
                </div>
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <Lock className="input-icon left-offset" size={18} />
                </div>
                {/* Strength Meter */}
                <div className="strength-meter">
                  <span
                    className={`bar ${strength >= 1 ? "active" : ""}`}
                  ></span>
                  <span
                    className={`bar ${strength >= 2 ? "active" : ""}`}
                  ></span>
                  <span
                    className={`bar ${strength >= 3 ? "active" : ""}`}
                  ></span>
                  <span
                    className={`bar ${strength >= 4 ? "active" : ""}`}
                  ></span>
                </div>
                <span className="strength-hint">
                  Use 8+ characters with a number and symbol.
                </span>
              </div>

              {/* Confirm Password Input */}
              <div className="form-group">
                <label htmlFor="Confirm_password">Confirm password</label>
                <div className="input-wrapper">
                  <input
                    id="Confirm_password"
                    name="Confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={formData.Confirm_password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                  <Lock className="input-icon left-offset" size={18} />
                </div>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#terms">Terms</a> and{" "}
                  <a href="#privacy">Privacy Policy</a>.
                </label>
              </div>

              <button type="submit" className="submit-btn">
                <span>Create account</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleLogin}
            >
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="login-prompt">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signup;

import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginPage.css";

const PARTICLE_COUNT = 26;

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 3 + 1.5;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * duration;
    const drift = Math.random() * 60 - 30;
    const left = Math.random() * 100;

    return {
      id: i,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: `${Math.random() * 20 - 20}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        "--drift": `${drift}px`,
      },
    };
  });
}

function Logo({ size = "md" }) {
  return (
    <div className={`logo-mark logo-mark--${size}`}>
      <i className="bi bi-controller" />
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span key={p.id} className="particle" style={p.style}></span>
      ))}
    </div>
  );
}

function ArtPanel() {
  return (
    <div className="art-side">
      <FloatingParticles />

      <div className="art-content">
        <div className="brand-top">
          <Logo />
          <span className="logo-text">PLAY</span>
        </div>

        <div className="art-mid">
          <h1>
            Level up your
            <br />
            <span>game library.</span>
          </h1>

          <p>
            Sign in to grab exclusive deals, track your orders and continue your
            gaming journey.
          </p>

          <div className="badge-row">
            <div className="mini-badge">
              <span className="dot"></span>
              Instant Delivery
            </div>

            <div className="mini-badge">
              <span className="dot"></span>
              Secure Checkout
            </div>
          </div>
        </div>

        <div className="stat-block">
          <div>
            <p className="num">120K+</p>
            <p className="label">Gamers</p>
          </div>

          <div>
            <p className="num">4.9</p>
            <p className="label stars">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </p>
          </div>

          <div>
            <p className="num">2400+</p>
            <p className="label">Titles</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      rememberMe,
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Email</label>

        <div className="input-wrap">
          <i className="bi bi-envelope icon"></i>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label>Password</label>

        <div className="input-wrap">
          <i className="bi bi-lock icon"></i>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              }`}
            ></i>
          </button>
        </div>
      </div>

      <div className="row-between">
        <label className="remember">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>

        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      <button className="btn-primary" type="submit">
        Log In
      </button>
    </form>
  );
}

function SocialLogin() {
  return (
    <div className="social-row">
      <button className="social-btn google">
        <i className="bi bi-google"></i>
        Continue with Google
      </button>

      <button className="social-btn discord">
        <i className="bi bi-discord"></i>
        Continue with Discord
      </button>
    </div>
  );
}

function LoginCard({ onSubmit }) {
  return (
    <div className="card">
      <div className="card-logo">
        <Logo size="sm" />
        <span>PLAY</span>
      </div>

      <h2>Welcome Back</h2>

      <p className="sub">
        Log in to continue browsing your library and exclusive deals.
      </p>

      <LoginForm onSubmit={onSubmit} />

      <div className="divider">or continue with</div>

      <SocialLogin />

      <p className="switch-line">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    console.log(credentials);

    // Backend login API will be added later

    // navigate("/");
  };

  return (
    <div className="stage">
      <ArtPanel />

      <div className="form-side">
        <LoginCard onSubmit={handleLogin} />
      </div>
    </div>
  );
}

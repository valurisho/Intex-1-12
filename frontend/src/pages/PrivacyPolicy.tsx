import { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <div className="privacy-header-logo">
          <Link to="/mainPage">
            <img src="/logo-s.png" alt="CineNiche Logo" />
          </Link>
        </div>
        <div className="privacy-header-nav">
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </div>
      </div>

      <div className="privacy-content">
        <h2>Privacy Policy</h2>
        <p>
          Welcome to CineNiche — your curated portal for cinematic gems, offbeat
          flicks, and the occasional Nicolas Cage marathon. We respect your
          privacy (almost as much as we respect a well-executed plot twist).
        </p>

        <h3>🎬 What We Collect</h3>
        <p>
          We collect just enough data to make your experience awesome. Here's
          what we gather:
        </p>
        <ul>
          <li>
            Your name and email address (especially if you sign up — no spam,
            pinky promise)
          </li>
          <li>Your movie preferences (we see you, rom-com lovers)</li>
          <li>Site usage data (like pages you visit and buttons you click)</li>
          <li>
            Technical info (browser type, IP address, device type — you know,
            the usual nerdy stuff)
          </li>
        </ul>

        <h3>⚖️ Why We Collect It</h3>
        <p>
          We only collect personal data when we have a lawful reason. That
          includes:
        </p>
        <ul>
          <li>
            <strong>Consent</strong> – like when you sign up for our email list
            or accept cookies
          </li>
          <li>
            <strong>Contractual necessity</strong> – like creating and managing
            your CineNiche account
          </li>
          <li>
            <strong>Legitimate interests</strong> – improving our services,
            troubleshooting, or understanding what movies you love
          </li>
        </ul>

        <h3>🍿 How We Use Your Info</h3>
        <ul>
          <li>To recommend movies you’ll actually enjoy</li>
          <li>To personalize your browsing experience</li>
          <li>To fix bugs and make the platform better</li>
          <li>To send occasional updates (only if you opt in)</li>
        </ul>

        <h3>🔐 Data Security</h3>
        <p>
          We protect your data like it’s the script for the next Nolan film.
          That said, no system is 100% secure, so please use strong passwords
          and never share sensitive info like payment details through unsecured
          channels.
        </p>

        <h3>🌍 International Users & Data Transfers</h3>
        <p>
          If you're based in the European Economic Area (EEA), your data may be
          transferred to and processed in the United States. Don’t worry — we
          ensure appropriate safeguards, like Standard Contractual Clauses, to
          keep your data protected.
        </p>

        <h3>🍪 Cookies</h3>
        <p>
          We use cookies (sadly, not the chocolate chip kind) to remember your
          preferences and improve our site. You’ll be asked to accept or reject
          non-essential cookies when you visit. You can change your cookie
          settings anytime.
        </p>

        <h3>📅 Data Retention</h3>
        <p>
          We only keep your data as long as needed for the purposes outlined in
          this policy — or as required by law. After that, it’s securely deleted
          or anonymized.
        </p>

        <h3>🧙 Your Data Rights (Under GDPR)</h3>
        <p>If you're in the EEA, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to or restrict how we use your data</li>
          <li>Withdraw consent at any time (for stuff you opted into)</li>
          <li>Request your data in a portable format</li>
          <li>Lodge a complaint with your local data protection authority</li>
        </ul>
        <p>
          Just email us at{' '}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a> — or
          send a very determined carrier pigeon.
        </p>

        <h3>🕺 Third-Party Services</h3>
        <p>
          We don’t sell, rent, or trade your info. If we use third-party
          services (like analytics or hosting), they only get the data they need
          to do their job — nothing more.
        </p>

        <h3>🚨 Changes to This Policy</h3>
        <p>
          If we make significant changes, we’ll let you know. If it’s minor,
          we’ll just update the date below — but feel free to check back
          anytime.
        </p>

        <h3>💌 Contact Us</h3>
        <p>
          Questions? Confused? Want to talk about <em>The Matrix</em> trilogy?
          Reach us at:{' '}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
        </p>
        <p>
          <strong>Last updated:</strong> April 10, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

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
          <Link to="/privacy-policy" className="privacy-header-link">
            Privacy Policy
          </Link>
          <Link to="/logout" className="privacy-header-link">
            Logout
          </Link>
        </div>
      </div>

      <div className="privacy-content">
        <h2>Privacy Policy</h2>
        <p>
          Welcome to CineNiche, your go-to source for movie recommendations,
          cinematic deep cuts, and possibly too many Nicolas Cage references.
        </p>

        <h3>🎬 What We Collect</h3>
        <ul>
          <li>
            Your name (especially if it’s cool, like Maverick or Hermione)
          </li>
          <li>Your email address (no spam, pinky promise)</li>
          <li>
            Your movie preferences (so we don’t recommend Shrek 4 for the 6th
            time)
          </li>
          <li>
            Basic site usage data (pages you visit, buttons you click, emotional
            roller coasters you ride)
          </li>
        </ul>

        <h3>🍿 How We Use Your Info</h3>
        <ul>
          <li>Recommend movies you’ll actually enjoy (we hope)</li>
          <li>Improve our service (aka make the site less buggy)</li>
          <li>Send you occasional updates (only if you’re cool with it)</li>
          <li>Argue internally about whether Die Hard is a Christmas movie</li>
        </ul>

        <h3>🔒 Security</h3>
        <p>
          We guard your data like it’s the last copy of <em>The Godfather</em>{' '}
          on VHS. But remember, no system is 100% secure—so please don’t share
          your credit card number or the plot twist to <em>Fight Club</em>.
        </p>

        <h3>🕺 Third Parties</h3>
        <p>
          We don’t sell, rent, or trade your data. We’re too introverted for
          that kind of social networking. If we ever use third-party tools,
          they’ll only get the bare minimum data—think popcorn crumbs, not the
          whole bucket.
        </p>

        <h3>🌍 International Users</h3>
        <p>
          If you’re visiting from outside the U.S., just know your data is
          processed in the land of free refills and movie theater recliners.
        </p>

        <h3>🤖 Cookies</h3>
        <p>
          Yes, we use cookies. Sadly, not the chocolate chip kind. These are
          small data files that help us remember if you prefer thrillers or
          romantic comedies.
        </p>

        <h3>🧙 Your Rights</h3>
        <ul>
          <li>Ask what info we have on you</li>
          <li>Tell us to delete your info</li>
          <li>Suggest better movie recommendations (we’re listening)</li>
        </ul>
        <p>
          Email us at{' '}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a> or
          send a carrier pigeon. The pigeon will probably get here faster.
        </p>

        <h3>🚨 Changes to This Policy</h3>
        <p>
          If we change this policy, we’ll update the date and try not to confuse
          you. If the changes are big, we might even tell you. Maybe.
        </p>

        <h3>💌 Contact Us</h3>
        <p>
          Have questions? Concerns? A burning desire to talk about{' '}
          <em>The Matrix</em> trilogy? Email us at:{' '}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

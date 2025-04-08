import { Link } from 'react-router-dom';

const PrivacyPageFooter = () => {
  return (
    <footer>
      <p style={{ margin: 0 }}>
        <Link
          to="/privacy-policy"
          style={{
            color: '#ecf0f1',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.9rem',
          }}
        >
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
};

export default PrivacyPageFooter;

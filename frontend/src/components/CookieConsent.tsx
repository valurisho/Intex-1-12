// components/CookieConsent.tsx
import { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        backgroundColor: '#222',
        color: 'white',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      This site uses cookies for authentication and functionality.{' '}
      <button
        onClick={handleAccept}
        style={{ marginLeft: '1rem', padding: '0.5rem' }}
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;

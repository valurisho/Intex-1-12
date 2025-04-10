import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.net/logout',
        {
          method: 'POST',
          credentials: 'include', // Ensure cookies are sent
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <a className="logout-button" href="#" onClick={handleLogout}>
      {props.children}
    </a>
  );
}

export default Logout;

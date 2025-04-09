import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
  role?: string; // add role support
}

interface AuthorizeViewProps {
  children: React.ReactNode;
  requiredRole?: string; // optional role to restrict by
}

function AuthorizeView({ children, requiredRole }: AuthorizeViewProps) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let emptyUser: User = { email: '', role: '' };

  const [user, setUser] = useState<User>(emptyUser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email, role: data.role });

          // If no specific role is required, or role matches, authorize
          if (!requiredRole || data.role === requiredRole) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry('https://localhost:5000/pingauth', {
      method: 'GET',
      credentials: 'include',
    });
  }, [requiredRole]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null;

  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;

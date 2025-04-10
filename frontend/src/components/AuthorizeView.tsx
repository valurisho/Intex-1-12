import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext<User | null>(null);

interface User {
  email: string;
  role?: string;
}

interface AuthorizeViewProps {
  children: React.ReactNode | ((user: User | null) => React.ReactNode);
  requiredRole?: string;
}

function AuthorizeView({ children, requiredRole }: AuthorizeViewProps) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('https://localhost:5000/pingauth', {
          method: 'GET',
          credentials: 'include',
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await response.json();

        if (data.email) {
          const userObj = { email: data.email, role: data.role };
          setUser(userObj);
          setAuthorized(!requiredRole || data.role === requiredRole);
        } else {
          throw new Error('Invalid user session');
        }
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [requiredRole]);

  if (loading) return <p>Loading...</p>;

  if (!authorized) return <Navigate to="/login" />;

  return (
    <UserContext.Provider value={user}>
      {typeof children === 'function' ? children(user) : children}
    </UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);
  if (!user) return null;

  const rawUsername = user.email.split('@')[0];
  const username = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1);

  return props.value === 'email' ? <>{username}</> : null;
}

export default AuthorizeView;

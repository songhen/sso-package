import { useEffect, useState, FC } from 'react';
import './App.css';
import { CognitoService } from 'auth';

interface User {
  email: string;
  // Add other user properties as needed
}

const App: FC = () => {
  const cognitoService = CognitoService.getInstance();

  const [user, setUser] = useState<User | null>(null);

  const exchangeToken = async (code: string): Promise<void> => {
    try {
      const { id_token, access_token, refresh_token } = await cognitoService.exchangeTokenByAuthorizationCode(code);
      const user = await cognitoService.getCurrentUser(access_token);
      setUser(user);
      localStorage.setItem('id_token', id_token);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    } catch (error) {
      cognitoService.logoutWithHostedUI();
      console.error('error', error);
    }
  };

  const validateToken = async (token: string): Promise<void> => {
    try {
      if (token) {
        const valid = await cognitoService.verifyToken(token);
        if (valid) {
          const user = await cognitoService.getCurrentUser(token);
          setUser(user);
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('id_token');
          localStorage.removeItem('refresh_token');
          console.error('Token is invalid');
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (localStorage.getItem('access_token')) {
      validateToken(localStorage.getItem('access_token') || '');
    } else if (code) {
      exchangeToken(code);
    }
  }, []);

  return (
    <div className="App">
      {user && <h3>Welcome: {user.email}</h3>}
      {localStorage.getItem('access_token') ? (
        <button onClick={() => cognitoService.logoutWithHostedUI()}>Logout</button>
      ) : (
        <button onClick={() => cognitoService.loginWithHostedUI()}>Login</button>
      )}
    </div>
  );
};

export default App;
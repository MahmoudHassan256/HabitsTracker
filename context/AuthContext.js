import { useContext, createContext, useState, useEffect } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { account } from '../lib/appwrite';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    checkAuth();
  };

  const checkAuth = async () => {
    try {
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log('No active session Error');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signin = async ({ email, password }) => {
    setLoading(true);
    try {
      const responseSession = await account.createEmailPasswordSession(email, password);
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log('Login error:', error);
    }
    setLoading(false);
  };
  const signout = async () => {
    setLoading(true);
    await account.deleteSession('current');
    setSession(null);
    setLoading(false);
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      const responseSession = await account.createEmailPasswordSession({ email, password });
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log('Register error:', error);
    }
    setLoading(false);
  };

  const contextData = { session, user, signin, signout, register };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading..</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };

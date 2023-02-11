import { auth } from '@/firebase/firebaseConfig';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => setUser(user));
    return subscriber;
  }, []);

  return user;
};

export default useUser;

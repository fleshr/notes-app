import authModalState from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const SignupForm = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    'reapeted-password': '',
  });
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (credentials.password !== credentials['reapeted-password'])
        throw new Error("Password don't match");

      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await updateProfile(auth.currentUser!, {
        displayName: credentials.username,
      });
      await updateCurrentUser(auth, auth.currentUser);

      setAuthModalState((prev) => ({
        ...prev,
        opened: false,
      }));
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2 className="text-center text-xl font-medium">Sign Up</h2>
      <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col">
        {error && (
          <p className="mb-2 text-center text-sm text-red-500">{error}</p>
        )}
        <input
          value={credentials.username}
          onChange={handleInputChange}
          className={`h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          value={credentials.email}
          onChange={handleInputChange}
          className={`mt-3 h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          value={credentials.password}
          onChange={handleInputChange}
          className={`mt-3 h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          value={credentials['reapeted-password']}
          onChange={handleInputChange}
          className={`mt-3 h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="password"
          name="reapeted-password"
          placeholder="Repeat password"
        />
        <button
          type="submit"
          className="mt-6 h-9 rounded-lg bg-gray-900 text-white"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-8 text-center text-sm">
        Already a member?{' '}
        <button
          type="button"
          className="underline hover:no-underline"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: 'login' }))
          }
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;

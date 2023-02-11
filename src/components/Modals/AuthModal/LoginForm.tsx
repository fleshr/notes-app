import authModalState from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const LoginForm = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (credentials.email.length < 5) {
      setError('Email must be longer than 5 characters');
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setAuthModalState((prev) => ({ ...prev, opened: false }));
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-medium">Log In</h2>
      <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col">
        {error && (
          <p className="mb-2 text-center text-sm text-red-500">{error}</p>
        )}
        <input
          value={credentials.email}
          onChange={handleInputChange}
          className={`h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          value={credentials.password}
          onChange={handleInputChange}
          className={`mt-3 h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50  ${
            error && 'border-red-500'
          }`}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          type="button"
          className="ml-auto mt-2 text-sm hover:underline"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: 'reset' }))
          }
        >
          Forget password?
        </button>
        <button
          type="submit"
          className="mt-4 h-9 rounded-lg bg-gray-900 text-white"
        >
          Log In
        </button>
      </form>
      <p className="mt-8 text-center text-sm">
        Not a member?{' '}
        <button
          type="button"
          className="underline hover:no-underline"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: 'signup' }))
          }
        >
          Sing Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

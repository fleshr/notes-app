import authModalState from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const ResetForm = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);

      setAuthModalState((prev) => ({ ...prev, opened: false }));
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-medium">Reset password</h2>
      <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col">
        {error && (
          <p className="mb-2 text-center text-sm text-red-500">{error}</p>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`h-9 w-full rounded-lg border border-black/15 bg-white px-4 placeholder:text-black/50 ${
            error && 'border-red-500'
          }`}
          type="email"
          name="email"
          placeholder="Email"
        />
        <button
          type="submit"
          className="mt-6 h-9 rounded-lg bg-gray-900 text-white"
        >
          Reset password
        </button>
      </form>
      <p className="mt-8 text-center text-sm">
        <button
          type="button"
          className="underline hover:no-underline"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: 'signup' }))
          }
        >
          Return to Log In
        </button>
      </p>
    </div>
  );
};

export default ResetForm;

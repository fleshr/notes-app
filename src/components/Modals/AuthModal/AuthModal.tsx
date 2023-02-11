import authModalState from '@/atoms/authModalAtom';
import { MdOutlineClose } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import LoginForm from './LoginForm';
import ResetForm from './ResetForm';
import SignupForm from './SignupForm';

const AuthModal = () => {
  const [authModal, setAuthModalState] = useRecoilState(authModalState);

  if (!authModal.opened) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget)
          setAuthModalState((prev) => ({ ...prev, opened: false }));
      }}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
    >
      <div className="relative h-full w-full bg-gray-50 px-5 pt-4 pb-8 dark:bg-gray-700 md:h-auto md:w-[420px] md:rounded-xl md:px-[70px]">
        <button
          className="absolute top-4 right-5 rounded-md p-0.5 hover:bg-black/10"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, opened: false }))
          }
        >
          <MdOutlineClose className="text-2xl" />
        </button>
        {authModal.view === 'login' && <LoginForm />}
        {authModal.view === 'signup' && <SignupForm />}
        {authModal.view === 'reset' && <ResetForm />}
      </div>
    </div>
  );
};

export default AuthModal;

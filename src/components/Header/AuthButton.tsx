import authModalState from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';

const AuthButton = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <button
      className="flex h-8 items-center rounded-lg border border-black/15 px-3.5 text-sm hover:border-black/20 hover:bg-gray-100"
      onClick={() => {
        setAuthModalState({
          opened: true,
          view: 'login',
        });
      }}
    >
      Log In <span className="hidden md:inline">&nbsp;/ Sign Up</span>
    </button>
  );
};

export default AuthButton;

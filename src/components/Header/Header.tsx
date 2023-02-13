import useUser from '@/hooks/useUser';
import AuthButton from './AuthButton';
import Logo from './Logo';
import User from './Profile';

const Header = () => {
  const user = useUser();

  return (
    <header className="h-12 w-full flex-shrink-0 bg-white shadow-header dark:bg-gray-700">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between px-2.5 md:px-5">
        <Logo />
        {user ? <User /> : <AuthButton />}
      </div>
    </header>
  );
};

export default Header;

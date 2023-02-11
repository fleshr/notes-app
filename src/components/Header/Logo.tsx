import { TbNote } from 'react-icons/tb';

const Logo = () => {
  return (
    <div className="flex items-center">
      <TbNote className="mr-2 text-[1.75rem] md:text-3xl" />
      <span className="text-lg font-medium md:text-xl">Notes</span>
    </div>
  );
};

export default Logo;

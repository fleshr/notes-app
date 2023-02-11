interface IProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded-md border border-black/15 bg-white/50 text-black/80 hover:border-black/20 hover:bg-white/80 dark:bg-black/10 dark:text-white/80 dark:hover:bg-black/20 ${
        className ?? ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

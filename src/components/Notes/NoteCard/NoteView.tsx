import { INote } from '@/interfaces/Note';
import moment from 'moment';
import { TbEdit } from 'react-icons/tb';
import Button from './Button';

interface IProps {
  note: INote;
  onEditButtonClick: () => void;
}

const NoteView: React.FC<IProps> = ({
  note: {
    title,
    text,
    date: { seconds },
  },
  onEditButtonClick,
}) => {
  const date = moment(seconds * 1000).format('MMM D, YYYY');

  return (
    <>
      {title && <h3 className="mb-2.5 break-words font-medium">{title}</h3>}
      <p className="mb-5 break-words text-sm">{text}</p>
      <div className="mt-auto flex min-h-[28px]">
        <Button
          className="md:hidden md:group-hover:flex"
          onClick={() => onEditButtonClick()}
        >
          <TbEdit />
        </Button>
        <time className="ml-auto self-end text-xs text-black/80 dark:text-white/70">
          {date}
        </time>
      </div>
    </>
  );
};

export default NoteView;

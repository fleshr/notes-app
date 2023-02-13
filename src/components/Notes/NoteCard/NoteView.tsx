import { INote } from '@/interfaces/Note';
import moment from 'moment';
import { TbEdit } from 'react-icons/tb';
import Button from './Button';

interface IProps {
  note: INote;
  isEditable: boolean;
  onEditButtonClick: () => void;
}

const NoteView: React.FC<IProps> = ({
  isEditable,
  note: { title, text, date },
  onEditButtonClick,
}) => {
  const readableDate = moment(date.seconds * 1000).format('MMM D, YYYY');

  return (
    <>
      {title && <h3 className="mb-2.5 break-words font-medium">{title}</h3>}
      <p className="mb-5 break-words text-sm">{text}</p>
      <div className="mt-auto flex min-h-[28px]">
        {isEditable && (
          <Button
            className="md:hidden md:group-hover:flex"
            onClick={() => onEditButtonClick()}
          >
            <TbEdit />
          </Button>
        )}
        <time className="ml-auto self-end text-xs text-black/80 dark:text-white/70">
          {readableDate}
        </time>
      </div>
    </>
  );
};

export default NoteView;

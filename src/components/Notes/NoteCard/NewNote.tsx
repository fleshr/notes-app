import { COLORS } from '@/constants/colors';
import { INoteWithoutID } from '@/interfaces/Note';
import { useState } from 'react';
import { BiColorFill } from 'react-icons/bi';
import { MdOutlineClose, MdOutlineDone } from 'react-icons/md';
import Button from './Button';
import Loader from './Loader';

interface IProps {
  onCreate: (note: INoteWithoutID) => Promise<void>;
  onCancel: () => void;
}

const NewNoteCard: React.FC<IProps> = ({ onCreate, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState<keyof typeof COLORS>('yellow');

  const handleNoteCreate = async () => {
    setIsLoading(true);
    const date = Math.floor(new Date().getTime() / 1000);
    const note: INoteWithoutID = {
      color,
      text,
      title,
      date: { seconds: date, nanoseconds: date * 1000000 },
    };
    await onCreate(note);
    setIsLoading(false);
  };

  const handleColorChange = () => {
    const keys = Object.keys(COLORS);
    let nextIndex = keys.indexOf(color) + 1;
    if (nextIndex >= keys.length) nextIndex = 0;
    const nextColor = keys[nextIndex] as keyof typeof COLORS;

    setColor(nextColor);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-xl border border-black/10 px-5 pt-3.5 pb-3 text-black/90 dark:text-white/90 ${COLORS[color]}`}
    >
      {isLoading && <Loader />}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Note title(optional)"
        className="bg-transparent font-medium placeholder:text-black/50 dark:placeholder:text-white/50"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-2.5 mb-5 flex-grow bg-transparent text-sm placeholder:text-black/50 dark:placeholder:text-white/50"
        placeholder="Note text"
      ></textarea>
      <div className="relative mt-auto flex justify-end gap-2">
        <Button onClick={handleColorChange}>
          <BiColorFill className="text-lg" />
        </Button>
        <Button onClick={onCancel}>
          <MdOutlineClose className="text-lg" />
        </Button>
        <Button onClick={handleNoteCreate}>
          <MdOutlineDone className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default NewNoteCard;

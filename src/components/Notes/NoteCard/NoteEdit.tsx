import { COLORS } from '@/constants/colors';
import { INote } from '@/interfaces/Note';
import { useState } from 'react';
import { BiColorFill } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlineClose, MdOutlineDone } from 'react-icons/md';
import Button from './Button';

interface IProps {
  note: INote;
  onEdit: (title: string, text: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onColorChange: (curColor: keyof typeof COLORS) => void;
}

const NoteEdit: React.FC<IProps> = ({
  note,
  onEdit,
  onCancel,
  onDelete,
  onColorChange,
}) => {
  const [title, setTitle] = useState(note.title ?? '');
  const [text, setText] = useState(note.text);

  return (
    <>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Note title(optional)"
        className="bg-transparent font-medium placeholder:text-black/50"
      />
      <textarea
        onInput={(e) => console.log(e.target)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-2.5 mb-5 flex-grow bg-transparent text-sm placeholder:text-black/50"
        placeholder="Note text"
      ></textarea>
      <div className="relative mt-auto flex justify-end gap-2">
        <Button onClick={() => onColorChange(note.color)}>
          <BiColorFill className="text-lg" />
        </Button>
        <Button onClick={() => onDelete(note.id)}>
          <FiTrash2 />
        </Button>
        <Button onClick={() => onCancel()}>
          <MdOutlineClose className="text-lg" />
        </Button>
        <Button onClick={() => onEdit(title, text)}>
          <MdOutlineDone className="text-lg" />
        </Button>
      </div>
    </>
  );
};

export default NoteEdit;

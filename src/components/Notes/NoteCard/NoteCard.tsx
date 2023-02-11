import notesState from '@/atoms/notesAtom';
import { COLORS } from '@/constants/colors';
import { firestore } from '@/firebase/firebaseConfig';
import useUser from '@/hooks/useUser';
import { INote } from '@/interfaces/Note';
import { deleteDoc, doc, runTransaction } from 'firebase/firestore';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Loader from './Loader';
import NoteEdit from './NoteEdit';
import NoteView from './NoteView';

interface IProps {
  note: INote;
}

const NoteCard: React.FC<IProps> = ({ note }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [noteState, setNoteState] = useState(note);
  const user = useUser();
  const setNotes = useSetRecoilState(notesState);

  const handleNoteEdit = async (title: string, text: string) => {
    setIsLoading(true);
    const noteRef = doc(firestore, 'users', user?.uid!, 'notes', noteState.id);
    await runTransaction(firestore, async (transaction) => {
      transaction.update(noteRef, { ...noteState, title, text });
    });
    setNoteState((prev) => ({ ...prev, title, text }));
    setIsEdited(false);
    setIsLoading(false);
  };

  const handleNoteDelete = async () => {
    setIsLoading(true);
    const noteRef = doc(firestore, 'users', user?.uid!, 'notes', noteState.id);
    await deleteDoc(noteRef);
    setNotes(
      (prev) => prev?.filter((note) => note.id !== noteState.id) ?? null
    );
    setIsLoading(false);
  };

  const handleColorChange = (curColor: keyof typeof COLORS) => {
    const keys = Object.keys(COLORS);
    let nextIndex = keys.indexOf(curColor) + 1;
    if (nextIndex >= keys.length) nextIndex = 0;
    const nextColor = keys[nextIndex] as keyof typeof COLORS;

    setNoteState((prev) => ({ ...prev, color: nextColor }));
  };

  const handleCancelEdit = () => {
    setNoteState(note);
    setIsEdited(false);
  };

  return (
    <div
      className={`group relative flex min-h-[12rem] flex-col rounded-xl border border-black/10 px-5 pt-3.5 pb-3 text-black/90 dark:border-white/10 dark:text-white/90 ${
        COLORS[noteState.color]
      }`}
    >
      {isLoading && <Loader />}
      {isEdited ? (
        <NoteEdit
          note={noteState}
          onEdit={handleNoteEdit}
          onCancel={handleCancelEdit}
          onDelete={handleNoteDelete}
          onColorChange={handleColorChange}
        />
      ) : (
        <NoteView
          note={noteState}
          onEditButtonClick={() => setIsEdited(true)}
        />
      )}
    </div>
  );
};

export default NoteCard;

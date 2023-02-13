import authModalState from '@/atoms/authModalAtom';
import filterState from '@/atoms/filterAtom';
import notesState from '@/atoms/notesAtom';
import { firestore } from '@/firebase/firebaseConfig';
import useUser from '@/hooks/useUser';
import { INoteWithoutID } from '@/interfaces/Note';
import { fetchNotes } from '@/utils';
import {
  addDoc,
  collection,
  CollectionReference,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import NewNoteCard from './NoteCard/NewNote';
import NoteCard from './NoteCard/NoteCard';
import NotesHeader from './NotesHeader';

const Notes = () => {
  const [newNote, setNewNote] = useState(false);

  const user = useUser();
  const [notes, setNotes] = useRecoilState(notesState);
  const filter = useRecoilValue(filterState);
  const setModalState = useSetRecoilState(authModalState);

  useEffect(() => {
    async function fetchData(user: string) {
      const notes = await fetchNotes(firestore, user);
      setNotes(notes);
    }
    if (!user) {
      fetchData('default');
      return;
    }
    fetchData(user?.uid!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNoteCreate = async (note: INoteWithoutID) => {
    const collectionRef = collection(
      firestore,
      'users',
      user?.uid!,
      'notes'
    ) as CollectionReference<INoteWithoutID>;
    const docRef = await addDoc(collectionRef, {
      ...note,
      date: serverTimestamp(),
    });
    setNewNote(false);
    setNotes((prev) => [{ ...note, id: docRef.id }, ...(prev ?? [])]);
  };

  const handleNewNoteButtonClick = () => {
    if (!user) {
      setModalState({ opened: true, view: 'login' });
      return;
    }
    setNewNote((prev) => !prev);
  };

  return (
    <section>
      <NotesHeader onNewNoteClick={handleNewNoteButtonClick} />
      <div className="mt-7.5 grid grid-cols-notes gap-5">
        {newNote && (
          <NewNoteCard
            onCreate={handleNoteCreate}
            onCancel={() => setNewNote(false)}
          />
        )}
        {notes &&
          notes
            .filter((note) => {
              if (!filter.length) return true;
              return filter.includes(note.color);
            })
            .map((note) => (
              <NoteCard isEditable={!!user} key={note.id} note={note} />
            ))}
      </div>
    </section>
  );
};

export default Notes;

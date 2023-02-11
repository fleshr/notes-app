import filterState from '@/atoms/filterAtom';
import notesState from '@/atoms/notesAtom';
import { firestore } from '@/firebase/firebaseConfig';
import useUser from '@/hooks/useUser';
import { INoteWithoutID } from '@/interfaces/Note';
import { fetchNotes } from '@/utils';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import NewNoteCard from './NoteCard/NewNote';
import NoteCard from './NoteCard/NoteCard';
import NotesHeader from './NotesHeader';

const Notes = () => {
  const [newNote, setNewNote] = useState(false);

  const user = useUser();
  const [notes, setNotes] = useRecoilState(notesState);
  const filter = useRecoilValue(filterState);

  useEffect(() => {
    if (!user?.uid) return;
    async function fetchData() {
      const notes = await fetchNotes(firestore, user?.uid!);
      setNotes(notes);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleNoteCreate = async (note: INoteWithoutID) => {
    const collectionRef = collection(firestore, 'users', user?.uid!, 'notes');
    const docRef = await addDoc(collectionRef, {
      ...note,
      date: serverTimestamp(),
    });
    setNewNote(false);
    setNotes((prev) => [{ ...note, id: docRef.id }, ...(prev ?? [])]);
  };

  return (
    <section>
      <NotesHeader
        onNewNoteClick={() => {
          setNewNote((prev) => !prev);
        }}
      />
      <div className="grid grid-cols-notes gap-5">
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
            .map((note) => <NoteCard key={note.id} note={note} />)}
      </div>
    </section>
  );
};

export default Notes;

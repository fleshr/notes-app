import { INote, INoteWithoutID } from '@/interfaces/Note';
import {
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

export const fetchNotes = async (
  firestore: Firestore,
  userId: string
): Promise<INote[]> => {
  const q = query(
    collection(
      firestore,
      'users',
      userId,
      'notes'
    ) as CollectionReference<INoteWithoutID>,
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return notes;
};

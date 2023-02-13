import { Timestamp } from 'firebase/firestore';

export interface INote extends INoteWithoutID {
  id: string;
}

export interface INoteWithoutID {
  title?: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
  date: Timestamp;
}

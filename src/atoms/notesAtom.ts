import { INote } from '@/interfaces/Note';
import { atom } from 'recoil';

type IState = INote[] | null;

const defaultState: IState = null;

const notesState = atom<IState>({
  key: 'Notes',
  default: defaultState,
});

export default notesState;

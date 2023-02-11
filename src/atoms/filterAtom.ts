import { atom } from 'recoil';

type IState = string[];

const defaultState: IState = [];

const filterState = atom<IState>({
  key: 'Filter',
  default: defaultState,
});

export default filterState;

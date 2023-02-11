import { atom } from 'recoil';

interface IState {
  opened: boolean;
  view: 'login' | 'signup' | 'reset';
}

const defaultState: IState = {
  opened: false,
  view: 'login',
};

const authModalState = atom<IState>({
  key: 'AuthModal',
  default: defaultState,
});

export default authModalState;

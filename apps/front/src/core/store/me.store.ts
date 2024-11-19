import { IUser } from '@tennis-stats/types';
import { atom, createStore } from 'jotai';

const emptyUser: IUser = {
  id: -1,
  nickname: 'Guest',
  rating: 0,
  permissions: [],
  ratingHistory: [],
};

const meStore = createStore();
const meAtom = atom<IUser>(emptyUser);

function updateMeStore(user: IUser | null) {
  meStore.set(meAtom, user || emptyUser);
}

export { meStore, meAtom, updateMeStore };

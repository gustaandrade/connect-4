import { boardCols } from 'const';
import { atom, AtomEffect, DefaultValue } from 'recoil';
import { Board, Player, PlayerPrefs } from 'types';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const boardState = atom<Board>({
  key: 'boardState',
  default: Array(boardCols).fill([])
});

export const playerState = atom<Player>({
  key: 'playerState',
  default: 1
});

export const gameOverState = atom<boolean>({
  key: 'gameOverState',
  default: false
});

export const player1Prefs = atom<PlayerPrefs>({
  key: 'player1Prefs',
  default: {
    color: '#f10000',
    name: 'Red',
    wins: 0
  },
  effects: [localStorageEffect('player1Prefs')]
});

export const player2Prefs = atom<PlayerPrefs>({
  key: 'player2Prefs',
  default: {
    color: '#ece100',
    name: 'Yellow',
    wins: 0
  },
  effects: [localStorageEffect('player2Prefs')]
});

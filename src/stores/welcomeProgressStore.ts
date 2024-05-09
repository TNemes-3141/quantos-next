import { atom } from "jotai";

const progressAtom = atom(Math.round(1/6));

export const welcomeProgressAtom = atom(
    (get) => get(progressAtom),

    (get, set, update: number) => {
        set(progressAtom, Math.round(update * 1/6))
    }
);
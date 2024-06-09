import { atom } from "jotai"

const showPasswordAtom = atom([false, false]);

export const showPasswordAtomZero = atom(
    (get) => get(showPasswordAtom)[0] || false,

    (get, set, update: boolean) => {
        const arr = [...get(showPasswordAtom)];
        arr[0] = update;
        set(showPasswordAtom, arr);
    }
);
export const showPasswordAtomOne = atom(
    (get) => get(showPasswordAtom)[1] || false,

    (get, set, update: boolean) => {
        const arr = [...get(showPasswordAtom)];
        arr[1] = update;
        set(showPasswordAtom, arr);
    }
);

export const showPasswordAtomTwo = atom(
    (get) => get(showPasswordAtom)[2] || false,

    (get, set, update: boolean) => {
        const arr = [...get(showPasswordAtom)];
        arr[2] = update;
        set(showPasswordAtom, arr);
    }
);
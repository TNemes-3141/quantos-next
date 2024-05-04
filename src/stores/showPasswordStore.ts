import { atom } from "jotai"

const showPasswordAtom = atom([false, false]);

export function createBooleanElementAtom(index: number) {
    const booleanElementAtom = atom(
        (get) => get(showPasswordAtom)[index] || false,

        (get, set, update: boolean) => {
            const arr = [...get(showPasswordAtom)];
            arr[index] = update;
            set(showPasswordAtom, arr);
        }
    );

    return booleanElementAtom;
}


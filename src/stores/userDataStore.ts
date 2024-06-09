import { atom } from "jotai";

type UserData = {
    id: string,
    name: string | null,
}

export const userDataAtom = atom<UserData>({
    id: "",
    name: null,
});

export const userIdAtom = atom(
    (get) => get(userDataAtom).id,
    (get, set, update: string) => {
        const userData = get(userDataAtom);
        userData.id = update;
        set(userDataAtom, userData);
    }
);

export const userNameAtom = atom(
    (get) => get(userDataAtom).name,
    (get, set, update: string) => {
        const userData = get(userDataAtom);
        userData.name = update;
        console.log("Update: " + update);
        console.log("New user data: " + userData.id + userData.name);
        set(userDataAtom, userData);
    }
);
import { atom } from "jotai";
import { IUser } from "@interfaces";

export const userAtom = atom<IUser | undefined>(undefined);

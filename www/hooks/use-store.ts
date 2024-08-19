import { create } from "zustand";


interface ModalState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));

interface Data {
    url?: string;
    imageSrc?: string
    pageTitle?: string;
    fileName?: string;
}

interface DataStore {
    data: Data;
    setData: (data: Data) => void;
}

export const useDataStore = create<DataStore>((set) => ({
    data: {},
    setData: (data) => set({ data }),
}));
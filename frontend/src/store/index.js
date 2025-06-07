import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null })
});

export const useAppStore = create(devtools(store));
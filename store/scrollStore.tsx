import { create } from "zustand";

interface ScrollState {
  showDemoIcon: boolean; //显示顶部图标
  setShowDemoIcon: (value: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  showDemoIcon: false,
  setShowDemoIcon: (value) =>
    set((state) => ({
      showDemoIcon: value,
    })),
}));

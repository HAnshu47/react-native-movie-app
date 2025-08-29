import type { FlatList } from 'react-native';
import { create } from "zustand";
interface ScrollState {
  showDemoIcon: boolean; //显示顶部图标
  setShowDemoIcon: (value: boolean) => void;
   flatListRef: React.RefObject<FlatList<any> | null>;
  setFlatListRef: (ref: React.RefObject<FlatList<any> | null>) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  showDemoIcon: false,
  setShowDemoIcon: (value) =>
    set((state) => ({
      showDemoIcon: value,
    })),
   flatListRef: { current: null },
  setFlatListRef: (ref) => set({ flatListRef: ref }),
}));

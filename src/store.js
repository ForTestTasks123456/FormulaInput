import { create } from "zustand";

export const useStore = create((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...tag] })),
  updateTag: (index, newTag) =>
    set((state) => ({
      tags: state.tags.map((tag, i) => (i === index ? newTag : tag)),
    })),
  removeTag: (index) =>
    set((state) => ({ tags: state.tags.filter((_, i) => i !== index) })),
}));

export default useStore;

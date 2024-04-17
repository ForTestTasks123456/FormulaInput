import { create } from "zustand";

export const useStore = create((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...tag] })),
  updateTag: (index, newTag) =>
    set((state) => ({
      tags: state.tags.map((tag, i) => (i === index ? newTag : tag)),
    })),
  removeTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    })),
  inputValue: " ",
  setInputValue: (value) =>
    set((state) => ({
      inputValue: value,
    })),
}));

export default useStore;

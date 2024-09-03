import { create } from "zustand";
import { Category } from "../types/data/Category";




interface CategoryStore {
    categoryFilter: Category | null;
    setCategory: (cat: Category | null) => void;
}



export const useCategoryStore = create<CategoryStore>(
    (set) => ({
        categoryFilter: null,
        setCategory: (cat: Category | null) => 
            set((state) => ({
                categoryFilter: cat
            }))
    })
);
import { create } from "zustand";




interface ErrorStore {
    error: string | null;
    setError: (error: string) => void;
    clearError: () => void;
}


export const useErrorStore = create<ErrorStore>(
    (set) => ({
        error: null,
        setError: (error) => 
            set((state) => ({
                error: error
            })),
        clearError: () => 
            set((state) => ({
                error: null
            }))
    })
);


import { create } from "zustand";




interface DateStore {
    date: Date;
    setDate: (date: Date) => void;
}



export const useDateStore = create<DateStore>(
    (set) => ({
        date: new Date,
        setDate: (date: Date) => 
            set((state) => ({
                date: date
            }))
    })
);
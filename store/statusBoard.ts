import { create } from "zustand";
import { Status } from "../types/data/Status";




interface BoardStore {
    status: Status;
    setStatus: (task: Status) => void;
}



export const useBoardStore = create<BoardStore>(
    (set) => ({
        status: 'Not started' as Status,
        setStatus: (status: Status) => 
            set((state) => ({
                status: status
            })) 
        ,
    })
);
import { create } from 'zustand';


export type CategoryModal = 'Category';
export type CalendarModal = 'Calendar';
export type UpdateTaskModal = 'UpdateTask';
export type Modals = CategoryModal | CalendarModal | UpdateTaskModal;

export type ModalMap = {
    Category: CategoryModal;
    Calendar: CalendarModal;
    UpdateTask: UpdateTaskModal;
};

export const appModals: ModalMap = {
    Category: 'Category',
    Calendar: 'Calendar',
    UpdateTask: 'UpdateTask'
}

interface ModalStore<T extends string> {
    modals: Record<T, boolean>;
    toggleModal: (modal: T) => void;
    isOpen: (modal: T) => boolean;
}




const createModalStore = <T extends string>() =>
    create<ModalStore<T>>((set, get) => ({
        modals: {} as Record<T, boolean>,
        toggleModal: (modal: T) =>
            set((state) => ({
                modals: {
                    ...state.modals,
                    [modal]: !state.modals[modal]
                }

            })),
        isOpen: (modal: T) => !!get().modals[modal]
    }
));



const useModalStore = createModalStore<Modals>();
export default useModalStore;

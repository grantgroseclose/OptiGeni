import useModalStore, { Modals } from "../store/modal";


const useModal = <T extends Modals>(modal: T) => {
    const { isOpen, toggleModal } = useModalStore();

    return {
        isOpen: isOpen(modal),
        toggleModal: () => toggleModal(modal),
    };
};



export default useModal;
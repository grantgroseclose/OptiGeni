import React from 'react';
import createAppModal from './AppModal';
import { appModals, CategoryModal } from '../../store/modal';

import AddCategoryForm from '../form/AddCategoryForm';
import useModal from '../../hooks/useModal';




const AddCategoryModal: React.FC = () => {
    const { isOpen } = useModal<CategoryModal>(appModals['Category']);
    const CategoryDropdownModal = createAppModal<CategoryModal>();


    return (
        <>
			{ isOpen &&
				<CategoryDropdownModal modal={appModals['Category']}>
					<AddCategoryForm />
				</CategoryDropdownModal>
			}
        </>
    );
};




export default AddCategoryModal;


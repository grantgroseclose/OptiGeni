import React from 'react';
import AppModal from './AppModal';
import useModalStore from '../../store/modal';

import AddCategoryForm from '../form/AddCategoryForm';




const AddCategoryModal: React.FC = () => {
    const { isOpen } = useModalStore();


    return (
      <>
          { isOpen && 
            <AppModal>
                <AddCategoryForm />
            </AppModal>
          }
      </>
    );
};




export default AddCategoryModal;


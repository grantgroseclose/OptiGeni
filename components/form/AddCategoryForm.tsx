import React from 'react';

import { Category, validationSchema } from '../../types/data/Category';
import createAppForm from '../form/AppForm';
import createFormSubmitButton from '../form/FormSubmitButton';
import FormInputField from '../form/FormInputField';
import useAddCategory from '../../hooks/mutations/useAddCategory';
import { Alert } from 'react-native';
import useModalStore from '../../store/modal';




const AddCategoryForm: React.FC = () => {
    const { toggleModal } = useModalStore();

    const AddCategoryForm = createAppForm<Category>();
    const AddCategoryButton = createFormSubmitButton<Category>();

    const addCategory = useAddCategory(() => {Alert.alert('Success', 'Category has been added!')});
    const addCategoryOnSubmit = (data: Category) => { 
        addCategory.mutate(data); 
        toggleModal();
    }


    return (
        <AddCategoryForm
            initialValues={{
                title: '',
                color: ''
            }}
            validationSchema={validationSchema}
            style={{}}
            onSubmit={addCategoryOnSubmit}
        >
            <FormInputField
                name='title'
                icon='pencil'
            />
            <FormInputField
                name='color'
                icon='format-color-fill'
            />
            <AddCategoryButton title='Add category' />
        </AddCategoryForm>
    );
};




export default AddCategoryForm;


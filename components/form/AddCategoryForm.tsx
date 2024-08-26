import React from 'react';

import { Category, categorySchema } from '../../types/data/Category';
import createAppForm from '../form/AppForm';
import createFormSubmitButton from '../form/FormSubmitButton';
import FormInputField from '../form/FormInputField';
import useAddCategory from '../../hooks/mutations/useAddCategory';
import { Alert, StyleSheet, View } from 'react-native';
import useModalStore from '../../store/modal';
import { toFormikValidationSchema } from 'zod-formik-adapter';




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
            validationSchema={toFormikValidationSchema(categorySchema)}
            style={styles.formContainer}
            onSubmit={addCategoryOnSubmit}
        >
            <View>
                <FormInputField
                    name='title'
                    icon='pencil'
                />
                <FormInputField
                    name='color'
                    icon='format-color-fill'
                />
            </View>
            
            <AddCategoryButton title='Add category' />
        </AddCategoryForm>
    );
};




const styles = StyleSheet.create({
    formContainer: {
        height: '100%',
        padding: '2.5%',
        justifyContent: 'space-between'
    }
});




export default AddCategoryForm;


import React from 'react';
import { StyleSheet, View } from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Toast from 'react-native-toast-message';

import { Category, categorySchema } from '../../types/data/Category';
import createAppForm from '../form/AppForm';
import createFormSubmitButton from '../form/FormSubmitButton';
import FormInputField from '../form/FormInputField';
import useAddCategory from '../../hooks/mutations/useAddCategory';
import { appModals, CategoryModal } from '../../store/modal';
import useModal from '../../hooks/useModal';
import generateUniqueId from '../../utility/generateUniqueId';
import CategoryColorPicker from './dropdown/CategoryColorPicker';




const AddCategoryForm: React.FC = () => {
    const { toggleModal } = useModal<CategoryModal>(appModals['Category']);

    const AddCategoryAppForm = createAppForm<Category>();
    const AddCategoryButton = createFormSubmitButton<Category>();

    const toastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Category added!`
        });
    }

    const addCategory = useAddCategory(toastSuccess);
    const addCategoryOnSubmit = (data: Category) => { 
        const uId = generateUniqueId();
        const newCat = { ...data, uId };

        addCategory.mutate(newCat); 
        toggleModal();
    }


    return (
        <AddCategoryAppForm
            initialValues={{
                uId: '',
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
                <CategoryColorPicker name='color'/>
            </View>
            
            <AddCategoryButton title='Add category' />
        </AddCategoryAppForm>
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


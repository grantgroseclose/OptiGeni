import React from "react";
import AddCategoryModal from "../../modal/AddCategoryModal";

import FormDropdown from "./FormDropdown";
import useCategories from "../../../hooks/useCategories";




const AddCategoryDropdownPicker: React.FC = () => {
    const { data, error, isLoading } = useCategories();
    const category_picker_data = data ?
        data?.map(cat => ({ label: cat.title, value: cat.title })).concat([{ label: 'Add new category...', value: 'add-new' }])
    : [];


    return (
      <>
          <AddCategoryModal />

          <FormDropdown name='categoryTitle' data={category_picker_data} />
      </>
    );
};




export default AddCategoryDropdownPicker;


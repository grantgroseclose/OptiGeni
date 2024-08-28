import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import useCategories from "../../../hooks/useCategories";
import AddCategoryModal from "../../modal/AddCategoryModal";




const CategoryPicker: React.FC = () => {
	const { data, error, isLoading } = useCategories();
	const category_picker_data = data ? data?.map(cat => ({ label: cat.title, value: cat.title })).concat([{ label: 'Add new category...', value: 'add-new' }]) : [];


	return (
		<>
			<AddCategoryModal />

			<CategoryDropdown name='categoryTitle' data={category_picker_data} />
		</>
	);
};




export default CategoryPicker;


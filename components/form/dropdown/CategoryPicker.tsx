import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import useCategories from "../../../hooks/useCategories";
import AddCategoryModal from "../../modal/AddCategoryModal";
import { material_colors } from "../../../config/colors";
import { CategoryDropdownData } from "./CategoryDropdown";




const CategoryPicker: React.FC = () => {
	const { data, error, isLoading } = useCategories();
	const addCategoryItem: CategoryDropdownData = { label: 'Add new category...', value: 'add-new', color: material_colors.grey.grey};

	const category_picker_data = data ? data?.map(cat => ({ label: cat.title, value: cat.title, color: cat.color })).concat([addCategoryItem]) : [];


	return (
		<>
			<AddCategoryModal />

			<CategoryDropdown name='categoryTitle' data={category_picker_data} />
		</>
	);
};




export default CategoryPicker;


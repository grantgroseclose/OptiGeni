import { CACHE_KEY_CATEGORIES } from "../../constants";
import { Category, categorySchema } from "../../types/data/Category"; 
import { useCategoryService } from "../../services/CategoryService"; 
import useAddMutation from "./useAddMutation";



const useAddCategory = (onAdd: () => void) => {
	const CategoryService = useCategoryService(categorySchema);

	return useAddMutation<Category>(CategoryService.post, CACHE_KEY_CATEGORIES, onAdd);
}


export default useAddCategory;

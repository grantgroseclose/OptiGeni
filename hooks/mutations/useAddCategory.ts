import { CACHE_KEY_CATEGORIES } from "../../constants";
import { Category, categorySchema } from "../../types/data/Category"; 
import { useCategoryService } from "../../services/CategoryService"; 
import useAddMutation from "./useAddMutation";
import { useErrorStore } from "../../store/error";




const useAddCategory = (onAdd: () => void) => {
	const CategoryService = useCategoryService();
	const setError = useErrorStore(state => state.setError);
    const clearError = useErrorStore(state => state.clearError);

	const mutationFn = async (item: Category) => {
		clearError();
		const res = await CategoryService.post(item);

		if ('error' in res) {
			const err = res.error as string;
			setError(err);
			return Promise.reject(err);
		}

		return res as Category;
	}

	return useAddMutation<Category>(mutationFn, CACHE_KEY_CATEGORIES, onAdd);
}


export default useAddCategory;

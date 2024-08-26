import { CACHE_KEY_CATEGORIES } from "../../constants";
import { Category } from "../../types/data/Category"; 
import { useCategoryService } from "../../services/CategoryService"; 

import useAddMutation from "./useAddMutation";
import generateUniqueId from "../../utility/generateUniqueId";


const useAddCategory = (onAdd: () => void) => {
  const CategoryService = useCategoryService();

  const mutationFn = (item: Category) => {
    const uId = generateUniqueId();
    const catWithUId = { ...item, uId };

    return CategoryService.post(catWithUId);
  }

  return useAddMutation<Category>(mutationFn, CACHE_KEY_CATEGORIES, onAdd);
}

export default useAddCategory;

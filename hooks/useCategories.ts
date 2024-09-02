import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_CATEGORIES } from '../constants';
import { Category, categorySchema } from '../types/data/Category';
import { useCategoryService } from '../services/CategoryService';



const useCategories = () => {
    const CategoryService = useCategoryService(categorySchema);

    return useQuery<Category[], Error>({
        queryKey: CACHE_KEY_CATEGORIES,
        queryFn: CategoryService.getAll,
        staleTime: 10 * 1000
    });
};




export default useCategories;

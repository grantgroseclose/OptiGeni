import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_CATEGORIES } from '../constants';
import { Category, useCategoryService } from '../services/CategoryService';



const useCategories = () => {
    const CategoryService = useCategoryService();

    return useQuery<Category[], Error>({
        queryKey: CACHE_KEY_CATEGORIES,
        queryFn: CategoryService.getAll,
        staleTime: 10 * 1000
    });
};




export default useCategories;

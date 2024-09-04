import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_CATEGORIES } from '../constants';
import { Category, categorySchema } from '../types/data/Category';
import { useCategoryService } from '../services/CategoryService';
import { useErrorStore } from '../store/error';




const useCategories = () => {
    const CategoryService = useCategoryService();
    const setError = useErrorStore(state => state.setError);
    const clearError = useErrorStore(state => state.clearError);

    return useQuery<Category[], Error>({
        queryKey: CACHE_KEY_CATEGORIES,
        queryFn: async () => {
            clearError();
            const res = await CategoryService.getAll();

            if ('error' in res) {
                const err = res.error as string;
                setError(err);
                return Promise.reject(err);
            }

            return res as Category[];
        },
        staleTime: 10 * 1000
    });
};




export default useCategories;

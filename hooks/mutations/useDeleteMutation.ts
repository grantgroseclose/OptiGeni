import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";




interface AddContext<T> { 
    previousData: T[]
}



const useDeleteMutation = <T extends { uId?: string }>(
    mutationFn: (item: T) => Promise<T>,
    cacheKey: QueryKey,
    onDelete: () => void
): UseMutationResult<T, Error, T, AddContext<T>> => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, T, AddContext<T>>({
        mutationFn,

        onMutate: async (itemToDelete: T): Promise<AddContext<T>> => {
            await queryClient.cancelQueries({queryKey: cacheKey});

            const previousData = queryClient.getQueryData<T[]>(cacheKey) || [];

            queryClient.setQueryData<T[]>(cacheKey, (data = []) => data.filter(data => data.uId !== itemToDelete.uId));

            onDelete();

            return { previousData };
        },

        onSuccess: (deletedItem) => {
            queryClient.setQueryData<T[]>(cacheKey, (data) => data?.filter(item => item.uId !== deletedItem.uId));
            
            queryClient.invalidateQueries({ queryKey: cacheKey });
        },

        onError: (error, deletedItem, context) => {
            if (!context) return;

            queryClient.setQueryData<T[]>(cacheKey, context.previousData);
        }
    });
};




  

export default useDeleteMutation;


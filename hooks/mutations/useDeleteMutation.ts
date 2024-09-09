import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";

/**
 * Interface defining the context for deleting an item.
 * @template T - The type of item being deleted.
 */
interface DeleteContext<T> { 
    previousData: T[]
}

/**
 * Custom hook for performing an delete operation with optimistic updates.
 * This hook abstracts the common logic needed to delete an item from the server and
 * update the client state optimistically.
 * 
 * @template T - The type of the item with an optional `uId` identifier.
 * @param {Function} mutationFn - A function that performs the mutation operation.
 * @param {QueryKey} cacheKey - The cache key used to store the items in the query cache.
 * @param {Function} onDelete - A callback function to execute additional side effects upon deleting an item.
 * @returns {UseMutationResult<T, Error, T, DeleteContext<T>>} A mutation result object that provides methods to track and control the mutation status.
 */
const useDeleteMutation = <T extends { uId?: string }>(
    mutationFn: (item: T) => Promise<T>,
    cacheKey: QueryKey,
    onDelete: () => void
): UseMutationResult<T, Error, T, DeleteContext<T>> => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, T, DeleteContext<T>>({
        mutationFn,

        onMutate: async (itemToDelete: T): Promise<DeleteContext<T>> => {
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


import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";

/**
 * Interface defining the context for updating an item.
 * @template T - The type of item being updated.
 */
interface UpdateContext<T> { 
    previousData: T[]
}

/**
 * Custom hook for performing an update operation with optimistic updates.
 * This hook abstracts the common logic needed to update an item on the server and
 * update the client state optimistically.
 * 
 * @template T - The type of the item with an optional `uId` identifier.
 * @param {Function} mutationFn - A function that performs the mutation operation.
 * @param {QueryKey} cacheKey - The cache key used to store the items in the query cache.
 * @param {Function} onUpdate - A callback function to execute additional side effects upon updating an item.
 * @returns {UseMutationResult<T, Error, T, UpdateContext<T>>} A mutation result object that provides methods to track and control the mutation status.
 */
const useUpdateMutation = <T extends { uId?: string }>(
	mutationFn: (item: T) => Promise<T>,
	cacheKey: QueryKey,
	onUpdate: () => void
): UseMutationResult<T, Error, T, UpdateContext<T>> => {
	const queryClient = useQueryClient();

	return useMutation<T, Error, T, UpdateContext<T>>({
		mutationFn,

		onMutate: async (newItem: T): Promise<UpdateContext<T>> => {
			await queryClient.cancelQueries({queryKey: cacheKey});

			const previousData = queryClient.getQueryData<T[]>(cacheKey) || [];
            
            const index = previousData.findIndex((item: T) => item.uId === newItem.uId);

            if (index !== -1) {
                const updatedData = [...previousData];
                updatedData[index] = { ...previousData[index], ...newItem };
                queryClient.setQueryData<T[]>(cacheKey, updatedData);
            }

			onUpdate();

			return { previousData };
		},

		onSuccess: (updatedItem) => {
            queryClient.setQueryData<T[]>(cacheKey, (data = []) =>
                data.map((item) => (item.uId === updatedItem.uId ? updatedItem : item))
            );

			queryClient.invalidateQueries({ queryKey: cacheKey });
		},

		onError: (error, newItem, context) => {
			if (!context) return;

			queryClient.setQueryData<T[]>(cacheKey, context.previousData);
		}
	});
};




export default useUpdateMutation;


import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";

/**
 * Interface defining the context for adding an item.
 * @template T - The type of item being added.
 */
interface AddContext<T> { 
    previousData: T[]
}

/**
 * Custom hook for performing an add operation with optimistic updates.
 * This hook abstracts the common logic needed to add an item to a server and
 * update the client state optimistically.
 * 
 * @template T - The type of the item with an optional `uId` identifier.
 * @param {Function} mutationFn - A function that performs the mutation operation.
 * @param {QueryKey} cacheKey - The cache key used to store the items in the query cache.
 * @param {Function} onAdd - A callback function to execute additional side effects upon adding an item.
 * @returns {UseMutationResult<T, Error, T, AddContext<T>>} A mutation result object that provides methods to track and control the mutation status.
 */
const useAddMutation = <T extends { uId?: string }>(
	mutationFn: (item: T) => Promise<T>,
	cacheKey: QueryKey,
	onAdd: () => void
): UseMutationResult<T, Error, T, AddContext<T>> => {
	const queryClient = useQueryClient();

	return useMutation<T, Error, T, AddContext<T>>({
		mutationFn,

		onMutate: async (newItem: T): Promise<AddContext<T>> => {
			await queryClient.cancelQueries({queryKey: cacheKey});

			const previousData = queryClient.getQueryData<T[]>(cacheKey) || [];

			queryClient.setQueryData<T[]>(cacheKey, (data = []) => [
				newItem,
				...data,
			]);

			onAdd();

			return { previousData };
		},

		onSuccess: (savedItem, newItem) => {
			queryClient.setQueryData<T[]>(cacheKey, (data) => 
				data?.map((item) => item.uId === newItem.uId ? savedItem : item
			));

			queryClient.invalidateQueries({ queryKey: cacheKey });
		},

		onError: (error, newItem, context) => {
			if (!context) return;

			queryClient.setQueryData<T[]>(cacheKey, context.previousData);
		}
	});
};




export default useAddMutation;


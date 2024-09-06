import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";




interface AddContext<T> { 
	previousData: T[]
}



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


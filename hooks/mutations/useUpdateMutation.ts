import { useMutation, useQueryClient, UseMutationResult, QueryKey } from "@tanstack/react-query";

import { Task } from "../../types/data/Task";

type UpdatedTask = Pick<Task, 'uId' | 'status'>;




interface AddContext<T> { 
	previousData: T[]
}



const useUpdateMutation = <T extends { uId?: string }>(
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
            
            const index = previousData.findIndex((item: T) => item.uId === newItem.uId);

            if (index !== -1) {
                const updatedData = [...previousData];
                updatedData[index] = { ...previousData[index], ...newItem };
                queryClient.setQueryData<T[]>(cacheKey, updatedData);
            }

			onAdd();

			return { previousData };
		},

		onSuccess: (updatedItem) => {
            queryClient.setQueryData<T[]>(cacheKey, (data = []) =>
                data.map((item) => (item.uId === updatedItem.uId ? updatedItem : item))
            );
		},

		onError: (error, newItem, context) => {
			if (!context) return;

			queryClient.setQueryData<T[]>(cacheKey, context.previousData);
		}
	});
};




export default useUpdateMutation;


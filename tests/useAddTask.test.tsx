import * as React from 'react'
import { renderHook, waitFor } from '@testing-library/react-native'
import { createWrapper } from './utils'
import { Task } from '../types/data/Task'
import { server } from './mocks/setupServer'
import { newTask, taskHandlers } from './mocks/handlers'
import useAddTask from '../hooks/mutations/useAddTask'
import Toast from 'react-native-toast-message'
import { CACHE_KEY_TASKS } from '../constants'






describe('useAddTask query hook', () => {
    test('returns the added task as type Task, invalidates query data, updates the cache, and displays toast message upon success', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...taskHandlers);

        const displayToastSuccess = jest.fn(() => Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Task added!`
        }));

        const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

        const { result } = renderHook(() => useAddTask(displayToastSuccess), {
            wrapper: wrapper
        })

        await result.current.mutateAsync(newTask);
        
        // Verify data mutation success and response
        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data).toStrictEqual<Task>(newTask);
        });

        // Verify query invalidation
        await waitFor(() => {
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({ "queryKey": CACHE_KEY_TASKS });
        });

        // Verify cache update
        const cacheData = queryClient.getQueryData<Task[]>(CACHE_KEY_TASKS);
        expect(cacheData).toContainEqual(newTask);

        // Verify that the toast success message was displayed
        expect(displayToastSuccess).toHaveBeenCalled();
    });
});
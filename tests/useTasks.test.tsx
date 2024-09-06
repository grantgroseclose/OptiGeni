import * as React from 'react'
import { renderHook, waitFor } from '@testing-library/react-native'
import { createWrapper } from './utils'
import useTasks from '../hooks/useTasks'
import { Task } from '../types/data/Task'
import { tasks } from './mocks/tasks'
import { useErrorStore } from '../store/error'
import { server } from './mocks/setupServer'
import { taskErrorHandlers, taskHandlers } from './mocks/handlers'






describe('useTasks query hook', () => {
    test('returns an array of type Task upon request success', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...taskHandlers);

        const { result } = renderHook(() => useTasks(), {
            wrapper: wrapper
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toStrictEqual<Task[]>(tasks);
    });

    test('sets the global error state upon request failure', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...taskErrorHandlers);

        const { result } = renderHook(() => useTasks(), {
            wrapper: wrapper
        });

        // Check if query error is persisted internally
        await waitFor(() => expect(result.current.isError).toBe(true));

        // Check global state (for UI toast feedback)
        const error = useErrorStore.getState().error;
        expect(error).toBe('An unexpected error has occured fetching tasks.');
    });
});
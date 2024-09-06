import * as React from 'react'
import { renderHook, waitFor } from '@testing-library/react-native'
import { createWrapper } from './utils'
import { useErrorStore } from '../store/error'
import { server } from './mocks/setupServer'
import { categoryHandlers, categoryErrorHandlers } from './mocks/handlers'
import useCategories from '../hooks/useCategories'
import { Category } from '../types/data/Category'
import { categories } from './mocks/categories'






describe('useCategories query hook', () => {
    test('returns an array of type Category upon request success', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...categoryHandlers);

        const { result } = renderHook(() => useCategories(), {
            wrapper: wrapper
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toStrictEqual<Category[]>(categories);
    });

    test('sets the global error state upon request failure', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...categoryErrorHandlers);
        
        const { result } = renderHook(() => useCategories(), {
            wrapper: wrapper
        });

        // Check if query error is persisted internally
        await waitFor(() => expect(result.current.isError).toBe(true));

        // Check global state (for UI toast feedback)
        const error = useErrorStore.getState().error;
        expect(error).toBe('An unexpected error has occured fetching categories.');
    });
});
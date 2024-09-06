import * as React from 'react'
import { renderHook, waitFor } from '@testing-library/react-native'
import { createWrapper } from './utils'
import { server } from './mocks/setupServer'
import { newCategory, categoryHandlers } from './mocks/handlers'
import useAddCategory from '../hooks/mutations/useAddCategory'
import Toast from 'react-native-toast-message'
import { CACHE_KEY_CATEGORIES } from '../constants'
import { Category } from '../types/data/Category'






describe('useAddCategory query hook', () => {
    test('returns the added category as type Category, invalidates query data, updates the cache, and displays toast message upon success', async () => {
        const { wrapper, queryClient } = createWrapper();
        server.use(...categoryHandlers);

        const displayToastSuccess = jest.fn(() => Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Category added!`
        }));

        const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

        const { result } = renderHook(() => useAddCategory(displayToastSuccess), {
            wrapper: wrapper
        })

        await result.current.mutateAsync(newCategory);
        
        // Verify data mutation success and response
        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data).toStrictEqual<Category>(newCategory);
        });

        // Verify query invalidation
        await waitFor(() => {
            expect(invalidateQueriesSpy).toHaveBeenCalledWith({ "queryKey": CACHE_KEY_CATEGORIES });
        });

        // Verify cache update
        const cacheData = queryClient.getQueryData<Category[]>(CACHE_KEY_CATEGORIES);
        expect(cacheData).toContainEqual(newCategory);

        // Verify that the toast success message was displayed
        expect(displayToastSuccess).toHaveBeenCalled();
    });
});
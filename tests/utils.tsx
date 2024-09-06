import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        },
    }
});

export const createWrapper = () => {
    const testQueryClient = createTestQueryClient()
    const wrapper = ({ children }: {children: React.ReactNode}) => (<QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider> as React.ReactNode);

    return { 
        wrapper: wrapper,
        queryClient: testQueryClient
    }
}
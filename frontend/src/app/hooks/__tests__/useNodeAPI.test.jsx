import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { YelpProvider, useNodeAPI } from '../useNodeAPI.jsx';

// Mock Global Fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useNodeAPI Hook & Context', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        // Mock environment variable
        import.meta.env.VITE_API_URL = 'http://localhost:3001/api/yelp';
    });

    // Wrapper untuk menyediakan Context
    const wrapper = ({ children }) => <YelpProvider>{children}</YelpProvider>;

    it('should load businesses successfully', async () => {
        const mockBusinesses = [
            { id: '1', name: 'Burger King', rating: 4 },
            { id: '2', name: 'McDonalds', rating: 3.5 },
        ];

        // Mock response dari fetch
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ businesses: mockBusinesses }),
        });

        const { result } = renderHook(() => useNodeAPI(), { wrapper });

        // Panggil loadBusinesses
        await act(async () => {
            await result.current.loadBusinesses(true, 'burger', '', '');
        });

        // Assertions
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.objectContaining({
                search: expect.stringContaining('term=burger'),
            })
        );

        expect(result.current.businesses).toEqual(mockBusinesses);
    });

    it('should handle fetch error gracefully', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useNodeAPI(), { wrapper });

        // Spy console.error agar tidak bikin berantakan di terminal test
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        await act(async () => {
            await result.current.loadBusinesses(true);
        });

        expect(result.current.businesses).toEqual([]); // State tidak berubah atau error handling dijalankan
        consoleSpy.mockRestore();
    });
});

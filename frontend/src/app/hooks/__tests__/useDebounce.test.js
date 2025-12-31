import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce.js';

describe('useDebounce Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers(); // Mock timer agar tes berjalan instan
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });

    it('should not update value before delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        // Update value props
        rerender({ value: 'updated', delay: 500 });

        // Sebelum 500ms, value harusnya masih 'initial'
        expect(result.current).toBe('initial');
    });

    it('should update value after delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        rerender({ value: 'updated', delay: 500 });

        // Fast-forward time 500ms
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');
    });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BusinessList from '../BusinessList.jsx';

// 1. Mock Hooks
vi.mock('../../hooks/useNodeAPI.jsx', () => ({
    useNodeAPI: vi.fn(),
}));

vi.mock('../../hooks/useDebounce.js', () => ({
    useDebounce: (value) => value, // Return value langsung (no delay) untuk test
}));

import { useNodeAPI } from '../../hooks/useNodeAPI.jsx';

describe('BusinessList Component', () => {
    const mockLoadBusinesses = vi.fn();
    const mockSetSearchTerm = vi.fn();
    const mockSetCategories = vi.fn();
    const mockSetPrice = vi.fn();

    // Helper function render dengan default mock
    const renderComponent = (customState = {}) => {
        const defaultState = {
            businesses: [],
            loadBusinesses: mockLoadBusinesses,
            setSearchTerm: mockSetSearchTerm,
            setCategories: mockSetCategories,
            setPrice: mockSetPrice,
            searchTerm: '',
            categories: '',
            price: '',
            ...customState,
        };

        useNodeAPI.mockReturnValue(defaultState);

        render(
            <BrowserRouter>
                <BusinessList />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        renderComponent({ businesses: [] });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders list of businesses', () => {
        const mockBusinesses = [
            {
                id: '1',
                name: 'Warung Padang',
                rating: 4.5,
                price: '$$',
                location: { display_address: ['Jakarta', 'Indonesia'] },
                categories: [{ title: 'Indonesian' }],
                transactions: [],
                image_url: 'http://img.com/1.jpg'
            },
        ];

        renderComponent({ businesses: mockBusinesses });

        expect(screen.getByText('Warung Padang')).toBeInTheDocument();
        expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
        expect(screen.getByText('Jakarta, Indonesia')).toBeInTheDocument();
    });

    it('calls search function on button click', () => {
        renderComponent();

        const termInput = screen.getByPlaceholderText('Search e.g. beef, eat, etc....');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        fireEvent.change(termInput, { target: { value: 'sushi' } });
        fireEvent.click(searchButton);

        // Verifikasi setter state dipanggil
        expect(mockSetSearchTerm).toHaveBeenCalledWith('sushi');
        // Verifikasi API dipanggil
        expect(mockLoadBusinesses).toHaveBeenCalledWith(true, 'sushi', '', '');
    });
});

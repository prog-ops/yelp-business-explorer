import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BusinessDetail from '../BusinessDetail.jsx';
import * as ReactRouter from 'react-router-dom';

// Mock useNodeAPI
vi.mock('../../../hooks/useNodeAPI.jsx', () => ({
    useNodeAPI: vi.fn(),
}));

import { useNodeAPI } from '../../../hooks/useNodeAPI.jsx';

// Mock useParams
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

describe('BusinessDetail Component', () => {
    const mockLoadBusinessDetail = vi.fn();
    const mockId = 'abc123';

    beforeEach(() => {
        vi.clearAllMocks();
        // Setup return mock useParams
        ReactRouter.useParams.mockReturnValue({ id: mockId });
    });

    it('renders loading state if data not ready', () => {
        useNodeAPI.mockReturnValue({
            businessDetail: null,
            loadBusinessDetail: mockLoadBusinessDetail,
        });

        render(
            <BrowserRouter>
                <BusinessDetail />
            </BrowserRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders business details correctly', async () => {
        const mockDetail = {
            id: mockId,
            name: 'Sate Kelinci',
            rating: 5,
            review_count: 100,
            price: '$$$',
            display_phone: '0812345678',
            is_closed: false,
            photos: ['http://img.com/sate.jpg', 'http://img.com/sate2.jpg'],
            location: { display_address: ['Bandung', 'Jawa Barat'] },
            categories: [{ title: 'Grill' }],
            transactions: ['pickup'],
            coordinates: { latitude: -6.9, longitude: 107.6 },
            url: 'http://sate.com'
        };

        useNodeAPI.mockReturnValue({
            businessDetail: mockDetail,
            loadBusinessDetail: mockLoadBusinessDetail,
        });

        render(
            <BrowserRouter>
                <BusinessDetail />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Sate Kelinci')).toBeInTheDocument();
            expect(screen.getByText('⭐ 5')).toBeInTheDocument();
            expect(screen.getByText('Review Count: 100')).toBeInTheDocument();
            expect(screen.getByText('$$$')).toBeInTheDocument();
            expect(screen.getByText('0812345678')).toBeInTheDocument();
            expect(screen.getByText('OPEN NOW')).toBeInTheDocument(); // is_closed = false
            expect(screen.getByText('Grill')).toBeInTheDocument();
            expect(screen.getByText('PICKUP')).toBeInTheDocument();
        });

        // Cek Link
        const mapsLink = screen.getByText('See on Google Maps').closest('a');
        expect(mapsLink.href).toContain('api=1&query=-6.9,107.6');
    });
});

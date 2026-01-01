import React, { useState, useEffect } from 'react';
import { getOptimizedImage } from "../utils/imageOptimizer.js";

const BusinessItem = ({ business, isExpanded, onExpand, onCollapse, detailData }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e?.stopPropagation();
        if (detailData?.photos) {
            setCurrentImageIndex((currentImageIndex + 1) % detailData.photos.length);
        }
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        if (detailData?.photos) {
            setCurrentImageIndex((currentImageIndex - 1 + detailData.photos.length) % detailData.photos.length);
        }
    };

    // Auto-slide carousel effect when expanded and photos exist
    useEffect(() => {
        let interval;
        if (isExpanded && detailData?.photos?.length > 0) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailData.photos.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isExpanded, detailData]);

    // Check if we actually have the detail content specifically for this item
    const hasDetailContent = isExpanded && detailData && detailData.id === business.id;

    return (
        <li
            className={`relative bg-blue-950 rounded-3xl shadow-lg shadow-blue-950 mb-8 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'p-8' : 'hover:bg-blue-900'}`}
            style={{
                height: isExpanded ? 'auto' : '300px',
                minHeight: isExpanded ? '600px' : '300px'
            }}
        >
            {isExpanded ? (
                <div className="flex flex-col w-full h-full relative">
                    {/* Close Button */}
                    <button
                        onClick={onCollapse}
                        className="absolute top-0 right-0 z-10 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-red-700 transition-colors"
                        title="Close Detail"
                    >
                        X
                    </button>

                    {hasDetailContent ? (
                        <div className="flex flex-row h-full">
                            {/* Expanded Content Layout */}
                            <div className="w-1/2 flex flex-col justify-center items-center p-4">
                                {detailData.photos && detailData.photos.length > 0 ? (
                                    <div className="relative w-full h-96">
                                        <img
                                            src={detailData.photos[currentImageIndex]}
                                            alt={detailData.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
                                            <button onClick={prevImage} className="bg-blue-800 text-white px-2 py-1 rounded">Prev</button>
                                            <button onClick={nextImage} className="bg-blue-800 text-white px-2 py-1 rounded">Next</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded-lg">
                                        <p>No photos available</p>
                                    </div>
                                )}
                            </div>

                            <div className="w-1/2 flex flex-col justify-center items-center p-4">
                                <div className="flex flex-col space-y-2 text-left w-full">
                                    <h1 className="font-bold mb-4 text-3xl">{detailData.name}</h1>

                                    {/* Categories */}
                                    {detailData.categories.length > 0 &&
                                        <div className="flex flex-wrap">
                                            {detailData.categories.map((item, idx) => (
                                                <div key={`cat-detail-${idx}`} className="bg-blue-800 text-amber-300 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                                                    {item.title}
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    {/* Transactions */}
                                    {detailData.transactions.length > 0 &&
                                        <div className="flex flex-wrap">
                                            {detailData.transactions.map((item, idx) => (
                                                <div key={`trans-detail-${idx}`} className="bg-blue-800 text-white text-sm px-2 py-1 rounded-full mr-2 mb-2">
                                                    {item === 'restaurant_reservation' ? 'RESTAURANT RESERVATION' : item.toUpperCase()}
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    <p className="text-green-500 text-xl">{detailData.location.display_address.join(', ')}</p>
                                    <p className="text-lg">⭐ {detailData.rating} ({detailData.review_count} reviews)</p>
                                    <p className="text-lg">{detailData.price}</p>
                                    <p>{detailData.display_phone}</p>
                                    <p className={detailData.is_closed ? "text-red-400" : "text-green-400"}>
                                        {detailData.is_closed ? "Closed" : "OPEN NOW"}
                                    </p>

                                    <div className="flex space-x-4 mt-4">
                                        <a href={detailData.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                            View Logic
                                        </a>
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${detailData.coordinates.latitude},${detailData.coordinates.longitude}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                            Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full min-h-[400px]">
                            <div className="text-2xl font-bold animate-pulse">Loading Details...</div>
                        </div>
                    )}
                </div>
            ) : (
                // Standard List View (Collapsed)
                <div className="flex h-full">
                    <div className="w-1/5 relative">
                        <div className="aspect-ratio-box rounded-lg overflow-hidden h-full">
                            <img
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src={getOptimizedImage(business.image_url, 300)}
                                alt={business.name}
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="flex-grow px-4 py-4 flex flex-col justify-between relative ml-2">
                        <div className="flex justify-between items-start">
                            <h1>{business.name} ⭐ {business.rating}</h1>
                        </div>
                        <div className="flex flex-col space-y-4 mb-2">
                            <p className="flex text-gray-300">{business.location.display_address.join(', ')}</p>
                            <p className="flex">{business.price}</p>
                        </div>
                        {business.categories.length > 0 &&
                            <div className="flex flex-wrap">
                                {business.categories.map((item, index) => (
                                    <div key={`${item.alias}-${index}`} className="bg-blue-800 text-amber-300 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        }
                        {business.transactions.length > 0 &&
                            <div className="flex flex-wrap">
                                {business.transactions.map((item, index) => (
                                    <div key={`transaction-${index}`} className="bg-blue-800 text-white text-sm px-2 py-1 rounded-full mr-2 mb-2">
                                        {item === 'restaurant_reservation' ? 'RESTAURANT RESERVATION' : item.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        }

                        {/* Expand Button (Arrow) */}
                        <button
                            onClick={onExpand}
                            className="absolute bottom-4 right-4 w-12 h-8 flex items-center justify-center bg-green-700 rounded-full text-white cursor-pointer hover:bg-green-600 transition-colors"
                        >
                            {'>'}
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default BusinessItem;

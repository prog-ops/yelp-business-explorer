import React, {memo, useEffect, useState} from 'react';
import {useNodeAPI} from "../hooks/useNodeAPI.jsx";
import {useDebounce} from "../hooks/useDebounce.js";
import BusinessItem from "./BusinessItem.jsx";

const inputs = 'rounded-md p-2 me-4'

const BusinessList = memo(() => {
    const { businesses, loadBusinesses, loadBusinessDetail, businessDetail, setSearchTerm, searchTerm, setCategories, categories, setPrice, price } = useNodeAPI();
    const [term, setTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const debouncedTerm = useDebounce(term, 500);

    const handleBusinessClick = async (id) => {
        if (expandedId === id) {
            setExpandedId(null); // Collapse if clicked again
        } else {
            setExpandedId(id);
            await loadBusinessDetail(id);
        }
    };

    const handleCloseExpanded = (e) => {
        e && e.stopPropagation();
        setExpandedId(null);
    };

    useEffect(() => {
        loadBusinesses(true, searchTerm, categories, price);
    }, [searchTerm, categories, price]);

    useEffect(() => {
        if (debouncedTerm || category || priceFilter) {
            setSearchTerm(debouncedTerm );
            setCategories(category);
            setPrice(priceFilter);
            loadBusinesses(true, term, category, priceFilter);
        }
    }, [debouncedTerm, category, priceFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(term);
        setCategories(category);
        setPrice(priceFilter);
        loadBusinesses(true, term, category, priceFilter);
    };

    return (
        <div>
            <h1 className='mb-8'>Businesses List</h1>
            <form
                className='mb-8 p-2'
                onSubmit={handleSearch}>
                <input
                    className={inputs}
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search e.g. beef, eat, etc...."
                />
                <select
                    className={inputs}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="chinese">Chinese</option>
                    <option value="seafood">Seafood</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="japanese">Japanese</option>
                    <option value="american">American</option>
                    <option value="indian">Indian</option>
                    <option value="thai">Thai</option>
                    <option value="french">French</option>
                </select>
                <select
                    className={inputs}
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}>
                    <option value="">Select Price</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                </select>
                <button type="submit">Search</button>
            </form>
            {businesses.length > 0 ? (
                <div>
                    <ul>
                        {businesses.map((business, index) => (
                            <BusinessItem
                                key={`${business.id}-${index}`}
                                business={business}
                                isExpanded={expandedId === business.id}
                                onExpand={() => handleBusinessClick(business.id)}
                                onCollapse={handleCloseExpanded}
                                detailData={businessDetail}
                            />
                        ))}
                    </ul>
                    <button onClick={() => loadBusinesses(false, searchTerm, categories, price)}>Load More</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
});

export default BusinessList;

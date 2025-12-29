import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import {YelpProvider} from "./app/hooks/useNodeAPI.jsx";

// Lazy load components
const LazyBusinessApp = lazy(() => import("./app/main/BusinessApp.jsx"));
const LazyBusinessDetail = lazy(() => import("./app/main/main_detail/BusinessDetail.jsx"));

function App() {
    return (
        <YelpProvider>
            <BrowserRouter>
                <Suspense fallback={<div className="skeleton-loading">Loading App...</div>}>
                    <Routes>
                        <Route path="/" element={<LazyBusinessApp />} />
                        <Route path="/business/:id" element={<LazyBusinessDetail />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </YelpProvider>
    )
}

export default App

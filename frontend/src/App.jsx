import './App.css'
import BusinessApp from "./app/main/BusinessApp.jsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import BusinessDetail from "./app/main/main_detail/BusinessDetail.jsx";
import {YelpProvider} from "./app/hooks/useNodeAPI.jsx";

// Lazy load components
const BusinessApp = lazy(() => import("./app/main/BusinessApp.jsx"));
const BusinessDetail = lazy(() => import("./app/main/main_detail/BusinessDetail.jsx"));

function App() {
    return (
        <YelpProvider>
            <BrowserRouter>
                <Suspense fallback={<div className="skeleton-loading">Loading App...</div>}>
                    <Routes>
                        <Route path="/" element={<BusinessApp />} />
                        <Route path="/business/:id" element={<BusinessDetail />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </YelpProvider>
    )
}

export default App

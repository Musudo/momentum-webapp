"use client";

import {ErrorBoundary} from "react-error-boundary";
import {Outlet} from "react-router-dom";
import {Navbar} from "./components/navbar/Navbar";

const AppLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                {/*<ErrorBoundary fallback={<div>Error...</div>}>*/}
                <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
                    <div>Error... {error.message}</div>
                )}>
                    <Outlet/>
                </ErrorBoundary>
            </main>
        </>
    );
};

export default AppLayout;

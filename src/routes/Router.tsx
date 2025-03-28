import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AppLayout from "../AppLayout.tsx";
import {lazy, Suspense} from "react";
import ProtectedRoute from "./protectedRoute.tsx";

const SignIn = lazy(() => import("../components/authentication/signIn/SignIn.tsx"));
const SignUP = lazy(() => import("../components/authentication/signUp/SignUp"));
const Profile = lazy(() => import("../components/Profile"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const ActivityRoutes = lazy(() => import("./ActivityRoutes"));
const ContactRoutes = lazy(() => import("./ContactRoutes"));
const NotFound = lazy(() => import("../components/NotFound"));

const Router = () => {

    return (
        <BrowserRouter>
            {/* Wrap with Suspense to show a fallback while lazy components load */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<SignIn/>}/>
                        <Route path="/signIn" element={<SignIn/>}/>
                        <Route path="/signUp" element={<SignUP/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        {/* Wrap protected routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/activities/*"
                            element={
                                <ProtectedRoute>
                                    <ActivityRoutes/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/contacts/*"
                            element={
                                <ProtectedRoute>
                                    <ContactRoutes/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router;
import {Route, Routes} from "react-router-dom"
import {lazy} from "react";

const ContactsOverview = lazy(() => import("../components/contacts/overview/ContactsOverview.tsx"));
const ContactCreate = lazy(() => import("../components/contacts/form/ContactCreate"));
const NotFound = lazy(() => import("../components/NotFound"));

const ContactRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route index element={<ContactsOverview/>}/>
                <Route path="create" element={<ContactCreate/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default ContactRoutes;
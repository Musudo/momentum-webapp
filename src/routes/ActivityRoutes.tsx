import {Route, Routes} from "react-router-dom"
import {lazy} from "react";

const ActivitiesOverview = lazy(() => import("../components/activities/overview/ActivitiesOverview"));
const ActivityDetails = lazy(() => import("../components/activities/details/ActivityDetails"));
const ActivityCreate = lazy(() => import("../components/activities/form/ActivityCreate"));
const ActivityEdit = lazy(() => import("../components/activities/form/ActivityEdit"));
const NotFound = lazy(() => import("../components/NotFound"));

const ActivityRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route index element={<ActivitiesOverview/>}/>
                <Route path=":id" element={<ActivityDetails/>}/>
                <Route path="create" element={<ActivityCreate/>}/>
                <Route path="edit/:id" element={<ActivityEdit/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default ActivityRoutes;
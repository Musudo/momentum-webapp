import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import AppOutlet from "../AppOutlet";
import ActivityRoutes from "./ActivityRoutes";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
// import ContactRoutes from "./ContactRoutes";
// import {Dashboard} from "../components/dashboard/Dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppOutlet />}>
          {/* <Route path="/" element={<Dashboard/>}/> */}
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/activities/*" element={<ActivityRoutes />} />
          {/* <Route path="/contacts/*" element={<ContactRoutes/>}/> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

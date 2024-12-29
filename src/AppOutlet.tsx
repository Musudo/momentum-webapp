import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Box } from "@mui/material";

export default function AppOutlet() {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     backgroundColor: "#FAFAFB",
    //     minHeight: "100vh",
    //   }}
    // >
    <>
    <Navbar />
    <Outlet />
    </>
      
    // </Box>
  );
}

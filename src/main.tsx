import {Suspense} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import QueryWrapper from "./queryWrapper";
import {store} from "./redux/store";
import Router from "./routes/Router.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';

// configuration for production mode
// if (import.meta.env.MODE == "production") {
// }

const locale = "en-gb";

dayjs.locale(locale);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <QueryWrapper>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router/>
                </Suspense>
            </QueryWrapper>
        </LocalizationProvider>
    </Provider>
    // </StrictMode>
);

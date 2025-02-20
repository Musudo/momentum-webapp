import {Suspense} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import QueryWrapper from "./queryWrapper";
import {store} from "./redux/store";
import Router from "./routes/Router.tsx";

// configuration for production mode
// if (import.meta.env.MODE == "production") {
// }

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <Provider store={store}>
        <QueryWrapper>
            <Suspense fallback={<></>}>
                <Router/>
            </Suspense>
        </QueryWrapper>
    </Provider>
    // </StrictMode>
);

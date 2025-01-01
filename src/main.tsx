import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import QueryWrapper from "./queryWrapper";
import { store } from "./redux/store";

// configuration for production mode
// if (import.meta.env.MODE == "production") {
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryWrapper>
        <App />
      </QueryWrapper>
    </Provider>
  </StrictMode>
);

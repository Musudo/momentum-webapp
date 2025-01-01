import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import AppRoutes from "./routes/appRoutes";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    Cookies.set("lang", i18n.language, { expires: 7 });
  }, [i18n.language]);

  return (
    <>
      <AppRoutes/>
    </>
  );
}

// ReactDom.render(<App />, document.getElementById('root'));

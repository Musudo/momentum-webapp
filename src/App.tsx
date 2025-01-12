import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "./AppLayout";
import "./i18n";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    Cookies.set("lang", i18n.language, { expires: 7 });
  }, [i18n.language]);

  return <AppLayout />;
};

export default App;
// ReactDom.render(<App />, document.getElementById('root'));

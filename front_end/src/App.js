import { BrowserRouter as Router } from "react-router-dom";
import "./style/dark.scss";
import RoutesApp from "./config/Routes";
import Toast from "./components/toast/Toast";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const { fade, title, type } = useSelector((state) => state.toast);

  const [_fade, setFade] = useState();
  const [_title, setTitle] = useState();
  const [_type, setType] = useState();

  useEffect(() => {
    setFade(fade);
    setTitle(title);
    setType(type);
  }, [type, title, fade]);

  return (
    <>
      {_fade && <Toast title={_title} type={_type} />}
      <Router>
        <RoutesApp />
      </Router>
    </>
  );
}

export default App;

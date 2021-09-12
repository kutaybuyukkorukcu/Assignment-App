import "styles/global.scss";
import { Provider } from "react-redux";
import "./i18n";

import Home from "pages";
import { BrowserRouter, Switch, useHistory } from "react-router-dom";

function App(): JSX.Element {
  
  let history = useHistory();

  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;

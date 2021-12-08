import { BrowserRouter as Router,Switch } from "react-router-dom";
import Auth from "./utils/Auth"
function App() {
  return (
    <Router>
      <Switch>
        <Auth></Auth>
      </Switch>
    </Router>
  );
}

export default App;

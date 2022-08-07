import Home from "./Pages/Home/Home";
import Loading from "./Components/Loading/Loading";

import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Loading />
      <Home />
    </div>
  );
}

export default App;

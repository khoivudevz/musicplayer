import Home from "./Pages/Home/Home";
import "antd/dist/antd.css";
import Loading from "./Components/Loading/Loading";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <Loading />
      <Home />
    </div>
  );
}

export default App;

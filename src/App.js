import "./App.css";
import "./styles/style.scss";
import "./styles/styleAdmin.scss";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



import Dashboard from "./components/Dashboard";
//dotenv-webpack
//

function App() {

  return (
    <div>
      {/* <Admin /> */}
      <Dashboard />
    </div>
  );
}

export default App;

import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="max-w-screen-xl w-full mx-auto">
      <Outlet />
    </div>
  );
}

export default App;

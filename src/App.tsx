import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import "./styles/app.scss";
import "./styles/vendor.scss";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

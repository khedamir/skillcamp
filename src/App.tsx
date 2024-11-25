import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import "./styles/app.scss";
import "./styles/vendor.scss";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_API_URL)

function App() {
  return <RouterProvider router={router} />;
}

export default App;

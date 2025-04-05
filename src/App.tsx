import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import "./styles/app.scss";
import "./styles/vendor.scss";
import axios from "axios";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const baseUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = baseUrl;

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

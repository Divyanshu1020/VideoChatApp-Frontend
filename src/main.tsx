import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes/Routes.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <Routes />
    </Provider>
);

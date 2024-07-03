// import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/*
 * For now the address autocomplete does not work with React.StrictMode
 * See https://github.com/geoapify/react-geocoder-autocomplete/issues/10#issuecomment-1862536885
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
createRoot(document.getElementById("root")!).render(<App />);

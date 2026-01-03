import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PointProvider } from "./context/PointContext.tsx";

createRoot(document.getElementById("root")!).render(
  <PointProvider>
    <App />
  </PointProvider>
);

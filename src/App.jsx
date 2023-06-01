import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Routes/router-config";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map((ruta) => (
            <Route
              path={ruta.path}
              element={<ruta.component />}
              key={ruta.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Routes/router-config";
import "./App.css"; // Importar el archivo CSS
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="container">
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

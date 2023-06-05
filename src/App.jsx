import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Routes/router-config";
import "./App.css"; // Importar el archivo CSS
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {" "}
        {/* Mueve el componente BrowserRouter aquí */}
        <header className="header">
          <h1>RentApp</h1>
        </header>
        <Navbar /> {/* Agrega el componente Navbar aquí */}
        <main className="content">
          <Routes>
            {routes.map((ruta) => (
              <Route
                path={ruta.path}
                element={<ruta.component />}
                key={ruta.path}
              />
            ))}
          </Routes>
        </main>
        <footer className="footer">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Routes/router-config";
import "./App.css"; // Importar el archivo CSS
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>RentApp</h1>
      </header>
      <div>
        
      </div>
      <main className="content">
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
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

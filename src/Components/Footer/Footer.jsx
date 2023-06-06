import React from "react";
import "./Footer.css";


function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>
              &copy; {new Date().getFullYear()} Luxury Cars. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6">
            <ul className="footer-links">
                <li>
                  <a href="/terminos">Términos de Uso</a>
                </li>
                <li>
                  <a href="/privacidad">Política de Privacidad</a>
                </li>
                <li>
                  <a href="/contacto">Contáctanos</a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

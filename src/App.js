import logo from './logo.svg';
import './App.css';
import Login_usuario from './componentes/Login_usuario'
import Registro_usuario from './componentes/Registro_usuario'
import Rentar_auto from './componentes/Rentar_auto'
//import Devolucion_auto from './componentes/Devolucion_auto'
import Recuperar_contraseña from './componentes/Recuperar_contraseña'

function App() {
  return (
    <div>
      
      <header className="App-header">
        <div>
          <Recuperar_contraseña/>
          
        </div>
      </header>
    </div>
    
  );

}

export default App;

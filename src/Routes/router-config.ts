import LoginUsuario from "../Screens/Login/LoginUsuario";
import RegistroUsuario from "../Screens/RegistroUsuario/RegistroUsuario";
import RentarAuto from "../Screens/RentarAuto/RentarAuto";
import DevolucionAuto from "../Screens/DevolucionAuto/DevolucionAuto";
import Home from "../Screens/Home/Home";

const routes = [
  { path: "*", component: LoginUsuario, exact: true },
  { path: "/Home", component: Home, exact: true },
  { path: "/", component: LoginUsuario, exact: true },
  { path: "/RegistrarUsuario", component: RegistroUsuario, exact: true },
  { path: "/RentarAuto", component: RentarAuto, exact: true },
  { path: "/DevolucionAuto", component: DevolucionAuto, exact: true },
];

export { routes };

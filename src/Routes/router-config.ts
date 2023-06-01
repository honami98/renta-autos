import LoginUsuario from "../Components/LoginUsuario";
import RegistroUsuario from "../Components/RegistroUsuario";
import RentarAuto from "../Components/RentarAuto";
import DevolucionAuto from "../Components/DevolucionAuto";

const routes = [
  { path: "*", component: LoginUsuario, exact: true },
  { path: "/Inicio", component: LoginUsuario, exact: true },
  { path: "/", component: LoginUsuario, exact: true },
  { path: "/RegistrarUsuario", component: RegistroUsuario, exact: true },
  { path: "/RentarAuto", component: RentarAuto, exact: true },
  { path: "/DevolucionAuto", component: DevolucionAuto, exact: true },
];

export { routes };

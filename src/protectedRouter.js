import { Navigate, Outlet } from "react-router-dom";

function protectedRouter(props) {
  return props.isAuth ? <Outlet /> : <Navigate to="/Login" />;
}

export default protectedRouter;

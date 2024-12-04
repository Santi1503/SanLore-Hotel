import { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setAuth, setCounters } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setAuth({});
    setCounters({});

    navigate("/login", { replace: true });
  }, []);

  return <h1>Cerrando sesión...</h1>;
};

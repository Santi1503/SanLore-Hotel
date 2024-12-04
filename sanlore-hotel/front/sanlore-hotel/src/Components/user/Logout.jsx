import { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setAuth({});

    navigate("/login", { replace: true });
    window.location.reload();
  }, []);

  return <h1>Cerrando sesión...</h1>;
};

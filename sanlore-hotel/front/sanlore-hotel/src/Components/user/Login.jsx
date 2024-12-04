import { useState } from "react";
import { Global } from "../../Helpers/Global";
import { useForm } from "../../Hooks/useForm";
import useAuth from "../../Hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;
    const token = localStorage.getItem("token");

    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      setAuth(data.user);
      setTimeout(() => {
        window.location.href = "/booking/dashboard";
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <div className="content_post">
        <div className="card login-card">
          {/* Card pequeña con el título */}
          <div className="card-small-title">
            <h3 className="content__title">Login</h3>
          </div>

          {/* Card del formulario */}
          <form className="form-login" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu email"
                onChange={changed}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={changed}
              />
            </div>

            <input
              type="submit"
              value="Iniciar sesión"
              className="btn btn-success"
            />

            {saved === "login" && (
              <div className="alert alert-success">
                Inicio de sesión exitoso
              </div>
            )}

            {saved === "error" && (
              <div className="alert alert-danger">
                Ha ocurrido un error al iniciar sesión
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

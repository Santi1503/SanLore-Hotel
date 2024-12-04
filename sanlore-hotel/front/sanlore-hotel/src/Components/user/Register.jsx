import { useState } from "react";
import { Global } from "../../Helpers/Global";
import { useForm } from "../../Hooks/useForm";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;

    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <div className="content_post">
        <div className="card register-card">
          <div className="card-small-title">
            <h3 className="content__title">Registro</h3>
          </div>
          <form className="form-register" onSubmit={saveUser}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" onChange={changed} />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Apellido</label>
              <input type="text" name="surname" onChange={changed} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" onChange={changed} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} />
            </div>

            <input
              type="submit"
              value="Registrate"
              className="btn btn-success"
            />
            {saved == "saved" && (
              <div className="alert alert-success">
                Usuario registrado exitosamente
              </div>
            )}

            {saved == "error" && (
              <div className="alert alert-danger">
                Ha ocurrido un error registrando el usuario
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

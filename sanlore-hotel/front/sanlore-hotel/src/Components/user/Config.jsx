import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Global } from "../../Helpers/Global";
import { SerializeForm } from "../../Helpers/SerializeForm";

export const Config = () => {
  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");

  const updateUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    let newDataUser = SerializeForm(e.target);

    const uploadRequest = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const uploadData = await uploadRequest.json();

    if (uploadData.status == "success") {
      setAuth(uploadData.user);
      setSaved("saved");
      setTimeout(() => {
        window.location.href = "/booking";
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <div className="content_post">
        <div className="card config-card">
          <div className="card-small-title">
            <h3 className="content__title">Ajustes</h3>
          </div>

          <form className="config-form" onSubmit={updateUser}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" defaultValue={auth.name} />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Apellido</label>
              <input type="text" name="surname" defaultValue={auth.surname} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" defaultValue={auth.email} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Cambiar contraseña</label>
              <input type="password" name="password" />
            </div>
            <input
              type="submit"
              value="Actualizar"
              className="btn btn-success"
            />
            {saved == "saved" && (
              <div className="alert alert-success">
                Usuario actualizado exitosamente
              </div>
            )}

            {saved == "error" && (
              <div className="alert alert-danger">
                Ha ocurrido un error actualizando el usuario
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

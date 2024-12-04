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
    } else {
      setSaved("error");
    }

    const fileInput = document.querySelector("#file");

    if (uploadData.status == "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const uploadDataImage = await uploadRequest.json();

      if (uploadDataImage.status == "success" && uploadData.user) {
        setAuth(uploadData.user);
        setSaved("saved");
      } else {
        setSaved("error");
      }
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario actualizado exitosamente
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            Ha ocurrido un error actualizando el usuario
          </strong>
        ) : (
          ""
        )}

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
          <input type="submit" value="Actualizar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};

import useAuth from "../../../Hooks/useAuth";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />

      <section className="layout_content">
        {!auth ? <Outlet /> : <Navigate to="/booking" />}
      </section>
    </>
  );
};

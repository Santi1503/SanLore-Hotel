import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PublicLayout } from "../Components/layout/public/PublicLayout";
import { Login } from "../Components/user/Login";
import { Register } from "../Components/user/Register";
import { PrivateLayout } from "../Components/layout/private/PrivateLayout";
import { AuthProvider } from "../Context/AuthProvider";
import { Dashboard } from "../Components/reservation/Dashboard";
import { Logout } from "../Components/user/Logout";
import { Config } from "../Components/user/Config";
import { ActiveReservations } from "../Components/reservation/ActiveReservations";
import { ReservationHistory } from "../Components/reservation/ReservationHistory";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/booking" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="active" element={<ActiveReservations />} />
            <Route path="history" element={<ReservationHistory />} />
            <Route path="logout" element={<Logout />} />
            <Route path="config" element={<Config />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <p>
                  <h1>Error 404: Página no encontrada</h1>
                  <link to="/">Volver al inicio</link>
                </p>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

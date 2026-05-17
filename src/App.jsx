import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreCars from "./pages/ExploreCars";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import MyBookings from "./pages/MyBookings";
import MyAddedCars from "./pages/MyAddedCars";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="explore" element={<ExploreCars />} />
        <Route path="cars/:id" element={<CarDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="add-car"
          element={
            <PrivateRoute>
              <AddCar />
            </PrivateRoute>
          }
        />
        <Route
          path="my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="my-added-cars"
          element={
            <PrivateRoute>
              <MyAddedCars />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

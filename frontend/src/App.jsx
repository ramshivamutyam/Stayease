import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Recover from "./pages/auth/Recover";
import EditProfileForm from "./pages/EditProfileForm";
import HotelList from "./pages/hotels/HotelList";
import HotelDetail from "./pages/hotels/HotelDetail";
import SideBar from "./components/SideBar";
import NotificationForm from "./pages/admin/NotificationForm"
import AddManager from "./pages/admin/AddManager";
import { useContext } from "react";
import { Auth } from "./Contexts/AuthContext";
import BookingList from "./pages/bookings/BookingList";
import AddHotel from "./pages/admin/AddHotel";
function App() {
  const {token} = useContext(Auth)
  return (
    <div className="flex">
      {token && <SideBar/>}
      <div className="flex-grow">
        <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/editProfile" element={<EditProfileForm />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        <Route path="/addmanager" element={<AddManager />} />
        <Route path="/addHotel" element={<AddHotel/>}/>
        <Route path="/bookings" element={<BookingList/>}/>
        <Route path="/hotellist" element={<HotelList />} />
        <Route path="/hoteldetail/:hotelId" element={<HotelDetail />} />
        <Route path="/addNotification" element={<NotificationForm/>}/>
      </Routes>
      </div>
      
      {/* </Router> */}
    </div>
  );
}

export default App;

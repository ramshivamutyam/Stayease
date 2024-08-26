import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HotelForm = () => {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // convert image file to base64
  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // receive file from form
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
  };
  const { token, role } = useContext(Auth);
  const nav = useNavigate();
  useEffect(() => {
    if (role != "admin") nav("/");
  }, []);
  const [hotelData, setHotelData] = useState({
    name: "",
    description: "",
    location: "",
    amenities: [],
    rooms: [],
    image: "",
  });

  const handleChange = (e) => {
    setHotelData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAmenityChange = (e, index) => {
    const updatedAmenities = [...hotelData.amenities];
    updatedAmenities[index] = e.target.value;
    setHotelData({ ...hotelData, amenities: updatedAmenities });
  };

  const handleRoomChange = (e, roomIndex, field) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex] = {
      ...updatedRooms[roomIndex],
      [field]: e.target.value,
    };
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const handleRoomNumberChange = (e, roomIndex, numberIndex, field) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex].roomNumbers[numberIndex] = {
      ...updatedRooms[roomIndex].roomNumbers[numberIndex],
      [field]: e.target.value,
    };
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const addAmenity = () => {
    setHotelData({ ...hotelData, amenities: [...hotelData.amenities, ""] });
  };

  const addRoom = () => {
    setHotelData({
      ...hotelData,
      rooms: [
        ...hotelData.rooms,
        {
          roomType: "",
          roomNumbers: [{ number: "", isAvailable: true }],
          price: "",
        },
      ],
    });
  };

  const addRoomNumber = (roomIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex].roomNumbers.push({ number: "", isAvailable: true });
    setHotelData({ ...hotelData, rooms: updatedRooms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      if (
        !hotelData.name ||
        !hotelData.description ||
        !hotelData.amenities ||
        !hotelData.location ||
        !hotelData.rooms
      )
        throw new Error("All fields required");
      const response = await fetch("http://localhost:3000/admin/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(hotelData),
      });
      let json = await response.json();
      if (response.ok) {
        const data = json;
        console.log("Hotel added successfully:", data);
      } else {
        // console.log(json.message)
        throw new Error("Error adding hotel");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 my-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={hotelData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location:
        </label>
        <input
          type="text"
          name="location"
          value={hotelData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amenities:
        </label>
        {hotelData.amenities.map((amenity, index) => (
          <input
            key={index}
            type="text"
            value={amenity}
            onChange={(e) => handleAmenityChange(e, index)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addAmenity}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        >
          Add Amenity
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rooms:
        </label>
        {hotelData.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="mb-4 p-4 border rounded-lg">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Room Type:
            </label>
            <input
              type="text"
              value={room.roomType}
              onChange={(e) => handleRoomChange(e, roomIndex, "roomType")}
              required
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price:
            </label>
            <input
              type="number"
              value={room.price}
              onChange={(e) => handleRoomChange(e, roomIndex, "price")}
              required
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Room Numbers:
            </label>
            {room.roomNumbers.map((roomNumber, numberIndex) => (
              <div key={numberIndex} className="mb-2 p-2 border rounded-lg">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number:
                </label>
                <input
                  type="number"
                  value={roomNumber.number}
                  onChange={(e) =>
                    handleRoomNumberChange(e, roomIndex, numberIndex, "number")
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Available:
                </label>
                <input
                  type="checkbox"
                  checked={roomNumber.isAvailable}
                  onChange={(e) =>
                    handleRoomNumberChange(
                      e,
                      roomIndex,
                      numberIndex,
                      "isAvailable"
                    )
                  }
                  className="mr-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addRoomNumber(roomIndex)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
            >
              Add Room Number
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRoom}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        >
          Add Room
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image:
        </label>
        <input
          name="image"
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Image"
          type="file"
          accept="image/*"
          id="image"
          onChange={handleImage}
        />
      </div>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-4 disabled:cursor-not-allowed"
        disabled={loading ? true : false}
      >
        {loading ? "Please wait ..." : "Submit"}
      </button>
    </form>
  )
};

export default HotelForm;

import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: "",
    likes: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/createEvent", formData)
      .then((response) => {
        console.log("Event posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="text-center">
        <h1 className="font-bold text-3xl text-gray-800 mb-5">Post an Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full"
      >
        <div className="flex flex-col gap-5">
          {/** Title Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Title:
            <input
              type="text"
              name="title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          {/** Optional Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Optional:
            <input
              type="text"
              name="optional"
              className="input-field"
              value={formData.optional}
              onChange={handleChange}
            />
          </label>

          {/** Description Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Description:
            <textarea
              name="description"
              className="input-field h-24 resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          {/** Organized By Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Organized By:
            <input
              type="text"
              name="organizedBy"
              className="input-field"
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </label>

          {/** Event Date Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Event Date:
            <input
              type="date"
              name="eventDate"
              className="input-field"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>

          {/** Event Time Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Event Time:
            <input
              type="time"
              name="eventTime"
              className="input-field"
              value={formData.eventTime}
              onChange={handleChange}
            />
          </label>

          {/** Location Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Location:
            <input
              type="text"
              name="location"
              className="input-field"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          {/** Ticket Price Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Ticket Price:
            <input
              type="number"
              name="ticketPrice"
              className="input-field"
              value={formData.ticketPrice}
              onChange={handleChange}
            />
          </label>

          {/** Image Upload Field */}
          <label className="flex flex-col font-medium text-gray-700">
            Image:
            <input
              type="file"
              name="image"
              className="file-input"
              onChange={handleImageUpload}
            />
          </label>

          {/** Submit Button */}
          <button className="submit-btn" type="submit">
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FaCopy, FaFacebook, FaWhatsappSquare } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  //! Fetching the event data from server by ID
  useEffect(() => {
    if (!id) return;

    axios
      .get(`/event/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, [id]);

  //! Copy & Share Functionalities
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const whatsappMessage = encodeURIComponent(window.location.href);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookShareUrl);
  };

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10"> 
      {/* Event Image */}
      {event.image && (
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {event.title.toUpperCase()}
          </h1>
          <Link to={`/event/${event._id}/ordersummary`}>
            <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-primarydark transition">
              Book Ticket
            </button>
          </Link>
        </div>

        <p className="text-xl font-semibold text-primary">
          {event.ticketPrice === 0 ? "Free" : `Rs. ${event.ticketPrice}`}
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>

        <h2 className="text-lg font-bold text-primarydark">
          Organized By: {event.organizedBy}
        </h2>
      </div>

      {/* Event Timing & Location */}
      <div className="mt-8 bg-gray-100 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-800">When and Where</h2>

        <div className="mt-6 flex flex-col md:flex-row md:justify-between gap-8">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <AiFillCalendar className="text-primarydark text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Date and Time</h3>
              <p className="text-gray-600 text-base">
                Date: {event.eventDate.split("T")[0]} <br /> Time: {event.eventTime}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <MdLocationPin className="text-primarydark text-3xl" />
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-600 text-base">{event.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-extrabold text-gray-800">Share with friends</h2>
        <div className="mt-6 flex gap-6 text-3xl text-gray-600">
          <button
            onClick={handleCopyLink}
            className="hover:text-primarydark transition"
          >
            <FaCopy />
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="hover:text-green-500 transition"
          >
            <FaWhatsappSquare />
          </button>

          <button
            onClick={handleFacebookShare}
            className="hover:text-blue-500 transition"
          >
            <FaFacebook />
          </button>
        </div>
      </div>
    </div>
  );
}

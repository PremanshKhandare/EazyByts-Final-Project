import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function TicketPage() {
  const { user } = useContext(UserContext);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, []);

  const fetchTickets = async () => {
    axios
      .get(`/tickets/user/${user._id}`)
      .then((response) => {
        setUserTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
      });
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/tickets/${ticketId}`);
      fetchTickets();
      alert("Ticket Deleted");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-6 py-8">
      {/* Back Button */}
      <div className="mb-8 flex items-center">
        <Link to="/">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            <IoMdArrowBack className="w-5 h-5" />
            Back
          </button>
        </Link>
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {userTickets.map((ticket) => (
          <div key={ticket._id} className="bg-white shadow-lg rounded-lg p-5 relative hover:shadow-xl transition">
            {/* Delete Button */}
            <button
              onClick={() => deleteTicket(ticket._id)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition"
            >
              <RiDeleteBinLine className="h-6 w-6" />
            </button>

            {/* Ticket Content */}
            <div className="flex flex-col items-center">
              <img src={ticket.ticketDetails.qr} alt="QR Code" className="w-32 h-32 object-cover rounded-md mb-4" />

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{ticket.ticketDetails.eventname.toUpperCase()}</h3>
                <p className="text-sm text-gray-600">
                  📅 {ticket.ticketDetails.eventdate.split("T")[0]}, 🕒 {ticket.ticketDetails.eventtime}
                </p>
                <p className="text-sm text-gray-600">👤 {ticket.ticketDetails.name.toUpperCase()}</p>
                <p className="text-sm text-gray-600">💰 Rs. {ticket.ticketDetails.ticketprice}</p>
                <p className="text-sm text-gray-600">📧 {ticket.ticketDetails.email}</p>
                <p className="text-sm text-gray-600">🎟 Ticket ID: {ticket.ticketDetails._id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

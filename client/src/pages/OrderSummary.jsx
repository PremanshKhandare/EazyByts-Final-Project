import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';

export default function OrderSummary() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    useEffect(() => {
        if (!id) return;

        axios.get(`/event/${id}/ordersummary`)
            .then(response => setEvent(response.data))
            .catch(error => console.error("Error fetching event:", error));
    }, [id]);

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    if (!event) return '';

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Back Button */}
            <Link to={'/event/' + event._id} className="inline-flex items-center text-blue-700 font-semibold bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
                <IoMdArrowBack className="w-5 h-5 mr-2" />
                Back
            </Link>

            {/* Layout Container */}
            <div className="mt-8 flex flex-col lg:flex-row gap-8">
                {/* Terms & Conditions */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg lg:w-2/3">
                    <h2 className="text-lg font-bold text-gray-800">Terms & Conditions</h2>
                    <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                        <li>Refunds are available for cancellations made up to 14 days before the event. No refunds afterward.</li>
                        <li>Tickets will be sent via email as e-tickets. Show it on your mobile or print it for entry.</li>
                        <li>Each person can purchase a maximum of 2 tickets for this event.</li>
                        <li>If the event is canceled, refunds will be processed automatically. Postponed event tickets remain valid.</li>
                        <li>Your privacy is protected. By using our app, you agree to our privacy policy.</li>
                        <li>Please review and accept the terms & conditions before proceeding with payment.</li>
                    </ul>
                </div>

                {/* Booking Summary */}
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg lg:w-1/3">
                    <h2 className="text-lg font-bold text-gray-900">Booking Summary</h2>
                    <div className="mt-4 flex justify-between text-gray-800">
                        <span>{event.title}</span>
                        <span className="font-semibold">Rs. {event.ticketPrice}</span>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    <div className="flex justify-between font-bold text-gray-900">
                        <span>SUB TOTAL</span>
                        <span>Rs. {event.ticketPrice}</span>
                    </div>

                    <div className="mt-4 flex items-start">
                        <input
                            type="checkbox"
                            className="mt-1"
                            onChange={handleCheckboxChange}
                        />
                        <p className="ml-2 text-sm text-gray-700">
                            I have verified the event name, date, and time before proceeding to payment. I accept the terms and conditions.
                        </p>
                    </div>

                    <div className="mt-6">
                        <Link to={`/event/${event._id}/ordersummary/paymentsummary`}>
                            <button
                                className={`w-full py-3 font-semibold text-white rounded-lg transition ${
                                    isCheckboxChecked ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'
                                }`}
                                disabled={!isCheckboxChecked}
                            >
                                Proceed
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

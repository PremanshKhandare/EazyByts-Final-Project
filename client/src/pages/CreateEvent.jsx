import { useState } from "react";

export default function CreateEvent() {
  // Define state to manage the table data for the first table
  const [tableData1, setTableData1] = useState([
    { description: "", price: "", reference: "" },
  ]);

  // Define state to manage the table data for the second table
  const [tableData2, setTableData2] = useState([
    { description: "", price: "", reference: "" },
  ]);

  // Function to add a new row to the first table
  const addRow1 = () => {
    setTableData1([...tableData1, { description: "", price: "", reference: "" }]);
  };

  // Function to add a new row to the second table
  const addRow2 = () => {
    setTableData2([...tableData2, { description: "", price: "", reference: "" }]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <hr className="mb-4" />
      <div className="flex justify-between">
        <div></div>
        <ul className="flex space-x-3">
          <li>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Approve</button>
          </li>
          <li>
            <button className="px-4 py-2 bg-gray-300 text-black rounded">Back</button>
          </li>
        </ul>
      </div>

      <form className="mt-6 space-y-6">
        <div>
          <h1 className="text-lg font-semibold">Basic Information</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="event_title"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Event Title
            </label>
          </div>

          <div className="relative">
            <input
              type="date"
              name="event_date"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Date
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="proposed_by"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Proposed by
            </label>
          </div>

          <div className="relative">
            <input
              type="time"
              name="event_time"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Time
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="event_type"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Event Type
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="place"
              className="peer block w-full border-b-2 border-gray-300 py-2 focus:border-blue-600 focus:outline-none"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-2 text-gray-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-blue-600">
              Place
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Event Description</label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Event Goal</label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    room_number: '',
    capacity: '',
    branch_id: '',
    room_type_id: '',
    price: '',
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchFormOptions();
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get('/room-data');
    setRooms(res.data);
  };

  const fetchFormOptions = async () => {
    const res = await axios.get('/room-form-data');
    setBranches(res.data.branches);
    setRoomTypes(res.data.roomTypes);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/room-store', form);
    setForm({ room_number: '', capacity: '', branch_id: '', room_type_id: '', price: '' });
    setShowModal(false);
    fetchRooms();
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold text-gray-800">Rooms</h2>}
    >
      <Head title="Rooms" />

      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Room
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">Add Room</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="room_number"
                  placeholder="Room Number"
                  value={form.room_number}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <select
                  name="branch_id"
                  value={form.branch_id}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <select
                  name="room_type_id"
                  value={form.room_type_id}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Room
                </button>
              </form>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">Room List</h1>
        <table className="w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Room Number</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Branch</th>
              <th className="border p-2">Room Type</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border p-2">{room.room_number}</td>
                <td className="border p-2">{room.capacity}</td>
                <td className="border p-2">{room.branch?.name || 'N/A'}</td>
                <td className="border p-2">{room.room_type?.name || 'N/A'}</td>
                <td className="border p-2">₱{parseFloat(room.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}

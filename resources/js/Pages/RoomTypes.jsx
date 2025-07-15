import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function RoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    const res = await axios.get('/room-type-data');
    setRoomTypes(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/room-type-store', form);
    setForm({ name: '', description: '' });
    setShowModal(false);
    fetchRoomTypes();
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold text-gray-800">Room Types</h2>}
    >
      <Head title="Room Types" />

      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Room Type
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
              <h2 className="text-lg font-semibold mb-4">Add Room Type</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Room Type Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Room Type
                </button>
              </form>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">Room Type List</h1>
        <table className="w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((type) => (
              <tr key={type.id}>
                <td className="border p-2">{type.name}</td>
                <td className="border p-2">{type.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}

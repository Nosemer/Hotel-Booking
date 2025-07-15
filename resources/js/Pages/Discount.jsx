import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Discount() {
  const [discounts, setDiscounts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    discount_code: '',
    type: '',
    value: '',
    applicable_to: '',
    room_type: '',
    room_id: '',
    valid_from: '',
    valid_to: ''
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDiscounts();
    fetchRooms();
  }, []);

  const fetchDiscounts = async () => {
    const res = await axios.get('/discount-data');
    setDiscounts(res.data);
  };

  const fetchRooms = async () => {
    const res = await axios.get('/discount-room-options');
    setRooms(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/discount-store', form);
    setForm({
      discount_code: '', type: '', value: '', applicable_to: '',
      room_type: '', room_id: '', valid_from: '', valid_to: ''
    });
    setShowModal(false);
    fetchDiscounts();
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Discounts</h2>}>
      <Head title="Discounts" />

      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Discount
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
              <h2 className="text-lg font-semibold mb-4">Add Discount</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="discount_code"
                  placeholder="Discount Code"
                  value={form.discount_code}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded" required>
                  <option value="">Select Type</option>
                  <option value="percentage">Percentage</option>
                  <option value="fixed_amount">Fixed Amount</option>
                </select>
                <input
                  type="number"
                  name="value"
                  placeholder="Value"
                  value={form.value}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <select name="applicable_to" value={form.applicable_to} onChange={handleChange} className="w-full border p-2 rounded" required>
                  <option value="">Applicable To</option>
                  <option value="room_type">Room Type</option>
                  <option value="room">Room</option>
                  <option value="booking">Booking</option>
                  <option value="branches">Branches</option>
                </select>
                {form.applicable_to === 'room_type' && (
                  <input
                    type="text"
                    name="room_type"
                    placeholder="Room Type"
                    value={form.room_type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                )}
                {form.applicable_to === 'room' && (
                  <select
                    name="room_id"
                    value={form.room_id}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Room</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>{r.room_number}</option>
                    ))}
                  </select>
                )}
                <input
                  type="date"
                  name="valid_from"
                  value={form.valid_from}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  name="valid_to"
                  value={form.valid_to}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Discount
                </button>
              </form>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">Discount List</h1>
        <table className="w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Applies To</th>
              <th className="border p-2">Valid From</th>
              <th className="border p-2">Valid To</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.id}>
                <td className="border p-2">{d.discount_code || 'N/A'}</td>
                <td className="border p-2">{d.type}</td>
                <td className="border p-2">{d.value}</td>
                <td className="border p-2">{d.applicable_to}</td>
                <td className="border p-2">{d.valid_from || '-'}</td>
                <td className="border p-2">{d.valid_to || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}

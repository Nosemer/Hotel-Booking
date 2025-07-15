import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await axios.get('/branch-data');
      setBranches(res.data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/branch-store', form);
      setForm({ name: '', address: '', city: '', state: '', zip_code: '' });
      setShowModal(false);
      fetchBranches(); // refresh
    } catch (err) {
      console.error('Error adding branch:', err);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Branches
        </h2>
      }
    >
      <Head title="Branches" />

      {/* ✅ Centered Container */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Branches List</h1>
          <button
            onClick={() => setShowModal(true)}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Add Branch
          </button>
        </div>

        {/* ✅ Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">Add New Branch</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Branch Name"
                  value={form.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
                <input
                  type="text"
                  name="zip_code"
                  placeholder="Zip Code"
                  value={form.zip_code}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Branch
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ✅ Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Address</th>
                <th className="border p-2 text-left">City</th>
                <th className="border p-2 text-left">State</th>
                <th className="border p-2 text-left">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <tr key={branch.id}>
                    <td className="border p-2">{branch.name}</td>
                    <td className="border p-2">{branch.address}</td>
                    <td className="border p-2">{branch.city}</td>
                    <td className="border p-2">{branch.state}</td>
                    <td className="border p-2">{branch.zip_code}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center border p-4 text-gray-500"
                  >
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

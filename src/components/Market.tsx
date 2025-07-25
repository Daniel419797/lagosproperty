import React, { useState } from 'react';
import PropertyListingForm from './propertyListingForm';

const Market = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Marketplace</h1>
          <p className="text-gray-600 mt-1">Verified properties with blockchain e-numbers</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200"
        >
          List Property
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2x1 "
            >
              &times;
            </button>
            <PropertyListingForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Types</option>
            <option>For Rent</option>
            <option>For Sale</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Locations</option>
            <option>Victoria Island</option>
            <option>Lekki</option>
            <option>Surulere</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>Price Range</option>
            <option>Under ₦1M</option>
            <option>₦1M - ₦5M</option>
            <option>Above ₦5M</option>
          </select>
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors duration-200">
            Search
          </button>
        </div>
      </div>

      
    </>
  )};       

export default Market;

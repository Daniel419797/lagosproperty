import React, { useState } from 'react';

const PropertyListingForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({
    propertyType: '',
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    videoUrl: '',
    amenities: [] as string[],
    photos: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files ?? []);
    console.log(filesArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Property:', form);
    onClose(); // Close modal after submit (for now)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
      <h2 className="text-2xl font-bold text-gray-900">List Your Property</h2>

      {/* Property Type */}
      <select name="propertyType" value={form.propertyType} onChange={handleChange} required className="w-full p-3 border rounded-xl">
        <option value="">Select Property Type</option>
        <option>House</option>
        <option>Apartment</option>
        <option>Condo</option>
        <option>Land</option>
        <option>Commercial</option>
      </select>

      {/* Title */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title (e.g., 3-Bedroom Luxury Villa)"
        required
        className="w-full p-3 border rounded-xl"
      />

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Property Description"
        rows={4}
        required
        className="w-full p-3 border rounded-xl"
      />

      {/* Address */}
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className="w-full p-3 border rounded-xl" />

      <div className="grid grid-cols-2 gap-4">
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className="p-3 border rounded-xl" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State/Province" required className="p-3 border rounded-xl" />
        <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP/Postal Code" required className="p-3 border rounded-xl" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" required className="p-3 border rounded-xl" />
      </div>

      {/* Price and Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price (₦)" required className="p-3 border rounded-xl" />
        <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" required className="p-3 border rounded-xl" />
        <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" required className="p-3 border rounded-xl" />
        <input type="number" name="squareFootage" value={form.squareFootage} onChange={handleChange} placeholder="Square Footage" className="p-3 border rounded-xl" />
      </div>

      {/* Video URL */}
      <input type="url" name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="Video Tour URL (optional)" className="w-full p-3 border rounded-xl" />

      {/* Amenities */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Swimming Pool', 'Garage', 'Garden', 'Security', 'Furnished', 'Gym'].map(amenity => (
            <label key={amenity} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={form.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="accent-green-600"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photos Upload */}
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-3 border rounded-xl" />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Publish</button>
      </div>
    </form>
  );
};

export default PropertyListingForm;

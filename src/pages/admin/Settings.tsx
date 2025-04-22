
import { useState } from 'react';

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Clothing Store',
    storeEmail: 'contact@clothingstore.com',
    currency: 'USD',
    tax: 7.5,
    enableReviews: true,
    enableWishlist: true,
    maintenanceMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setStoreSettings({
      ...storeSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to an API
    alert('Settings saved!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow-md rounded-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={storeSettings.storeName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <input
                type="email"
                name="storeEmail"
                value={storeSettings.storeEmail}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={storeSettings.currency}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="tax"
                value={storeSettings.tax}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableReviews"
                  name="enableReviews"
                  checked={storeSettings.enableReviews}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="enableReviews" className="ml-2 block text-sm text-gray-700">
                  Enable Product Reviews
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableWishlist"
                  name="enableWishlist"
                  checked={storeSettings.enableWishlist}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="enableWishlist" className="ml-2 block text-sm text-gray-700">
                  Enable Wishlist
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={storeSettings.maintenanceMode}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary px-6 py-2"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

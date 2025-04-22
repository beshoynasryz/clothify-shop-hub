
import { useState } from 'react';
import { Search, Edit, Lock, User } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', status: 'Active', joined: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Customer', status: 'Active', joined: '2025-02-03' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Admin', status: 'Active', joined: '2024-11-20' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Customer', status: 'Blocked', joined: '2025-03-12' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@example.com', role: 'Customer', status: 'Active', joined: '2025-04-05' },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="Search users..."
          className="pl-10 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joined}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-900">
                      <Lock size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

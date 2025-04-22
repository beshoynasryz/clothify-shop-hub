
import { useState, useEffect } from 'react';
import { BarChart, Package, Users, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    setStats({
      totalSales: 15420,
      totalOrders: 156,
      totalProducts: 48,
      totalUsers: 320
    });
  }, []);

  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: <BarChart className="h-8 w-8 text-brand" />,
      change: '+12% from last month'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="h-8 w-8 text-indigo-500" />,
      change: '+8% from last month'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Package className="h-8 w-8 text-green-500" />,
      change: '+3 new this month'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      change: '+24 from last month'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-green-500 text-xs mt-1">{stat.change}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'ORD001', customer: 'John Doe', total: '$129.99', status: 'Completed' },
                  { id: 'ORD002', customer: 'Jane Smith', total: '$89.95', status: 'Processing' },
                  { id: 'ORD003', customer: 'Bob Johnson', total: '$199.50', status: 'Completed' },
                  { id: 'ORD004', customer: 'Alice Brown', total: '$74.99', status: 'Shipped' }
                ].map((order, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Popular Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Classic Zip Hoodie', sales: 56, stock: 24 },
              { name: 'Premium Slim Jeans', sales: 42, stock: 18 },
              { name: 'Casual Leather Belt', sales: 38, stock: 32 },
              { name: 'Winter Beanie', sales: 29, stock: 15 }
            ].map((product, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <span className={`text-sm ${product.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>
                  {product.stock} in stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

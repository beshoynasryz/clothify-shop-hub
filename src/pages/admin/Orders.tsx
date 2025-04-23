
import { useState, useMemo } from "react";
import { Search, Eye } from "lucide-react";
import { Edit, Trash2, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useOrders, Order, OrderStatus } from "@/hooks/useOrders";
import { OrderModal } from "@/components/admin/OrderModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const statusColors: Record<OrderStatus, string> = {
  Completed: 'bg-green-100 text-green-800',
  Processing: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
};

const Orders = () => {
  const { toast } = useToast();
  const { orders, addOrder, updateOrder, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      (filterStatus === 'all' || order.status === filterStatus) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, filterStatus, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const processing = orders.filter((o) => o.status === "Processing").length;
    const shipped = orders.filter((o) => o.status === "Shipped").length;
    const completed = orders.filter((o) => o.status === "Completed").length;
    return { totalOrders, totalRevenue, processing, shipped, completed };
  }, [orders]);

  // Handlers
  function handleAdd(order: Omit<Order, "id">) {
    addOrder(order);
    toast({ title: "Order added", description: "A new order has been created." });
  }

  function handleEdit(order: Omit<Order, "id">) {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, order);
      toast({ title: "Order updated", description: "Order details updated." });
    }
  }

  function handleDelete(order: Order) {
    if (window.confirm("Delete order?")) {
      deleteOrder(order.id);
      toast({ title: "Order deleted", description: `Order ${order.id} removed.` });
      setSelectedOrder(null);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BarChart2 className="h-6 w-6" />
        Orders
      </h1>
      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-6">
        <div className="bg-card rounded-md p-4 flex flex-col items-center shadow-sm">
          <span className="text-lg font-bold">{stats.totalOrders}</span>
          <span className="text-xs text-muted-foreground">Total Orders</span>
        </div>
        <div className="bg-card rounded-md p-4 flex flex-col items-center shadow-sm">
          <span className="text-lg font-bold">${stats.totalRevenue.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">Total Revenue</span>
        </div>
        <div className="bg-card rounded-md p-4 flex flex-col items-center shadow-sm">
          <span className="text-lg font-bold">{stats.processing}</span>
          <span className="text-xs text-muted-foreground">Processing</span>
        </div>
        <div className="bg-card rounded-md p-4 flex flex-col items-center shadow-sm">
          <span className="text-lg font-bold">{stats.completed}</span>
          <span className="text-xs text-muted-foreground">Completed</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders or customers..."
            className="pl-10 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-shrink-0 w-full md:w-48">
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <Button onClick={() => { setModalMode("add"); setModalOpen(true); setSelectedOrder(null); }}>
            + Add Order
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order, i) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                <td className="px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-1"
                    onClick={() => { setModalOpen(true); setModalMode("edit"); setSelectedOrder(order); }}
                    aria-label="Edit order"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="p-1"
                    onClick={() => handleDelete(order)}
                    aria-label="Delete order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={modalMode === "add" ? handleAdd : handleEdit}
        initial={modalMode === "edit" ? selectedOrder : null}
        mode={modalMode}
      />
    </div>
  );
};

export default Orders;

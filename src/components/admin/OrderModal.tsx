
import { useState, useEffect } from "react";
import { DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, Dialog, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order, OrderStatus } from "@/hooks/useOrders";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, "id">) => void;
  initial?: Order | null;
  mode: "add" | "edit";
}

const statusOptions: OrderStatus[] = ["Processing", "Shipped", "Completed"];

export function OrderModal({ open, onClose, onSubmit, initial, mode }: OrderModalProps) {
  const [customer, setCustomer] = useState(initial?.customer || "");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().split("T")[0]);
  const [total, setTotal] = useState(initial?.total.toString() || "");
  const [status, setStatus] = useState<OrderStatus>(initial?.status || "Processing");
  const [items, setItems] = useState(initial?.items.toString() || "1");

  useEffect(() => {
    setCustomer(initial?.customer || "");
    setDate(initial?.date || new Date().toISOString().split("T")[0]);
    setTotal(initial?.total ? String(initial.total) : "");
    setStatus(initial?.status || "Processing");
    setItems(initial?.items ? String(initial.items) : "1");
  }, [initial, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customer.trim() || !total || !date || !status || !items) return;
    onSubmit({
      customer,
      date,
      total: parseFloat(total),
      status,
      items: parseInt(items),
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{mode === "add" ? "Add Order" : "Edit Order"}</DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Create a new order entry."
                : "Update the selected order."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              value={customer}
              autoFocus
              onChange={e => setCustomer(e.target.value)}
              placeholder="Customer name"
              required
            />
            <Input
              value={date}
              onChange={e => setDate(e.target.value)}
              type="date"
              required
            />
            <Input
              value={total}
              onChange={e => setTotal(e.target.value)}
              type="number"
              step="0.01"
              placeholder="Order total"
              required
            />
            <select value={status} onChange={e => setStatus(e.target.value as OrderStatus)} className="w-full border rounded-md px-3 py-2" required>
              {statusOptions.map((s) => (
                <option value={s} key={s}>{s}</option>
              ))}
            </select>
            <Input
              value={items}
              onChange={e => setItems(e.target.value)}
              type="number"
              min="1"
              placeholder="No. of items"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">{mode === "add" ? "Add" : "Save"}</Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

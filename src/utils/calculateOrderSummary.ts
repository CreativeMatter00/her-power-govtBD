interface OrderData {
  order_pid: string;
  product_name: string;
  product_pid: string;
  quantity: number;
  mrp_price: number;
  delivery_charge: number;
  sales_amount: number;
  order_status_numb: number;
  order_status: string;
  file_url: string;
}

interface Summary {
  subtotal: number;
  shippingFee: number;
  total: number;
  length: number;
}

export const calculateOrderSummary = (data: OrderData[]): Summary => {
  const subtotal = data.reduce((acc, item) => acc + item.sales_amount, 0);
  const shippingFee = data.reduce((acc, item) => acc + item.delivery_charge, 0);
  const total = subtotal + shippingFee;
  const length = data.length;

  return {
    subtotal,
    shippingFee,
    total,
    length
  };
};

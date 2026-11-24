import { stockLabel, type Product } from "@/lib/catalog";

const dotColour: Record<Product["stock"]["status"], string> = {
  in_stock: "bg-success",
  low_stock: "bg-sale",
  sold_out: "bg-subtle",
};

export function StockStatus({ stock }: { stock: Product["stock"] }) {
  return (
    <p className="flex items-center gap-2 text-body-sm">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotColour[stock.status]}`} />
      <span className={stock.status === "low_stock" ? "text-sale" : undefined}>{stockLabel(stock)}</span>
    </p>
  );
}

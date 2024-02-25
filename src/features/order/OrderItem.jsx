import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  // , isLoadingIngredients, ingredients
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex justify-between items-center gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 italic capitalize">
        {isLoadingIngredients ? "Loading ingredients..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;

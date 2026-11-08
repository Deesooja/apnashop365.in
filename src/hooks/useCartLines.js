import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import ProductService from '../services/ProductService';
import PriceFormatter from '../services/PriceFormatter';

/**
 * Resolves cart line items with product data and totals.
 */
export default function useCartLines() {
  const items = useSelector(selectCartItems);

  return useMemo(() => {
    const lines = [];
    let grandTotal = 0;
    let count = 0;

    items.forEach(({ id, quantity }) => {
      const product = ProductService.getProductById(id);
      if (!product) return;
      const unit = PriceFormatter.getEffectivePrice(product);
      const lineTotal = unit * quantity;
      grandTotal += lineTotal;
      count += quantity;
      lines.push({ product, quantity, unit, lineTotal });
    });

    return { lines, grandTotal, count };
  }, [items]);
}

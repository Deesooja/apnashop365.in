/**
 * Formats INR prices and discount percentages.
 */
class PriceFormatter {
  /**
   * @param {number} amount
   * @returns {string}
   */
  static format(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      return '₹0';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Effective selling price (discount if present, else MRP).
   * @param {{ price: number, discountPrice?: number|null }} product
   * @returns {number}
   */
  static getEffectivePrice(product) {
    if (
      product.discountPrice != null &&
      product.discountPrice > 0 &&
      product.discountPrice < product.price
    ) {
      return product.discountPrice;
    }
    return product.price;
  }

  /**
   * @param {{ price: number, discountPrice?: number|null }} product
   * @returns {boolean}
   */
  static hasDiscount(product) {
    return (
      product.discountPrice != null &&
      product.discountPrice > 0 &&
      product.discountPrice < product.price
    );
  }

  /**
   * Rounded percent off from MRP.
   * @param {{ price: number, discountPrice?: number|null }} product
   * @returns {number|null}
   */
  static getDiscountPercent(product) {
    if (!PriceFormatter.hasDiscount(product)) return null;
    const pct = ((product.price - product.discountPrice) / product.price) * 100;
    return Math.round(pct);
  }
}

export default PriceFormatter;

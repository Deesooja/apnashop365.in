const STORAGE_KEY = 'apnashop365_cart_v1';

/**
 * Persists cart items to localStorage.
 */
class CartPersistence {
  /**
   * @returns {{ id: string, quantity: number }[]}
   */
  static load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(
          (item) =>
            item &&
            typeof item.id === 'string' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0,
        )
        .map((item) => ({
          id: item.id,
          quantity: Math.floor(item.quantity),
        }));
    } catch {
      return [];
    }
  }

  /**
   * @param {{ id: string, quantity: number }[]} items
   */
  static save(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — ignore
    }
  }

  static clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

export default CartPersistence;

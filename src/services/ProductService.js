import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import PriceFormatter from './PriceFormatter';

/**
 * Read-only catalog access. Products/categories come from JSON only.
 */
class ProductService {
  /**
   * @returns {object[]}
   */
  static getAllProducts() {
    return [...productsData];
  }

  /**
   * @returns {object[]}
   */
  static getAllCategories() {
    return [...categoriesData];
  }

  /**
   * @param {string} id
   * @returns {object|null}
   */
  static getProductById(id) {
    if (!id) return null;
    return productsData.find((p) => p.id === id) || null;
  }

  /**
   * @param {string} slug
   * @returns {object|null}
   */
  static getCategoryBySlug(slug) {
    if (!slug) return null;
    return categoriesData.find((c) => c.slug === slug) || null;
  }

  /**
   * @param {string} categorySlug
   * @returns {object[]}
   */
  static getProductsByCategory(categorySlug) {
    return productsData.filter((p) => p.category === categorySlug);
  }

  /**
   * @returns {object[]}
   */
  static getFeaturedProducts() {
    return productsData.filter((p) => p.isFeatured);
  }

  /**
   * @param {object} product
   * @param {number} [limit=4]
   * @returns {object[]}
   */
  static getRelatedProducts(product, limit = 4) {
    if (!product) return [];
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  /**
   * @param {object} filters
   * @param {string} [filters.category]
   * @param {number|null} [filters.min]
   * @param {number|null} [filters.max]
   * @param {string} [filters.q]
   * @param {'newest'|'price-asc'|'price-desc'} [filters.sort]
   * @returns {object[]}
   */
  static filterProducts(filters = {}) {
    const {
      category = '',
      min = null,
      max = null,
      q = '',
      sort = 'newest',
    } = filters;

    let list = [...productsData];

    if (category) {
      const valid = categoriesData.some((c) => c.slug === category);
      if (valid) {
        list = list.filter((p) => p.category === category);
      }
    }

    const minNum = min === null || min === '' ? null : Number(min);
    const maxNum = max === null || max === '' ? null : Number(max);

    if (minNum != null && !Number.isNaN(minNum)) {
      list = list.filter((p) => PriceFormatter.getEffectivePrice(p) >= minNum);
    }
    if (maxNum != null && !Number.isNaN(maxNum)) {
      list = list.filter((p) => PriceFormatter.getEffectivePrice(p) <= maxNum);
    }

    const query = String(q || '').trim().toLowerCase();
    if (query) {
      list = list.filter((p) => {
        const haystack = [
          p.name,
          p.material,
          ...(p.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      });
    }

    list.sort((a, b) => {
      if (sort === 'price-asc') {
        return (
          PriceFormatter.getEffectivePrice(a) -
          PriceFormatter.getEffectivePrice(b)
        );
      }
      if (sort === 'price-desc') {
        return (
          PriceFormatter.getEffectivePrice(b) -
          PriceFormatter.getEffectivePrice(a)
        );
      }
      // newest (default)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return list;
  }

  /**
   * @returns {{ min: number, max: number }}
   */
  static getPriceBounds() {
    const prices = productsData.map((p) => PriceFormatter.getEffectivePrice(p));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
}

export default ProductService;

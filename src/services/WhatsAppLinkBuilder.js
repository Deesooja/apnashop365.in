import siteConfig from '../config/siteConfig';
import PriceFormatter from './PriceFormatter';

/**
 * Builds wa.me URLs with pre-filled order / inquiry messages.
 */
class WhatsAppLinkBuilder {
  /**
   * @param {string} template
   * @param {Record<string, string>} vars
   * @returns {string}
   */
  static fillTemplate(template, vars) {
    return Object.entries(vars).reduce(
      (text, [key, value]) =>
        text.replaceAll(`{{${key}}}`, value == null ? '' : String(value)),
      template,
    );
  }

  /**
   * @param {string} message
   * @returns {string}
   */
  static buildUrl(message) {
    const number = siteConfig.whatsapp.number;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encoded}`;
  }

  /**
   * @param {string} [lang='en']
   * @returns {string}
   */
  static getGeneralChatUrl(lang = 'en') {
    const msg =
      siteConfig.whatsapp.defaultMessage[lang] ||
      siteConfig.whatsapp.defaultMessage.en;
    return WhatsAppLinkBuilder.buildUrl(msg);
  }

  /**
   * @param {object} product
   * @param {number} quantity
   * @param {{ lang?: string, siteOrigin?: string }} [options]
   * @returns {string}
   */
  static buildDirectOrderUrl(product, quantity, options = {}) {
    const lang = options.lang || 'en';
    const origin = options.siteOrigin || siteConfig.siteUrl;
    const price = PriceFormatter.format(
      PriceFormatter.getEffectivePrice(product),
    );
    const url = `${origin}/product/${product.id}`;
    const deliveryNote =
      siteConfig.delivery.chargeNote[lang] ||
      siteConfig.delivery.chargeNote.en;
    const template =
      siteConfig.whatsappTemplates.directOrder[lang] ||
      siteConfig.whatsappTemplates.directOrder.en;

    const message = WhatsAppLinkBuilder.fillTemplate(template, {
      name: product.name,
      id: product.id,
      price,
      qty: String(quantity),
      url,
      deliveryNote,
    });

    return WhatsAppLinkBuilder.buildUrl(message);
  }

  /**
   * Out-of-stock inquiry (no order assumption).
   * @param {object} product
   * @param {{ lang?: string, siteOrigin?: string }} [options]
   */
  static buildOutOfStockInquiryUrl(product, options = {}) {
    const lang = options.lang || 'en';
    const origin = options.siteOrigin || siteConfig.siteUrl;
    const url = `${origin}/product/${product.id}`;
    const template =
      siteConfig.whatsappTemplates.outOfStockInquiry[lang] ||
      siteConfig.whatsappTemplates.outOfStockInquiry.en;
    const message = WhatsAppLinkBuilder.fillTemplate(template, {
      name: product.name,
      id: product.id,
      url,
    });
    return WhatsAppLinkBuilder.buildUrl(message);
  }

  /**
   * @param {{ product: object, quantity: number }[]} lines
   * @param {{ lang?: string }} [options]
   * @returns {string}
   */
  static buildCartOrderUrl(lines, options = {}) {
    const lang = options.lang || 'en';
    const lineTemplate =
      siteConfig.whatsappTemplates.cartItemLine[lang] ||
      siteConfig.whatsappTemplates.cartItemLine.en;
    const cartTemplate =
      siteConfig.whatsappTemplates.cartOrder[lang] ||
      siteConfig.whatsappTemplates.cartOrder.en;
    const deliveryNote =
      siteConfig.delivery.chargeNote[lang] ||
      siteConfig.delivery.chargeNote.en;

    let grand = 0;
    const itemLines = lines.map(({ product, quantity }) => {
      const unit = PriceFormatter.getEffectivePrice(product);
      const lineTotal = unit * quantity;
      grand += lineTotal;
      return WhatsAppLinkBuilder.fillTemplate(lineTemplate, {
        name: product.name,
        qty: String(quantity),
        price: PriceFormatter.format(unit),
        lineTotal: PriceFormatter.format(lineTotal),
      });
    });

    const message = WhatsAppLinkBuilder.fillTemplate(cartTemplate, {
      items: itemLines.join('\n'),
      grandTotal: PriceFormatter.format(grand),
      deliveryNote,
    });

    return WhatsAppLinkBuilder.buildUrl(message);
  }
}

export default WhatsAppLinkBuilder;

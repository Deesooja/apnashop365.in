/**
 * All business facts live ONLY here.
 * Unknown facts are marked with // TODO — never invent values.
 */

const siteConfig = {
  brandName: 'ApnaShop365.in',
  tagline: {
    en: 'Shop Smart • Live Better',
    hi: 'समझदारी से खरीदें • बेहतर जिएं',
  },
  // Canonical production URL for OG tags & sitemap
  siteUrl: 'https://apnashop365.in',
  logoSrc: '/logo.jpg',
  logoAlt: 'ApnaShop365 — Shop Smart • Live Better',

  whatsapp: {
    // 91 + 10-digit mobile 9183984206
    number: '919183984206',
    // TODO: confirm display label / hours if needed
    defaultMessage: {
      en: 'Hello! I have a question about ApnaShop365.in jewelry.',
      hi: 'नमस्ते! मुझे ApnaShop365.in ज्वेलरी के बारे में प्रश्न है।',
    },
  },

  contact: {
    // TODO: full business address
    address: {
      en: 'TODO: full business address',
      hi: 'TODO: पूरा व्यावसायिक पता',
    },
    // TODO: customer-facing phone display (may differ from WhatsApp)
    phoneDisplay: '9183984206',
    phoneTel: '+919183984206',
    email: 'TODO: support@apnashop365.in',
    // TODO: paste Google Maps embed URL
    mapEmbedUrl: '',
  },

  social: {
    // TODO: real profile URLs
    instagram: 'https://www.instagram.com/apnashop365.in?mdxt=MXY1NHp4ejg0dWtzeg==',
    facebook: 'https://www.facebook.com/share/1Hq2F3xh6u/',
    youtube: 'https://youtube.com/TODO',
  },

  delivery: {
    // Not calculated at checkout — stated in WhatsApp messages only
    // TODO: clarify delivery charge policy for customers
    chargeNote: {
      en: 'Delivery charges: as discussed / TODO',
      hi: 'डिलीवरी शुल्क: बातचीत के अनुसार / TODO',
    },
  },

  /**
   * WhatsApp message templates.
   * Placeholders: {{name}}, {{id}}, {{price}}, {{qty}}, {{url}},
   * {{items}}, {{grandTotal}}, {{deliveryNote}}
   */
  whatsappTemplates: {
    directOrder: {
      en: `Hello! I would like to order from ApnaShop365.in:

*{{name}}*
Product ID: {{id}}
Price: {{price}}
Quantity: {{qty}}
Link: {{url}}

{{deliveryNote}}

Please share:
1) Full name
2) Delivery address
3) Pincode
4) Payment preference (COD / UPI / discuss on WhatsApp)`,
      hi: `नमस्ते! मैं ApnaShop365.in से ऑर्डर करना चाहता/चाहती हूँ:

*{{name}}*
प्रोडक्ट ID: {{id}}
कीमत: {{price}}
मात्रा: {{qty}}
लिंक: {{url}}

{{deliveryNote}}

कृपया बताएँ:
1) पूरा नाम
2) डिलीवरी पता
3) पिनकोड
4) भुगतान तरीका (COD / UPI / WhatsApp पर चर्चा)`,
    },
    cartOrder: {
      en: `Hello! I would like to order the following from ApnaShop365.in:

{{items}}

*Grand total: {{grandTotal}}*
{{deliveryNote}}

Please share:
1) Full name
2) Delivery address
3) Pincode
4) Payment preference (COD / UPI / discuss on WhatsApp)`,
      hi: `नमस्ते! मैं ApnaShop365.in से निम्नलिखित ऑर्डर करना चाहता/चाहती हूँ:

{{items}}

*कुल योग: {{grandTotal}}*
{{deliveryNote}}

कृपया बताएँ:
1) पूरा नाम
2) डिलीवरी पता
3) पिनकोड
4) भुगतान तरीका (COD / UPI / WhatsApp पर चर्चा)`,
    },
    cartItemLine: {
      en: '• {{name}} × {{qty}} — {{price}} each (line: {{lineTotal}})',
      hi: '• {{name}} × {{qty}} — {{price}} प्रत्येक (लाइन: {{lineTotal}})',
    },
    outOfStockInquiry: {
      en: `Hello! I am interested in *{{name}}* (ID: {{id}}) which appears out of stock.

Link: {{url}}

Please let me know when it is available, or suggest similar pieces.`,
      hi: `नमस्ते! मुझे *{{name}}* (ID: {{id}}) में रुचि है जो स्टॉक में नहीं दिख रहा।

लिंक: {{url}}

कृपया उपलब्धता बताएँ, या मिलते-जुलते आभूषण सुझाएँ।`,
    },
  },

  heroSlides: [
    {
      id: 'slide-1',
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80',
      headline: {
        en: 'Fancy Jewelry for Every Occasion',
        hi: 'हर अवसर के लिए फैंसी ज्वेलरी',
      },
      ctaLabel: { en: 'Shop Collection', hi: 'कलेक्शन देखें' },
      ctaTo: '/shop',
    },
    {
      id: 'slide-2',
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=80',
      headline: {
        en: 'Necklaces & Sets That Shine',
        hi: 'नेकलेस और सेट जो चमकें',
      },
      ctaLabel: { en: 'Explore Necklaces', hi: 'नेकलेस देखें' },
      ctaTo: '/category/necklaces',
    },
    {
      id: 'slide-3',
      image:
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80',
      headline: {
        en: 'Order Easily on WhatsApp',
        hi: 'WhatsApp पर आसानी से ऑर्डर करें',
      },
      ctaLabel: { en: 'Chat to Order', hi: 'ऑर्डर के लिए चैट करें' },
      ctaTo: 'whatsapp',
    },
  ],

  trustItems: [
    {
      id: 'open-box',
      icon: 'Inventory2Outlined',
      title: { en: 'Open Box Delivery', hi: 'ओपन बॉक्स डिलीवरी' },
      to: '/policies/open-box-delivery',
    },
    {
      id: 'returns',
      icon: 'AssignmentReturnOutlined',
      title: { en: 'Easy Returns', hi: 'आसान रिटर्न' },
      to: '/policies/return-policy',
    },
    {
      id: 'cod',
      icon: 'PaymentsOutlined',
      title: { en: 'COD Available', hi: 'कैश ऑन डिलीवरी' },
      to: '/faq',
    },
    {
      id: 'whatsapp',
      icon: 'WhatsApp',
      title: { en: 'WhatsApp Support', hi: 'WhatsApp सपोर्ट' },
      to: 'whatsapp',
    },
  ],

  /**
   * Policy bodies — paste final legal copy when ready.
   * Until then, clearly marked TODO placeholders.
   */
  policies: {
    openBoxDelivery: {
      title: { en: 'Open Box Delivery', hi: 'ओपन बॉक्स डिलीवरी' },
      // TODO: paste real Open Box Delivery policy text (EN + HI)
      sections: [
        {
          heading: { en: 'Overview', hi: 'परिचय' },
          body: {
            en: 'TODO: Paste your Open Box Delivery policy overview here.',
            hi: 'TODO: यहाँ ओपन बॉक्स डिलीवरी नीति का परिचय पेस्ट करें।',
          },
        },
        {
          heading: { en: 'How it works', hi: 'यह कैसे काम करता है' },
          body: {
            en: 'TODO: Describe steps the customer follows on delivery.',
            hi: 'TODO: डिलीवरी पर ग्राहक के चरण लिखें।',
          },
        },
        {
          heading: { en: 'Exceptions', hi: 'अपवाद' },
          body: {
            en: 'TODO: List any exceptions or non-eligible items.',
            hi: 'TODO: अपवाद या अयोग्य आइटम सूचीबद्ध करें।',
          },
        },
      ],
    },
    returnPolicy: {
      title: { en: 'Return Policy', hi: 'रिटर्न नीति' },
      // TODO: paste real Return Policy text (EN + HI)
      sections: [
        {
          heading: { en: 'Overview', hi: 'परिचय' },
          body: {
            en: 'TODO: Paste your Return Policy overview here.',
            hi: 'TODO: यहाँ रिटर्न नीति का परिचय पेस्ट करें।',
          },
        },
        {
          heading: { en: 'Eligibility', hi: 'पात्रता' },
          body: {
            en: 'TODO: State return window, unused condition, packaging rules.',
            hi: 'TODO: रिटर्न अवधि, अप्रयुक्त स्थिति, पैकेजिंग नियम बताएँ।',
          },
        },
        {
          heading: { en: 'How to request a return', hi: 'रिटर्न कैसे माँगें' },
          body: {
            en: 'TODO: Instruct customers to contact WhatsApp with order details.',
            hi: 'TODO: ग्राहकों को ऑर्डर विवरण के साथ WhatsApp पर संपर्क करने का निर्देश दें।',
          },
        },
      ],
    },
  },

  about: {
    title: { en: 'About ApnaShop365.in', hi: 'ApnaShop365.in के बारे में' },
    // TODO: replace with real brand story
    body: {
      en: 'TODO: Tell your brand story — who you are, what fancy jewelry you curate, and why customers trust ApnaShop365.in.',
      hi: 'TODO: अपना ब्रांड स्टोरी लिखें — आप कौन हैं, कौन-सी फैंसी ज्वेलरी लाते हैं, और ग्राहक ApnaShop365.in पर क्यों भरोसा करते हैं।',
    },
    teaser: {
      en: 'Curated fancy jewelry, ordered simply on WhatsApp.',
      hi: 'चुनिंदा फैंसी ज्वेलरी, WhatsApp पर सरल ऑर्डर।',
    },
  },

  faq: [
    {
      id: 'faq-1',
      question: {
        en: 'How do I place an order?',
        hi: 'मैं ऑर्डर कैसे करूँ?',
      },
      answer: {
        en: 'Add items to your cart or tap Order on WhatsApp on a product. We confirm details and payment preference (COD / UPI / discuss) on WhatsApp. This website never takes payment.',
        hi: 'कार्ट में आइटम जोड़ें या प्रोडक्ट पर Order on WhatsApp दबाएँ। हम WhatsApp पर विवरण और भुगतान तरीका (COD / UPI / चर्चा) कन्फर्म करते हैं। यह वेबसाइट भुगतान नहीं लेती।',
      },
    },
    {
      id: 'faq-2',
      question: {
        en: 'Do you offer Cash on Delivery?',
        hi: 'क्या कैश ऑन डिलीवरी उपलब्ध है?',
      },
      answer: {
        en: 'Yes — choose COD when we chat on WhatsApp, or UPI / discuss what works for you.',
        hi: 'हाँ — WhatsApp पर COD चुनें, या UPI / जो सुविधाजनक हो उस पर चर्चा करें।',
      },
    },
    {
      id: 'faq-3',
      question: {
        en: 'What is Open Box Delivery?',
        hi: 'ओपन बॉक्स डिलीवरी क्या है?',
      },
      answer: {
        en: 'See our Open Box Delivery policy page for full details. TODO: ensure policy text matches your operations.',
        hi: 'पूरे विवरण के लिए ओपन बॉक्स डिलीवरी पेज देखें। TODO: नीति पाठ अपने संचालन से मिलाएँ।',
      },
    },
    {
      id: 'faq-4',
      question: {
        en: 'How do returns work?',
        hi: 'रिटर्न कैसे काम करता है?',
      },
      answer: {
        en: 'Please read the Return Policy page, then message us on WhatsApp with your order details.',
        hi: 'कृपया रिटर्न नीति पढ़ें, फिर ऑर्डर विवरण के साथ WhatsApp पर संदेश करें।',
      },
    },
    {
      id: 'faq-5',
      question: {
        en: 'Are products real gold / precious stones?',
        hi: 'क्या प्रोडक्ट असली सोना / रत्न हैं?',
      },
      answer: {
        en: 'We currently focus on fancy jewelry. Material details are listed on each product page. TODO: clarify materials disclaimer for customers.',
        hi: 'हम वर्तमान में फैंसी ज्वेलरी पर ध्यान देते हैं। सामग्री विवरण प्रत्येक प्रोडक्ट पेज पर है। TODO: ग्राहकों के लिए सामग्री अस्वीकरण स्पष्ट करें।',
      },
    },
  ],

  seo: {
    defaultTitle: 'ApnaShop365.in | Fancy Jewelry',
    titleTemplate: '%s | ApnaShop365.in',
    defaultDescription: {
      en: 'Shop fancy jewelry at ApnaShop365.in — necklaces, earrings, rings, bangles and sets. Order on WhatsApp with COD available.',
      hi: 'ApnaShop365.in पर फैंसी ज्वेलरी खरीदें — नेकलेस, इयररिंग्स, रिंग्स, बैंगल्स और सेट। WhatsApp पर ऑर्डर करें, COD उपलब्ध।',
    },
    ogImage: '/og-default.svg',
  },
};

export default siteConfig;

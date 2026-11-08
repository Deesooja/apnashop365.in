import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useDispatch } from 'react-redux';
import ProductService from '../services/ProductService';
import PriceFormatter from '../services/PriceFormatter';
import WhatsAppLinkBuilder from '../services/WhatsAppLinkBuilder';
import siteConfig from '../config/siteConfig';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/product/ProductGrid';
import PriceDisplay from '../components/common/PriceDisplay';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';
import { addItem } from '../store/cartSlice';
import { openCartDrawer } from '../store/uiSlice';

export default function ProductPage() {
  const { id } = useParams();
  const { t, lang, localize } = useLanguage();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const product = ProductService.getProductById(id);

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Seo title={t('productMissing')} path={`/product/${id || ''}`} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('productMissing')}
        </Typography>
        <Button component={RouterLink} to="/shop" variant="contained">
          {t('continueShopping')}
        </Button>
      </Container>
    );
  }

  const related = ProductService.getRelatedProducts(product);
  const origin =
    typeof window !== 'undefined' ? window.location.origin : siteConfig.siteUrl;
  const waHref = product.inStock
    ? WhatsAppLinkBuilder.buildDirectOrderUrl(product, qty, {
        lang,
        siteOrigin: origin,
      })
    : WhatsAppLinkBuilder.buildOutOfStockInquiryUrl(product, {
        lang,
        siteOrigin: origin,
      });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    material: product.material,
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.siteUrl}/product/${product.id}`,
      priceCurrency: 'INR',
      price: PriceFormatter.getEffectivePrice(product),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  const handleAdd = () => {
    if (!product.inStock) return;
    dispatch(addItem({ id: product.id, quantity: qty }));
    dispatch(openCartDrawer());
  };

  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        path={`/product/${product.id}`}
        image={product.images[0]}
        type="product"
        jsonLd={jsonLd}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 6 },
          }}
        >
          <ProductGallery images={product.images} name={product.name} />

          <Box>
            <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
              {product.name}
            </Typography>
            <PriceDisplay product={product} size="h5" />
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                color: product.inStock ? 'success.main' : 'error.main',
                fontWeight: 600,
              }}
            >
              {product.inStock ? t('inStock') : t('outOfStock')}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>{t('material')}:</strong> {product.material}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              {product.description}
            </Typography>

            {product.inStock ? (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="body2">{t('quantity')}</Typography>
                <IconButton
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography aria-live="polite">{qty}</Typography>
                <IconButton
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            ) : null}

            <Stack spacing={1.5} sx={{ maxWidth: 360 }}>
              <Button
                variant="contained"
                size="large"
                disabled={!product.inStock}
                onClick={handleAdd}
              >
                {t('addToCart')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                component="a"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
              >
                {product.inStock ? t('orderWhatsApp') : t('inquireWhatsApp')}
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              {t('deliveryReturns')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('deliveryReturnsSummary')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {localize(siteConfig.delivery.chargeNote)}
            </Typography>
          </Box>
        </Box>

        {related.length ? (
          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
              {t('related')}
            </Typography>
            <ProductGrid products={related} />
          </Box>
        ) : null}
      </Container>
    </>
  );
}

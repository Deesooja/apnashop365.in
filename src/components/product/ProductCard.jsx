import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useDispatch } from 'react-redux';
import LazyImage from '../common/LazyImage';
import PriceDisplay from '../common/PriceDisplay';
import useLanguage from '../../hooks/useLanguage';
import { addItem } from '../../store/cartSlice';
import { openCartDrawer } from '../../store/uiSlice';
import WhatsAppLinkBuilder from '../../services/WhatsAppLinkBuilder';

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const origin =
    typeof window !== 'undefined' ? window.location.origin : undefined;

  const waHref = product.inStock
    ? WhatsAppLinkBuilder.buildDirectOrderUrl(product, 1, { lang, siteOrigin: origin })
    : WhatsAppLinkBuilder.buildOutOfStockInquiryUrl(product, {
        lang,
        siteOrigin: origin,
      });

  const handleAdd = () => {
    if (!product.inStock) return;
    dispatch(addItem({ id: product.id, quantity: 1 }));
    dispatch(openCartDrawer());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <Box sx={{ position: 'relative' }}>
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            aspectRatio="1 / 1"
          />
          {!product.inStock ? (
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(43,33,24,0.75)',
                color: '#fff',
                px: 1,
                py: 0.25,
              }}
            >
              {t('outOfStock')}
            </Typography>
          ) : null}
        </Box>
        <Box sx={{ p: 1.5, pb: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              lineHeight: 1.3,
              minHeight: 48,
            }}
          >
            {product.name}
          </Typography>
          <PriceDisplay product={product} size="body1" />
        </Box>
      </Box>

      <Stack spacing={1} sx={{ p: 1.5, mt: 'auto' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!product.inStock}
          onClick={handleAdd}
        >
          {t('addToCart')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          component="a"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<WhatsAppIcon />}
        >
          {product.inStock ? t('orderWhatsApp') : t('inquireWhatsApp')}
        </Button>
      </Stack>
    </Box>
  );
}

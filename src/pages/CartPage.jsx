import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useDispatch } from 'react-redux';
import useCartLines from '../hooks/useCartLines';
import PriceFormatter from '../services/PriceFormatter';
import WhatsAppLinkBuilder from '../services/WhatsAppLinkBuilder';
import LazyImage from '../components/common/LazyImage';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';
import { removeItem, setQuantity } from '../store/cartSlice';

export default function CartPage() {
  const { t, lang } = useLanguage();
  const dispatch = useDispatch();
  const { lines, grandTotal } = useCartLines();
  const waHref = WhatsAppLinkBuilder.buildCartOrderUrl(lines, { lang });

  return (
    <>
      <Seo title={t('cartHeading')} path="/cart" />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          {t('cartHeading')}
        </Typography>

        {!lines.length ? (
          <Stack spacing={2} alignItems="flex-start">
            <Typography color="text.secondary">{t('emptyCart')}</Typography>
            <Button component={RouterLink} to="/shop" variant="contained">
              {t('continueShopping')}
            </Button>
          </Stack>
        ) : (
          <>
            <Stack spacing={2} divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}>
              {lines.map(({ product, quantity, unit, lineTotal }) => (
                <Stack
                  key={product.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ py: 2 }}
                >
                  <Box
                    component={RouterLink}
                    to={`/product/${product.id}`}
                    sx={{ width: { xs: '100%', sm: 120 }, flexShrink: 0 }}
                  >
                    <LazyImage
                      src={product.images[0]}
                      alt={product.name}
                      aspectRatio="1 / 1"
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      variant="h6"
                      sx={{
                        textDecoration: 'none',
                        color: 'text.primary',
                        fontFamily: '"Playfair Display", serif',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {PriceFormatter.format(unit)} × {quantity}
                    </Typography>
                    <Typography fontWeight={700} color="primary.main" sx={{ mt: 0.5 }}>
                      {PriceFormatter.format(lineTotal)}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                      <IconButton
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(
                            setQuantity({ id: product.id, quantity: quantity - 1 }),
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography aria-live="polite">{quantity}</Typography>
                      <IconButton
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(
                            setQuantity({ id: product.id, quantity: quantity + 1 }),
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <Button
                        color="inherit"
                        onClick={() => dispatch(removeItem(product.id))}
                      >
                        {t('remove')}
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Typography variant="h5">
                {t('grandTotal')}:{' '}
                <Box component="span" color="primary.main" fontWeight={700}>
                  {PriceFormatter.format(grandTotal)}
                </Box>
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button component={RouterLink} to="/shop" variant="outlined">
                  {t('continueShopping')}
                </Button>
                <Button
                  variant="contained"
                  component="a"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<WhatsAppIcon />}
                >
                  {t('orderAllWhatsApp')}
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
}

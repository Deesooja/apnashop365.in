import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { closeCartDrawer, selectCartDrawerOpen } from '../../store/uiSlice';
import { removeItem, setQuantity } from '../../store/cartSlice';
import useCartLines from '../../hooks/useCartLines';
import PriceFormatter from '../../services/PriceFormatter';
import WhatsAppLinkBuilder from '../../services/WhatsAppLinkBuilder';
import useLanguage from '../../hooks/useLanguage';
import LazyImage from '../common/LazyImage';

export default function CartDrawer() {
  const open = useSelector(selectCartDrawerOpen);
  const dispatch = useDispatch();
  const { t, lang } = useLanguage();
  const { lines, grandTotal, count } = useCartLines();

  const waHref = WhatsAppLinkBuilder.buildCartOrderUrl(lines, { lang });

  const close = () => dispatch(closeCartDrawer());

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Box
        sx={{
          width: { xs: '100vw', sm: 380 },
          maxWidth: '100vw',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif' }}>
            {t('yourCart')} ({count})
          </Typography>
          <IconButton aria-label="Close cart" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {!lines.length ? (
            <Stack spacing={2} alignItems="flex-start">
              <Typography color="text.secondary">{t('emptyCart')}</Typography>
              <Button
                component={RouterLink}
                to="/shop"
                variant="contained"
                onClick={close}
              >
                {t('continueShopping')}
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2}>
              {lines.map(({ product, quantity, lineTotal }) => (
                <Stack key={product.id} direction="row" spacing={1.5}>
                  <Box sx={{ width: 72, flexShrink: 0 }}>
                    <LazyImage
                      src={product.images[0]}
                      alt={product.name}
                      aspectRatio="1 / 1"
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      onClick={close}
                      variant="subtitle2"
                      sx={{ textDecoration: 'none', color: 'text.primary' }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {PriceFormatter.format(lineTotal)}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                      <IconButton
                        size="small"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(
                            setQuantity({
                              id: product.id,
                              quantity: quantity - 1,
                            }),
                          )
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" aria-live="polite">
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(
                            setQuantity({
                              id: product.id,
                              quantity: quantity + 1,
                            }),
                          )
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <Button
                        size="small"
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
          )}
        </Box>

        {lines.length ? (
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography fontWeight={600}>{t('grandTotal')}</Typography>
              <Typography fontWeight={700} color="primary.main">
                {PriceFormatter.format(grandTotal)}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component="a"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
              >
                {t('orderAllWhatsApp')}
              </Button>
              <Button
                component={RouterLink}
                to="/cart"
                variant="outlined"
                fullWidth
                onClick={close}
              >
                {t('cartHeading')}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Drawer>
  );
}

import { Box, Typography } from '@mui/material';
import PriceFormatter from '../../services/PriceFormatter';
import useLanguage from '../../hooks/useLanguage';

export default function PriceDisplay({ product, size = 'body1' }) {
  const { t } = useLanguage();
  const effective = PriceFormatter.getEffectivePrice(product);
  const hasDiscount = PriceFormatter.hasDiscount(product);
  const pct = PriceFormatter.getDiscountPercent(product);

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
      <Typography
        component="span"
        variant={size}
        sx={{ fontWeight: 700, color: 'primary.main' }}
      >
        {PriceFormatter.format(effective)}
      </Typography>
      {hasDiscount ? (
        <>
          <Typography
            component="span"
            variant="body2"
            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
          >
            {PriceFormatter.format(product.price)}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            sx={{ color: 'success.main', fontWeight: 600 }}
          >
            {pct}
            {t('discountOff')}
          </Typography>
        </>
      ) : null}
    </Box>
  );
}

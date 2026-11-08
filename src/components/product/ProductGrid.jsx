import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import useLanguage from '../../hooks/useLanguage';

export default function ProductGrid({ products }) {
  const { t } = useLanguage();

  if (!products.length) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="text.secondary">{t('noProducts')}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: { xs: 1.5, md: 2.5 },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}

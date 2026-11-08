import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ProductService from '../services/ProductService';
import ProductGrid from '../components/product/ProductGrid';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';

export default function CategoryPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const category = ProductService.getCategoryBySlug(slug);
  const products = category
    ? ProductService.filterProducts({ category: slug, sort: 'newest' })
    : [];

  if (!category) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Seo title={t('categoryMissing')} path={`/category/${slug || ''}`} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('categoryMissing')}
        </Typography>
        <Button component={RouterLink} to="/shop" variant="contained">
          {t('continueShopping')}
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Seo
        title={category.name}
        description={category.description}
        path={`/category/${category.slug}`}
      />
      <Box
        sx={{
          position: 'relative',
          height: { xs: 200, md: 280 },
          backgroundImage: `linear-gradient(rgba(43,33,24,0.45), rgba(43,33,24,0.45)), url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Container maxWidth="lg" sx={{ pb: 3 }}>
          <Typography variant="h3" component="h1" sx={{ color: '#fff' }}>
            {category.name}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 0.5 }}>
            {category.description}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <ProductGrid products={products} />
      </Container>
    </>
  );
}

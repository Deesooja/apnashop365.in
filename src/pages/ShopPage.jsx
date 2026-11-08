import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import ProductService from '../services/ProductService';
import ProductGrid from '../components/product/ProductGrid';
import ShopFilters from '../components/product/ShopFilters';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';

function readFilters(params) {
  const sort = params.get('sort') || 'newest';
  const validSort = ['newest', 'price-asc', 'price-desc'].includes(sort)
    ? sort
    : 'newest';
  return {
    category: params.get('category') || '',
    min: params.get('min') || '',
    max: params.get('max') || '',
    q: params.get('q') || '',
    sort: validSort,
  };
}

function toSearchParams(filters) {
  const next = new URLSearchParams();
  if (filters.category) next.set('category', filters.category);
  if (filters.min !== '' && filters.min != null) next.set('min', String(filters.min));
  if (filters.max !== '' && filters.max != null) next.set('max', String(filters.max));
  if (filters.q) next.set('q', filters.q);
  if (filters.sort && filters.sort !== 'newest') next.set('sort', filters.sort);
  return next;
}

export default function ShopPage() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => readFilters(params), [params]);

  const products = useMemo(
    () =>
      ProductService.filterProducts({
        category: filters.category,
        min: filters.min === '' ? null : Number(filters.min),
        max: filters.max === '' ? null : Number(filters.max),
        q: filters.q,
        sort: filters.sort,
      }),
    [filters],
  );

  const onChange = (next) => {
    setParams(toSearchParams(next), { replace: true });
  };

  const onClear = () => setParams({}, { replace: true });

  return (
    <>
      <Seo title={t('shopHeading')} path="/shop" />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          {t('shopHeading')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '240px 1fr' },
            gap: { xs: 2, md: 4 },
            alignItems: 'start',
          }}
        >
          <ShopFilters value={filters} onChange={onChange} onClear={onClear} />
          <ProductGrid products={products} />
        </Box>
      </Container>
    </>
  );
}

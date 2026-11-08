import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ProductService from '../../services/ProductService';
import useLanguage from '../../hooks/useLanguage';

export default function ShopFilters({ value, onChange, onClear }) {
  const { t } = useLanguage();
  const categories = ProductService.getAllCategories();
  const bounds = ProductService.getPriceBounds();

  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <Box
      component="aside"
      aria-label={t('filters')}
      sx={{
        p: { xs: 2, md: 0 },
        mb: { xs: 2, md: 0 },
        border: { xs: '1px solid', md: 'none' },
        borderColor: 'divider',
        bgcolor: { xs: 'background.paper', md: 'transparent' },
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
        {t('filters')}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={t('searchAria')}
          size="small"
          value={value.q}
          onChange={(e) => update({ q: e.target.value })}
          fullWidth
        />

        <FormControl size="small" fullWidth>
          <InputLabel id="filter-category-label">{t('category')}</InputLabel>
          <Select
            labelId="filter-category-label"
            label={t('category')}
            value={value.category}
            onChange={(e) => update({ category: e.target.value })}
          >
            <MenuItem value="">{t('allCategories')}</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <TextField
            label={t('minPrice')}
            size="small"
            type="number"
            inputProps={{ min: 0, 'aria-label': t('minPrice') }}
            value={value.min}
            onChange={(e) => update({ min: e.target.value })}
            placeholder={String(bounds.min)}
            fullWidth
          />
          <TextField
            label={t('maxPrice')}
            size="small"
            type="number"
            inputProps={{ min: 0, 'aria-label': t('maxPrice') }}
            value={value.max}
            onChange={(e) => update({ max: e.target.value })}
            placeholder={String(bounds.max)}
            fullWidth
          />
        </Stack>

        <FormControl size="small" fullWidth>
          <InputLabel id="filter-sort-label">{t('sortBy')}</InputLabel>
          <Select
            labelId="filter-sort-label"
            label={t('sortBy')}
            value={value.sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            <MenuItem value="newest">{t('sortNewest')}</MenuItem>
            <MenuItem value="price-asc">{t('sortPriceAsc')}</MenuItem>
            <MenuItem value="price-desc">{t('sortPriceDesc')}</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={onClear}>
          {t('clearFilters')}
        </Button>
      </Stack>
    </Box>
  );
}

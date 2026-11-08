import { Box, CircularProgress, Typography } from '@mui/material';
import useLanguage from '../../hooks/useLanguage';

export default function PageLoader() {
  const { t } = useLanguage();
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'grid',
        placeItems: 'center',
        gap: 2,
      }}
      role="status"
      aria-live="polite"
    >
      <CircularProgress color="primary" />
      <Typography color="text.secondary">{t('loading')}</Typography>
    </Box>
  );
}

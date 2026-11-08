import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title="404" path="/404" />
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {t('pageNotFound')}
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          {t('backHome')}
        </Button>
      </Container>
    </>
  );
}

import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import siteConfig from '../config/siteConfig';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';

const POLICY_MAP = {
  'open-box-delivery': 'openBoxDelivery',
  'return-policy': 'returnPolicy',
};

export default function PolicyPage() {
  const { policySlug } = useParams();
  const { t, localize } = useLanguage();
  const key = POLICY_MAP[policySlug];
  const policy = key ? siteConfig.policies[key] : null;

  if (!policy) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Seo title={t('pageNotFound')} path={`/policies/${policySlug || ''}`} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t('pageNotFound')}
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          {t('backHome')}
        </Button>
      </Container>
    );
  }

  const title = localize(policy.title);

  return (
    <>
      <Seo title={title} path={`/policies/${policySlug}`} />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          {title}
        </Typography>
        {policy.sections.map((section) => (
          <Box key={localize(section.heading)} sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
              {localize(section.heading)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
            >
              {localize(section.body)}
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  );
}

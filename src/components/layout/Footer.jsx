import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import siteConfig from '../../config/siteConfig';
import useLanguage from '../../hooks/useLanguage';
import SocialLinks from '../common/SocialLinks';

export default function Footer() {
  const { t, localize, brandName } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 6,
        pb: 4,
        bgcolor: 'var(--color-ivory-dark)',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
        >
          <Box sx={{ maxWidth: 320 }}>
            {siteConfig.logoSrc ? (
              <Box
                component={RouterLink}
                to="/"
                sx={{ display: 'inline-flex', mb: 1.5, lineHeight: 0 }}
              >
                <Box
                  component="img"
                  src={siteConfig.logoSrc}
                  alt={siteConfig.logoAlt}
                  sx={{ height: 104, width: 'auto', borderRadius: '50%' }}
                />
              </Box>
            ) : (
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}
              >
                {brandName}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {localize(siteConfig.tagline)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {localize(siteConfig.contact.address)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {siteConfig.contact.phoneDisplay}
            </Typography>
          </Box>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('navShop')}
            </Typography>
            <Link component={RouterLink} to="/shop" underline="hover" color="text.secondary" variant="body2">
              {t('navShop')}
            </Link>
            <Link component={RouterLink} to="/about" underline="hover" color="text.secondary" variant="body2">
              {t('navAbout')}
            </Link>
            <Link component={RouterLink} to="/contact" underline="hover" color="text.secondary" variant="body2">
              {t('navContact')}
            </Link>
            <Link component={RouterLink} to="/faq" underline="hover" color="text.secondary" variant="body2">
              {t('navFaq')}
            </Link>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('navPolicies')}
            </Typography>
            <Link
              component={RouterLink}
              to="/policies/open-box-delivery"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {t('openBoxPolicy')}
            </Link>
            <Link
              component={RouterLink}
              to="/policies/return-policy"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {t('returnPolicy')}
            </Link>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('followUs')}
            </Typography>
            <SocialLinks />
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary">
          © {year} {brandName}. {t('footerRights')}
        </Typography>
      </Container>
    </Box>
  );
}

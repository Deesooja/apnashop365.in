import { Box, Container, Link, Stack, Typography } from '@mui/material';
import siteConfig from '../config/siteConfig';
import Seo from '../components/common/Seo';
import SocialLinks from '../components/common/SocialLinks';
import useLanguage from '../hooks/useLanguage';
import WhatsAppLinkBuilder from '../services/WhatsAppLinkBuilder';

export default function ContactPage() {
  const { t, localize, lang } = useLanguage();
  const wa = WhatsAppLinkBuilder.getGeneralChatUrl(lang);
  const hasMap = Boolean(siteConfig.contact.mapEmbedUrl);

  return (
    <>
      <Seo title={t('navContact')} path="/contact" />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          {t('contactHeading')}
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('address')}
            </Typography>
            <Typography color="text.secondary">
              {localize(siteConfig.contact.address)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('phone')}
            </Typography>
            <Link href={`tel:${siteConfig.contact.phoneTel}`} underline="hover">
              {siteConfig.contact.phoneDisplay}
            </Link>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              WhatsApp
            </Typography>
            <Link href={wa} target="_blank" rel="noopener noreferrer" underline="hover">
              {siteConfig.whatsapp.number}
            </Link>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('email')}
            </Typography>
            <Typography color="text.secondary">{siteConfig.contact.email}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
              {t('socials')}
            </Typography>
            <SocialLinks />
          </Box>
        </Stack>

        <Box
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            bgcolor: 'var(--color-ivory-dark)',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          {hasMap ? (
            <Box
              component="iframe"
              title="Store location map"
              src={siteConfig.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                px: 2,
                textAlign: 'center',
              }}
            >
              <Box>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {t('mapComingSoon')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  TODO: set contact.mapEmbedUrl in siteConfig.js
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

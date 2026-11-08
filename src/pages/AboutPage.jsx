import { Container, Typography } from '@mui/material';
import siteConfig from '../config/siteConfig';
import Seo from '../components/common/Seo';
import SocialLinks from '../components/common/SocialLinks';
import useLanguage from '../hooks/useLanguage';

export default function AboutPage() {
  const { t, localize } = useLanguage();
  const title = localize(siteConfig.about.title);

  return (
    <>
      <Seo title={t('navAbout')} description={localize(siteConfig.about.teaser)} path="/about" />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, mb: 4, fontSize: '1.05rem' }}
        >
          {localize(siteConfig.about.body)}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {t('followUs')}
        </Typography>
        <SocialLinks />
      </Container>
    </>
  );
}

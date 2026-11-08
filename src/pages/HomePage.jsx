import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HeroBanner from '../components/home/HeroBanner';
import ProductGrid from '../components/product/ProductGrid';
import LazyImage from '../components/common/LazyImage';
import SocialLinks from '../components/common/SocialLinks';
import Seo from '../components/common/Seo';
import ProductService from '../services/ProductService';
import siteConfig from '../config/siteConfig';
import useLanguage from '../hooks/useLanguage';
import WhatsAppLinkBuilder from '../services/WhatsAppLinkBuilder';

const iconMap = {
  Inventory2Outlined: Inventory2OutlinedIcon,
  AssignmentReturnOutlined: AssignmentReturnOutlinedIcon,
  PaymentsOutlined: PaymentsOutlinedIcon,
  WhatsApp: WhatsAppIcon,
};

export default function HomePage() {
  const { t, localize, lang } = useLanguage();
  const categories = ProductService.getAllCategories();
  const featured = ProductService.getFeaturedProducts();

  return (
    <>
      <Seo path="/" />
      <HeroBanner />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" component="h2">
            {t('shopByCategory')}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 2,
          }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.slug}
              component={RouterLink}
              to={`/category/${cat.slug}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover .cat-name': { color: 'primary.main' },
              }}
            >
              <LazyImage src={cat.image} alt={cat.name} aspectRatio="4 / 5" />
              <Typography
                className="cat-name"
                variant="subtitle1"
                sx={{
                  mt: 1,
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                {cat.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4" component="h2">
              {t('featured')}
            </Typography>
            <Button component={RouterLink} to="/shop" color="primary">
              {t('viewAll')}
            </Button>
          </Stack>
          <ProductGrid products={featured} />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
          {t('trustHeading')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {siteConfig.trustItems.map((item) => {
            const Icon = iconMap[item.icon] || Inventory2OutlinedIcon;
            const isWa = item.to === 'whatsapp';
            const linkProps = isWa
              ? {
                  component: 'a',
                  href: WhatsAppLinkBuilder.getGeneralChatUrl(lang),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : { component: RouterLink, to: item.to };

            return (
              <Box
                key={item.id}
                {...linkProps}
                sx={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  py: 2,
                  px: 1,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Icon sx={{ fontSize: 36, color: 'secondary.main', mb: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  {localize(item.title)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>

      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background:
            'linear-gradient(135deg, rgba(92,26,27,0.08), rgba(196,163,90,0.12))',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            {t('aboutTeaserHeading')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, fontSize: { md: '1.1rem' } }}>
            {localize(siteConfig.about.teaser)}
          </Typography>
          <Button component={RouterLink} to="/about" variant="outlined" color="primary">
            {t('learnMore')}
          </Button>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <SocialLinks />
          </Box>
        </Container>
      </Box>
    </>
  );
}

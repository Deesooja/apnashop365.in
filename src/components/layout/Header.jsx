import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import siteConfig from '../../config/siteConfig';
import useLanguage from '../../hooks/useLanguage';
import { selectCartCount } from '../../store/cartSlice';
import { openCartDrawer } from '../../store/uiSlice';
import WhatsAppLinkBuilder from '../../services/WhatsAppLinkBuilder';

const navLinks = [
  { to: '/', key: 'navHome' },
  { to: '/shop', key: 'navShop' },
  { to: '/about', key: 'navAbout' },
  { to: '/contact', key: 'navContact' },
  { to: '/faq', key: 'navFaq' },
];

export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { t, lang, toggleLang, brandName } = useLanguage();
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const whatsappHref = WhatsAppLinkBuilder.getGeneralChatUrl(lang);

  const submitSearch = (event) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setMenuOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            gap: 1,
            minHeight: { xs: 80, md: 104 },
            px: { xs: 1.5, md: 3 },
          }}
        >
          {!isMdUp ? (
            <IconButton
              edge="start"
              aria-label={t('menuAria')}
              onClick={() => setMenuOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'primary.main',
              letterSpacing: '-0.02em',
              flexShrink: 0,
              mr: { md: 2 },
              display: 'flex',
              alignItems: 'center',
              lineHeight: 0,
            }}
          >
            {siteConfig.logoSrc ? (
              <Box
                component="img"
                src={siteConfig.logoSrc}
                alt={siteConfig.logoAlt}
                sx={{
                  height: { xs: 64, md: 88 },
                  width: 'auto',
                  display: 'block',
                  borderRadius: '50%',
                }}
              />
            ) : (
              brandName
            )}
          </Typography>

          {isMdUp ? (
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {t(link.key)}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Box sx={{ flexGrow: 1 }} />
          )}

          {isMdUp ? (
            <Box
              component="form"
              onSubmit={submitSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'var(--color-ivory-dark)',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                minWidth: 220,
                mr: 1,
              }}
            >
              <SearchIcon fontSize="small" color="action" aria-hidden />
              <InputBase
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                inputProps={{ 'aria-label': t('searchAria') }}
                sx={{ ml: 1, flex: 1, fontSize: 14 }}
              />
            </Box>
          ) : null}

          <IconButton
            aria-label={t('languageAria')}
            onClick={toggleLang}
            color="inherit"
            size="small"
            sx={{ fontWeight: 700, fontSize: 13, minWidth: 40 }}
          >
            {lang === 'en' ? 'हिं' : 'EN'}
          </IconButton>

          <IconButton
            component="a"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('whatsappAria')}
            color="inherit"
          >
            <WhatsAppIcon />
          </IconButton>

          <IconButton
            aria-label={t('cartAria')}
            color="inherit"
            onClick={() => dispatch(openCartDrawer())}
          >
            <Badge badgeContent={cartCount} color="secondary" max={99}>
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{ sx: { width: Math.min(320, typeof window !== 'undefined' ? window.innerWidth : 320) } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {siteConfig.logoSrc ? (
            <Box
              component="img"
              src={siteConfig.logoSrc}
              alt={siteConfig.logoAlt}
              sx={{ height: 56, width: 'auto', borderRadius: '50%' }}
            />
          ) : (
            <Typography variant="h6" color="primary" sx={{ fontFamily: '"Playfair Display", serif' }}>
              {brandName}
            </Typography>
          )}
          <IconButton aria-label={t('closeMenuAria')} onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="form" onSubmit={submitSearch} sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'var(--color-ivory-dark)',
              px: 1.5,
              py: 0.75,
              borderRadius: 1,
            }}
          >
            <SearchIcon fontSize="small" color="action" />
            <InputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              inputProps={{ 'aria-label': t('searchAria') }}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.to}
              component={RouterLink}
              to={link.to}
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText primary={t(link.key)} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

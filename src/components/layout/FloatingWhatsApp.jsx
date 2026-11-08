import { Fab, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useSelector } from 'react-redux';
import useLanguage from '../../hooks/useLanguage';
import WhatsAppLinkBuilder from '../../services/WhatsAppLinkBuilder';
import { selectCartDrawerOpen } from '../../store/uiSlice';

export default function FloatingWhatsApp() {
  const { t, lang } = useLanguage();
  const drawerOpen = useSelector(selectCartDrawerOpen);
  const href = WhatsAppLinkBuilder.getGeneralChatUrl(lang);

  return (
    <Zoom in={!drawerOpen}>
      <Fab
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('floatingWhatsApp')}
        color="success"
        sx={{
          position: 'fixed',
          right: { xs: 16, md: 24 },
          bottom: {
            xs: 'calc(16px + env(safe-area-inset-bottom, 0px))',
            md: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          },
          zIndex: (theme) => theme.zIndex.speedDial,
          bgcolor: '#25D366',
          color: '#fff',
          '&:hover': { bgcolor: '#1ebe57' },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Zoom>
  );
}

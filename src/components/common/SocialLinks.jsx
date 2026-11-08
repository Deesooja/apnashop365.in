import { IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import siteConfig from '../../config/siteConfig';

const links = [
  { key: 'instagram', href: siteConfig.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { key: 'facebook', href: siteConfig.social.facebook, Icon: FacebookIcon, label: 'Facebook' },
  { key: 'youtube', href: siteConfig.social.youtube, Icon: YouTubeIcon, label: 'YouTube' },
];

export default function SocialLinks({ size = 'medium' }) {
  return (
    <Stack direction="row" spacing={0.5}>
      {links.map(({ key, href, Icon, label }) => (
        <IconButton
          key={key}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          size={size}
          color="primary"
        >
          <Icon fontSize="inherit" />
        </IconButton>
      ))}
    </Stack>
  );
}

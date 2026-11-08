import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import siteConfig from '../../config/siteConfig';
import useLanguage from '../../hooks/useLanguage';
import WhatsAppLinkBuilder from '../../services/WhatsAppLinkBuilder';

const AUTO_MS = 5500;

export default function HeroBanner() {
  const slides = siteConfig.heroSlides;
  const { localize, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const go = (next) => {
    setIndex((prev) => {
      const len = slides.length;
      return (prev + next + len) % len;
    });
  };

  useEffect(() => {
    const tick = () => {
      setIndex((prev) => (prev + 1) % slides.length);
    };
    timerRef.current = setInterval(tick, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_MS);
  };

  const slide = slides[index];
  const ctaIsWhatsApp = slide.ctaTo === 'whatsapp';
  const ctaHref = ctaIsWhatsApp
    ? WhatsAppLinkBuilder.getGeneralChatUrl(lang)
    : slide.ctaTo;

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="Hero"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].screenX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].screenX - touchStartX.current;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '70vh', md: '78vh' },
        minHeight: 420,
        overflow: 'hidden',
        bgcolor: 'primary.dark',
      }}
    >
      {slides.map((item, i) => (
        <Box
          key={item.id}
          aria-hidden={i !== index}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.7s ease',
            backgroundImage: `linear-gradient(90deg, rgba(43,33,24,0.55), rgba(43,33,24,0.2)), url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: { xs: 2.5, md: 8 },
          pb: { xs: 5, md: 8 },
          pt: 8,
          maxWidth: 900,
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            color: '#fff',
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' },
            lineHeight: 1.1,
            mb: 3,
            textShadow: '0 2px 24px rgba(0,0,0,0.35)',
          }}
        >
          {localize(slide.headline)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          {...(ctaIsWhatsApp
            ? {
                component: 'a',
                href: ctaHref,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : { component: RouterLink, to: ctaHref })}
          sx={{ alignSelf: 'flex-start', px: 3 }}
        >
          {localize(slide.ctaLabel)}
        </Button>
      </Box>

      <IconButton
        aria-label="Previous slide"
        onClick={() => go(-1)}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.25)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        aria-label="Next slide"
        onClick={() => go(1)}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.25)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {slides.map((item, i) => (
          <Box
            key={item.id}
            component="button"
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              bgcolor: i === index ? 'secondary.main' : 'rgba(255,255,255,0.55)',
              transition: 'width 0.25s ease',
              p: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

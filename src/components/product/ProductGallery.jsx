import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import LazyImage from '../common/LazyImage';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const safeIndex = Math.min(active, Math.max(images.length - 1, 0));
  const current = images[safeIndex];

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <LazyImage
          src={current}
          alt={`${name} — image ${safeIndex + 1}`}
          aspectRatio="1 / 1"
        />
        <IconButton
          aria-label="Zoom image"
          onClick={() => setZoomed(true)}
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            bgcolor: 'rgba(247,241,232,0.9)',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ZoomInIcon />
        </IconButton>
      </Box>

      {images.length > 1 ? (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: 1.5,
            overflowX: 'auto',
            pb: 0.5,
          }}
        >
          {images.map((src, index) => (
            <Box
              key={src + index}
              component="button"
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === safeIndex}
              sx={{
                border: '2px solid',
                borderColor: index === safeIndex ? 'primary.main' : 'transparent',
                p: 0,
                bgcolor: 'transparent',
                cursor: 'pointer',
                flex: '0 0 72px',
                width: 72,
              }}
            >
              <LazyImage src={src} alt="" aspectRatio="1 / 1" />
            </Box>
          ))}
        </Box>
      ) : null}

      {zoomed ? (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product image"
          onClick={() => setZoomed(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setZoomed(false);
          }}
          tabIndex={-1}
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.85)',
            zIndex: (theme) => theme.zIndex.modal,
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <IconButton
            aria-label="Close zoom"
            onClick={() => setZoomed(false)}
            sx={{ position: 'absolute', top: 16, right: 16, color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={current}
            alt={name}
            onClick={(e) => e.stopPropagation()}
            sx={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
}

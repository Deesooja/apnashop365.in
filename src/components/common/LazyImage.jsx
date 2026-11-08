import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Lazy-loaded image with fixed aspect ratio to avoid layout shift.
 */
export default function LazyImage({
  src,
  alt,
  aspectRatio = '1 / 1',
  borderRadius = 0,
  objectFit = 'cover',
  sx = {},
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        borderRadius,
        bgcolor: 'var(--color-ivory-dark)',
        ...sx,
      }}
    >
      {!loaded && !error ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }}
        />
      ) : null}
      {!error ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'text.secondary',
            fontSize: 14,
            px: 2,
            textAlign: 'center',
          }}
        >
          {alt || 'Image'}
        </Box>
      )}
    </Box>
  );
}

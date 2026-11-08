import { Helmet } from 'react-helmet-async';
import siteConfig from '../../config/siteConfig';
import useLanguage from '../../hooks/useLanguage';

/**
 * Per-page title, meta, and Open Graph tags.
 * `image` may be an absolute URL or a path under the site.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  jsonLd,
}) {
  const { localize, lang } = useLanguage();
  const pageTitle = title
    ? siteConfig.seo.titleTemplate.replace('%s', title)
    : siteConfig.seo.defaultTitle;
  const desc = description || localize(siteConfig.seo.defaultDescription);
  const url = `${siteConfig.siteUrl}${path === '/' ? '' : path}`;

  let ogImage = `${siteConfig.siteUrl}${siteConfig.seo.ogImage}`;
  if (image) {
    ogImage = image.startsWith('http')
      ? image
      : `${siteConfig.siteUrl}${image}`;
  }

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.brandName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

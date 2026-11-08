import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import siteConfig from '../config/siteConfig';
import Seo from '../components/common/Seo';
import useLanguage from '../hooks/useLanguage';

export default function FaqPage() {
  const { t, localize } = useLanguage();

  return (
    <>
      <Seo title={t('navFaq')} path="/faq" />
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          {t('faqHeading')}
        </Typography>
        {siteConfig.faq.map((item) => (
          <Accordion
            key={item.id}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: 'transparent',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              <Typography fontWeight={600}>{localize(item.question)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {localize(item.answer)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
}

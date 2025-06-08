import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the Sign Up button at the top right corner and fill out the registration form with your details.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. You can select your preferred payment method at checkout.",
  },
  {
    question: "Can I change my subscription plan later?",
    answer:
      "Yes, you can upgrade or downgrade your subscription plan anytime from your account settings without losing your data.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "If you forget your password, click on the 'Forgot Password' link on the login page and follow the instructions to reset it via email.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "We take your privacy seriously and use advanced encryption to protect your data. For more details, please see our Privacy Policy.",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {faqData.map(({ question, answer }, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;

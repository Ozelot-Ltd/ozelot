import { Html, Head, Container, Font, Heading } from '@react-email/components';
import * as React from 'react';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

export default function ContactFormMain(formData: FormData) {
  const { name, newsletter } = formData;
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Host Grotesk"
          fallbackFontFamily={['Arial', 'Helvetica', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container style={body}>
        <Container>
          <Heading style={mainHeading}>THANKS {name} FOR YOUR INTEREST</Heading>
        </Container>
        {newsletter === 'yes' ? (
          <Container>
            And thanks for subscribing to our newsletter! We will keep you
            updated with the latest news and offers.
          </Container>
        ) : null}
      </Container>
    </Html>
  );
}

const mainHeading = {
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
  fontWeight: 400,
};

const body = {
  backgroundColor: 'rgba(247, 247, 247, 0.2)',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
  color: '#545454',
};

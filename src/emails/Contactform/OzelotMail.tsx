import {
  Html,
  Head,
  Container,
  Font,
  Heading,
  Text,
} from '@react-email/components';
import * as React from 'react';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const Spacer = () => (
  <Container style={{ height: '24px', width: '100%' }}></Container>
);

export default function OzelotMail(formData: FormData) {
  const { name, surname, message, email, newsletter } = formData;

  return (
    <Html style={html}>
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
      <Container>
        <Heading>
          Request by {name} {surname}
          <Spacer />
          email: {email}
        </Heading>
        <Spacer />
        <Container>
          <Text>
            {message}
            <Spacer />
            {name} {surname} has {newsletter ? '' : 'not '}subscribed to the
            newsletter.
          </Text>
        </Container>
      </Container>
    </Html>
  );
}

const html = {
  height: '100%',
  width: '100%',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
};

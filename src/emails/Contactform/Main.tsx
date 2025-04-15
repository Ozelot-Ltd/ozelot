import { Html, Head, Container, Font } from '@react-email/components';
import * as React from 'react';

export default function Email() {
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
          <h1
            style={{
              fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
              fontWeight: 400,
            }}
          >
            Hey there, thanks for reaching out!
          </h1>
        </Container>
      </Container>
    </Html>
  );
}

const body = {
  backgroundColor: 'rgba(247, 247, 247, 0.2)',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
};

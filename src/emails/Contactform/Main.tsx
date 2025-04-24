import {
  Html,
  Head,
  Container,
  Font,
  Heading,
  Text,
  Img,
  Link,
} from '@react-email/components';
import * as React from 'react';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const Spacer = () => <Container style={{ height: '24px' }}></Container>;

export default function ContactFormMain(formData: FormData) {
  const { name, newsletter } = formData;

  console.log(newsletter);

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
      <Container style={body}>
        <Container>
          <Heading style={mainHeading}>THANKS</Heading>
          <Heading style={mainHeading}>FOR</Heading>
          <Heading style={mainHeading}>REACHING</Heading>
          <Heading style={mainHeading}>OUT!</Heading>
        </Container>
        <Spacer />
        <Container>
          <Text style={text}>
            Hi {name ? name : 'there'},<br />
            <br />
            We’ve received your request and will get back to you shortly. In the
            meantime, feel free to check out our socials and give us a follow to
            stay up to date and see what we’re up to:
          </Text>
        </Container>{' '}
        <Spacer />
        <Container>
          <Link href="https://www.instagram.com/ozelotltd/?hl=de">
            <Img
              src="https://ozelot.cdn.prismic.io/ozelot/Z_OTnXdAxsiBwYeU_insta.svg"
              alt="Instagram"
              width="24"
              height="24"
            />
          </Link>{' '}
          <Link href="https://www.instagram.com/ozelotltd/?hl=de">
            <Img
              src="https://ozelot.cdn.prismic.io/ozelot/Z_OTnXdAxsiBwYeU_insta.svg"
              alt="Instagram"
              width="24"
              height="24"
            />
          </Link>
          <Link href="https://www.instagram.com/ozelotltd/?hl=de">
            <Img
              src="https://ozelot.cdn.prismic.io/ozelot/Z_OTnXdAxsiBwYeU_insta.svg"
              alt="Instagram"
              width="24"
              height="24"
            />
          </Link>
        </Container>
        <Spacer />
      </Container>
    </Html>
  );
}

const html = {
  height: '100%',
  width: '100%',
  padding: '0px',
  margin: '0px',
  background: `url(
    'https://images.prismic.io/ozelot/aAoCQ_IqRLdaBkLI_mailbg.png?auto=format,compress'
  )`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
};

const body = {
  padding: '12px',
  margin: 'auto',
  color: '#545454',
  maxWidth: '600px',
};

const mainHeading = {
  fontWeight: 600,
  margin: '0px',
  padding: '0px',
  fontSize: '60px',
  lineHeight: '60px',
};

const text = {
  fontWeight: 400,
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  fontSize: '16px',
  lineHeight: '20px',
};

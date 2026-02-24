import {
  Html,
  Head,
  Container,
  Font,
  Heading,
  Text,
  Img,
  Link,
  Row,
  Column
} from '@react-email/components';

import { mailSocials } from './mailSocials';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const Spacer = () => (
  <Container style={{ height: '24px', width: '100%' }}></Container>
);
const SmallSpacer = () => <Container style={{ height: '0px' }}></Container>;

export default function ContactFormMain(formData: FormData) {
  const { name } = formData;

  return (
    <Html style={html}>
      <Head>
        <Font
          fontFamily="Host Grotesk"
          fallbackFontFamily={['Arial', 'Helvetica', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;700&display=swap',
            format: 'woff2'
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
        <Spacer />
        <Container>
          <Text style={greeting}>Hi {name ? name : 'there'}!</Text>
          <SmallSpacer />
          <SmallSpacer />
          <Text style={text}>
            We’ve received your request and will get back to you shortly. In the
            meantime, feel free to check out our socials and give us a follow to
            stay up to date and see what we’re up to:
          </Text>
        </Container>{' '}
        <Spacer />
        <Spacer />
        <Container style={{ width: '100%' }}>
          <Row style={{ width: 'fit-content' }}>
            {mailSocials.map((social, index) => (
              <Column key={index}>
                <Link href={social.href}>
                  <Img
                    src={social.url}
                    alt={social.alt}
                    style={{ margin: '0px 12px' }}
                    width="28px"
                    height="28px"
                  />
                </Link>
              </Column>
            ))}
          </Row>
        </Container>{' '}
        <Spacer />
        <Spacer />
        <Container>
          <Img
            src="https://images.prismic.io/ozelot/aG-jtEMqNJQqHwFb_gifprojects.gif?auto=format,compress"
            alt="Ozelot Projects Gif"
            style={{ margin: 'auto' }}
          />
        </Container>
        <Spacer />
        <Spacer />
        <Container>
          <Container>
            <Text style={text}>
              As of 2025, Ozelot keeps on expanding and evoling. We are working
              on new projects and collaborations, and we are excited to share
              them with you. If you have any questions or further inquiries,
              please don’t hesitate to reach out via studio@ozelot.ltd. We are
              always happy to help and support you in any way we can. We wish
              you a pleasant day!
            </Text>{' '}
            <Spacer />
            <Row>
              <Column style={{ width: '100%' }}>
                <Text style={text}>Your Ozelot Team</Text>
              </Column>
              <Column style={{ width: 'fit-content' }}>
                <Img
                  src="https://images.prismic.io/ozelot/Z6oYmpbqstJ9-b2C_Ozelot_Logo_Final_StefanoBona_2022.png?auto=format,compress"
                  height={'64px'}
                  width={'64px'}
                  alt="Ozelot Logo"
                />
              </Column>
            </Row>
          </Container>
        </Container>{' '}
        <Spacer />
        <Spacer />
        <Container style={footer}>
          <Container style={{ width: '100%' }}>
            <Text style={{ ...text, textAlign: 'center' }}>
              Ozelot Ltd. | 2025 | All rights reserved
            </Text>
          </Container>
          <Spacer />
          <Container style={{ width: '100%' }}>
            <Text
              style={{
                ...addressStyle,
                fontWeight: '600',
                fontSize: '16px',
                width: '100%'
              }}
            >
              Ozelot Studios
            </Text>
            <Text
              style={{
                ...addressStyle,
                fontWeight: '300',
                fontSize: '12px',
                width: '100%'
              }}
            >
              Flüelastrasse 6
            </Text>
            <Text
              style={{ ...addressStyle, fontWeight: '300', fontSize: '12px' }}
            >
              CH - 8048 Zurich
            </Text>
            <Text
              style={{ ...addressStyle, fontWeight: '300', fontSize: '12px' }}
            >
              studio@ozelot.ltd
            </Text>
          </Container>
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
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif'
};

const body = {
  padding: '48px 12px',
  margin: 'auto',
  maxWidth: '700px',
  backgroundColor: 'rgba(247, 247, 247,1)',
  backgroundImage:
    'url(https://images.prismic.io/ozelot/aAoCQ_IqRLdaBkLI_mailbg.png?auto=format,compress)'
};

const mainHeading = {
  fontWeight: 800,
  margin: '0px',
  padding: '0px',
  fontSize: '54px',
  lineHeight: '60px',
  color: '#545454'
};

const greeting = {
  fontWeight: 600,
  margin: '0px',
  padding: '0px',
  fontSize: '20px',
  lineHeight: '24px',
  color: '#545454'
};

const text = {
  fontWeight: 300,
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  fontSize: '14px',
  lineHeight: '24px',
  color: '#545454'
};

const footer = {
  paddingTop: '24px',
  marignTop: '24px',
  borderTop: '1px solid #545454'
};

const addressStyle = {
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  color: '#545454',
  lineHeight: '8px'
};

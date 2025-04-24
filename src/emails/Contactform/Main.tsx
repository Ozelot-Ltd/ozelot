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
  Column,
} from '@react-email/components';
import * as React from 'react';

import { mailSocials } from './mailSocials';
import { projectLinks } from './projectLinks';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const Spacer = () => <Container style={{ height: '24px' }}></Container>;
const SmallSpacer = () => <Container style={{ height: '0px' }}></Container>;

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
        <Spacer />
        <Container>
          <Text style={text}>Hi {name ? name : 'there'}!</Text>
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
                    width="30"
                    height="30"
                  />
                </Link>
              </Column>
            ))}
          </Row>
        </Container>{' '}
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Container>
          <Container>
            <Heading style={subHeading}>WHAT IS</Heading>
            <Heading style={subHeading}>OZELOT?</Heading>
          </Container>
          <SmallSpacer />
          <Container>
            <Text style={text}>
              Ozelot Studios is a multidisciplinary creative powerhouse
              dedicated to challenging norms and evoking new perspectives. We
              reshape experiences by pushing creative and cultural boundaries
              that spark curiosity and leave lasting impressions.
            </Text>
          </Container>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Container>
            <Img
              src="https://images.prismic.io/ozelot/aAo5kfIqRLdaBk6B_merch.gif?auto=format,compress"
              alt="Exxodus Merch"
              style={{ margin: 'auto' }}
            />
          </Container>
        </Container>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Container>
          <Container>
            <Heading style={subHeading}>OZELOT</Heading>
            <Heading style={subHeading}>STUDIOS</Heading>
          </Container>
          <SmallSpacer />
          <Container>
            <Text style={text}>
              We offer a variety of services and are therefore able to combine
              differenet disciplines to products that are cool through and
              through. We offer a variety of services and are therefore able to
              combine differenet disciplines to products that are cool through
              and through.
            </Text>
            <SmallSpacer />
            <Text style={text}>
              If you need some impressions, feel free to visit our website check
              out our past works:
            </Text>
          </Container>
          <Spacer />
          <Spacer />
          <Container>
            {projectLinks.map((project, index) => (
              <Container
                style={{
                  width: 'fit-content',
                }}
                key={index}
              >
                <Link href={project.href} style={projectLink}>
                  <Row>
                    <Column>
                      <Text style={indexStyle}>{project.number}</Text>
                    </Column>
                    <Column>
                      <Text style={projectName}>{project.name}</Text>
                    </Column>
                    <Column>
                      <Img
                        src="https://images.prismic.io/ozelot/aApD__IqRLdaBlF8_arrow.png?auto=format,compress"
                        alt="Arrow"
                        width="24"
                        height="24"
                      />
                    </Column>
                  </Row>
                </Link>
              </Container>
            ))}
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
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
  color: '#545454',
  backgroundColor: '#545454',
};

const body = {
  padding: '48px 12px',
  margin: 'auto',
  maxWidth: '700px',
  borderLeft: '1px solid #545454',
  borderRight: '1px solid #545454',
  backgroundColor: '#fff',
};

const mainHeading = {
  fontWeight: 600,
  margin: '0px',
  padding: '0px',
  fontSize: '60px',
  lineHeight: '60px',
};

const subHeading = {
  fontWeight: 600,
  margin: '0px',
  padding: '0px',
  fontSize: '42px',
  lineHeight: '42px',
};

// const greeting = {
//   fontWeight: 600,
//   margin: '0px',
//   padding: '0px',
//   fontSize: '20px',
//   lineHeight: '24px',
// };

const text = {
  fontWeight: 300,
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  fontSize: '16px',
  lineHeight: '20px',
  width: '90%',
};

const projectName = {
  fontSize: '24px',
  fontWeight: 600,
  color: '#545454',
  padding: '0px 12px',
};

const projectLink = {
  padding: '0',
  lineHeight: '0px',
  backgroundColor: '#fff',
  textDecoration: 'none',
  display: 'block',
  borderBottom: '1px solid #545454',
};

const indexStyle = {
  fontSize: '8px',
  color: '#545454',
};

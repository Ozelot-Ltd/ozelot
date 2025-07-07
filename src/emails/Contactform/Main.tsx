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
// import { projectLinks } from './projectLinks';
// import { mailReleases } from './mailReleases';

import { FormData } from '@/app/components/SectionComponents/ContactComponent/components/ContactForm';

const Spacer = () => (
  <Container style={{ height: '24px', width: '100%' }}></Container>
);
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
            src="https://images.prismic.io/ozelot/aAo5kfIqRLdaBk6B_merch.gif?auto=format,compress"
            alt="Exxodus Merch"
            style={{ margin: 'auto' }}
          />
        </Container>
        <Spacer />
        <Spacer />
        {/* <Container>
          <Container>
            <Heading style={subHeading}>WHAT IS</Heading>
            <Heading style={subHeading}>OZELOT LTD.?</Heading>
          </Container>
          <SmallSpacer />
          <SmallSpacer />
          <Container>
            <Text style={text}>
              Ozelot Ltd. is a multidisciplinary creative powerhouse dedicated
              to challenging norms and evoking new perspectives. We reshape
              experiences by pushing creative and cultural boundaries that spark
              curiosity and leave lasting impressions.
            </Text>
          </Container>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
     
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
          <SmallSpacer />
          <Container>
            <Text style={text}>
              Collaboration drives everything we do. We partner with like-minded
              brands, artists, and visionaries to co-create bold solutions that
              engage and transform. From tailored creative direction to
              innovative brand experiences, we shape identities and tell
              compelling stories that resonate.
            </Text>
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
                  width: '100%',
                }}
                key={index}
              >
                <Link href={project.href} style={projectLink}>
                  <Row>
                    <Column style={{ width: '5%' }}>
                      <Text style={indexStyle}>{project.number}</Text>
                    </Column>
                    <Column style={{ width: '85%' }}>
                      <Text style={projectName}>{project.name}</Text>
                    </Column>
                    <Column style={{ width: '10%' }}>
                      <Img
                        src="https://images.prismic.io/ozelot/aAtpcvIqRLdaBnH0_arrow.png?auto=format,compress"
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
        </Container>{' '}
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Container>
          <Container>
            <Heading style={subHeading}>OZELOT</Heading>
            <Heading style={subHeading}>RECORDS</Heading>
          </Container>
          <SmallSpacer />
          <SmallSpacer />
          <Container>
            <Text style={text}>
              Ozelot started in 2016 as an electronic music record label, Ozelot
              Records, releasing vinyl records and crafting a unique visual
              identity for each cover. Alongside music production, we organized
              events and label nights, building a creative community around our
              sound.
            </Text>{' '}
            <SmallSpacer />
            <SmallSpacer />
            <Text style={text}>
              If you’re interested in our musical journey, go have a listen to
              our releases and let us know what you think!
            </Text>
          </Container>
          <Spacer />
          <Spacer />
          <Container>
            {mailReleases.map((release, index) => (
              <Container
                style={{
                  width: '100%',
                  marginTop: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #545454',
                }}
                key={index}
              >
                <Row>
                  <Column style={{ width: '15%' }}>
                    <Img
                      src={release.imageURL}
                      alt="Arrow"
                      width="64px"
                      height="64px"
                    />
                  </Column>
                  <Column style={{ width: '80%' }}>
                    <Text style={projectName}>{release.name}</Text>
                  </Column>
                  <Column
                    style={{
                      width: 'fit-content',
                    }}
                  >
                    <Row>
                      <Column>
                        <Link href={release.bandcamp}>
                          <Img
                            src="https://images.prismic.io/ozelot/aAuGuPIqRLdaBnda_bandcamp.png?auto=format,compress"
                            alt="Arrow"
                            width="24px"
                            height="24px"
                            style={{ paddingRight: '12px' }}
                          />
                        </Link>
                      </Column>
                      <Column>
                        <Link href={release.spotify}>
                          <Img
                            src="https://images.prismic.io/ozelot/aAuGAfIqRLdaBncw_spotify.png?auto=format,compress"
                            alt="Arrow"
                            width="24px"
                            height="24px"
                          />
                        </Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Container>
            ))}
            <Spacer />
            <Container
              style={{
                width: 'fit-content',
                margin: '0',
                paddingTop: '12px',
              }}
            >
              <Link href="https://ozelot-ltd.bandcamp.com/">
                <Row>
                  <Column>
                    <Text style={seeMoreText}>SEE MORE ON OUR BANDCAMP</Text>
                  </Column>
                  <Column>
                    <Img
                      src="https://images.prismic.io/ozelot/aAtpcvIqRLdaBnH0_arrow.png?auto=format,compress"
                      alt="Arrow"
                      width="14px"
                      height="14px"
                      style={{ paddingLeft: '12px' }}
                    />
                  </Column>
                </Row>
              </Link>
            </Container>
          </Container>
        </Container>{' '}
        <Spacer />
        <Spacer /> */}
        <Container>
          <Container>
            <Text style={text}>
              As of 2025, Ozelot keeps on expanding and evoling. We are working
              on new projects and collaborations, and we are excited to share
              them with you. If you have any questions or further inquiries,
              please don’t hesitate to reach out via info@ozelot.ltd. We are
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
                width: '100%',
              }}
            >
              Ozelot Studios
            </Text>
            <Text
              style={{
                ...addressStyle,
                fontWeight: '300',
                fontSize: '12px',
                width: '100%',
              }}
            >
              Martastrasse 114
            </Text>
            <Text
              style={{ ...addressStyle, fontWeight: '300', fontSize: '12px' }}
            >
              CH - 8003 Zurich
            </Text>
            <Text
              style={{ ...addressStyle, fontWeight: '300', fontSize: '12px' }}
            >
              info@ozelot.ltd
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
  fontFamily: 'Host Grotesk, Arial, Helvetica, sans-serif',
};

const body = {
  padding: '48px 12px',
  margin: 'auto',
  maxWidth: '700px',
  backgroundColor: 'rgba(247, 247, 247,1)',
};

const mainHeading = {
  fontWeight: 800,
  margin: '0px',
  padding: '0px',
  fontSize: '54px',
  lineHeight: '60px',
  color: '#545454',
};

// const subHeading = {
//   fontWeight: 600,
//   margin: '0px',
//   padding: '0px',
//   fontSize: '36px',
//   lineHeight: '42px',
//   color: '#545454',
// };

const greeting = {
  fontWeight: 600,
  margin: '0px',
  padding: '0px',
  fontSize: '20px',
  lineHeight: '24px',
  color: '#545454',
};

const text = {
  fontWeight: 300,
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  fontSize: '14px',
  lineHeight: '24px',
  color: '#545454',
};

// const projectName = {
//   fontSize: '20px',
//   fontWeight: 600,
//   color: '#545454',
//   padding: '0px 12px',
// };

// const projectLink = {
//   padding: '0',
//   lineHeight: '0px',
//   textDecoration: 'none',
//   display: 'block',
//   borderBottom: '1px solid #545454',
//   backgroundColor: 'rgba(247, 247, 247,1)',
//   color: '#545454',
// };

// const indexStyle = {
//   fontSize: '8px',
//   color: '#545454',
// };

// const seeMoreText = {
//   fontWeight: 300,
//   margin: '0px',
//   padding: '0px',
//   fontSize: '14px',
//   color: '#545454',
// };

// const catalogStyle = {
//   fontSize: '12px',
//   width: 'fit-content',
//   color: '#545454',
// };

const footer = {
  paddingTop: '24px',
  marignTop: '24px',
  borderTop: '1px solid #545454',
};

const addressStyle = {
  margin: '0px',
  padding: '0px',
  paddingTop: '12px',
  color: '#545454',
  lineHeight: '8px',
};

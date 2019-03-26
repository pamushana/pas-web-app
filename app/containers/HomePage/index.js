/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Form,
  Input,
  Select,
  Menu,
  Responsive,
  Segment,
  TextArea,
  Statistic,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import Logo from 'images/logo.png';
import LogoTransparent from 'images/logoTransparent.png';
import LogoOnly from 'images/logoOnly.png';
import Cover from 'images/academy.jpg';
import Brown from 'images/brown.jpg';
import PropertySecurity from 'images/propertySecurity.jpg';
import Cctv from 'images/cctv.jpg';
import EventSecurity from 'images/eventSecurity.jpg';
import ArmoredTruck from 'images/armored.png';
import Bodyguard from 'images/bodyguard.jpg';
import Tracking from 'images/tracking.jpg';
import messages from './messages';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
/* eslint-disable react/prefer-stateless-function */
const fadeInAnimation = keyframes`${fadeIn}`;
const HeaderContainer = ({ className, children }) => (
  <Container
    style={{
      background: 'rgba(255,255,255,.7)',
      paddingBottom: 10,
      borderRadius: 10,
    }}
    text
    className={className}
  >
    {children}
  </Container>
);
HeaderContainer.propTypes = {
  className: PropTypes.object,
  children: PropTypes.object,
};

const FadingContainer = styled(HeaderContainer)`
  animation: 5s ${fadeInAnimation};
`;

const HomepageHeading = ({ mobile }) => (
  <FadingContainer>
    <Image
      src={LogoOnly}
      size="small"
      centered
      style={{ marginBottom: 0, marginTop: mobile ? '1.5em' : '10em' }}
    />
    <Header
      as="h1"
      content="CrimeStoppers"
      // inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '0em' : '0em',
      }}
    />
    <Header
      as="h2"
      content="Trusted. Everyday. Everywhere."
      // inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0em' : '0em',
      }}
    />
    <Button as="a" href="tel:+263773205674" animated="fade" color="facebook">
      <Button.Content visible>24/7 Emergency Call Support</Button.Content>
      <Button.Content hidden>Get in touch</Button.Content>
    </Button>
  </FadingContainer>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {
    active: 'Home',
  };

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            id="Home"
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: '1em 0em',
              backgroundImage: `url(${Cover})`,
              backgroundSize: 'cover',
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              // pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item>
                  <Image src={LogoTransparent} size="mini" />
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href="#Home"
                  active={this.state.active === 'Home'}
                  onClick={() => this.setState({ active: 'Home' })}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href="#Company"
                  active={this.state.active === 'Company'}
                  onClick={() => this.setState({ active: 'Company' })}
                >
                  Company
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href="#Services"
                  active={this.state.active === 'Services'}
                  onClick={() => this.setState({ active: 'Services' })}
                >
                  Services
                </Menu.Item>
                <Menu.Item
                  as="a"
                  href="#Contact"
                  active={this.state.active === 'Contact'}
                  onClick={() => this.setState({ active: 'Contact' })}
                >
                  Contact
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    icon
                    labelPosition="left"
                    as="a"
                    href="mailto:security@pamushanaafrica.com?Subject=CrimeStoppers%20Information%20Request"
                  >
                    <Icon name="mail" />
                    security@pamushanaafrica.com
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = event => {
    const { scrollTop } = event.srcElement.body;
    console.log(scrollTop);
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            as="a"
            href="#Home"
            active
            onClick={this.handleSidebarHide}
          >
            Home
          </Menu.Item>
          <Menu.Item as="a" href="#Company" onClick={this.handleSidebarHide}>
            Company
          </Menu.Item>
          <Menu.Item as="a" href="#Services" onClick={this.handleSidebarHide}>
            Services
          </Menu.Item>
          <Menu.Item as="a" href="#Contact" onClick={this.handleSidebarHide}>
            Contact
          </Menu.Item>
          <Menu.Item
            as="a"
            href="mailto:security@pamushanaafrica.com?Subject=CrimeStoppers%20Information%20Request"
            onClick={this.handleSidebarHide}
          >
            <Icon name="mail" />
            security@pamushanaafrica.com
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as="a"
                    inverted
                    href="mailto:security@pamushanaafrica.com?Subject=CrimeStoppers%20Information%20Request"
                  >
                    <Icon name="mail" />
                    Email Us
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};
const genderOptions = [
  {
  key: 'm',
  text: 'Male',
  value: 'male',
},
{
  key: 'f',
  text: 'Female',
  value: 'female',
},
];
const HomepageLayout = ({ mobile }) => (
  <ResponsiveContainer>
    <Segment style={{ padding: '6em 0em' }} vertical id="Company">
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Container text style={{ padding: '1em 0em' }}>
              <Header as="h3" style={{ fontSize: mobile ? '1em' : '2em' }}>
                We guard. We protect. We secure.
              </Header>
              <p style={{ fontSize: mobile ? '0.5em' : '1.33em' }}>
                From security guards to event security to alarm monitoring and
                patrol, our security services company is the top choice for some
                of the biggest names in the country. Get the security services
                you need, guaranteed. LOW RATES.NO CONTRACT.FREE QUOTE{' '}
                <a href="tel:+263773205674">@+263773205674</a>
              </p>
            </Container>
            <Container text style={{ padding: '1em 0em' }}>
              <Header as="h3" style={{ fontSize: mobile ? '1em' : '2em' }}>
                The future of Security
              </Header>
              <p style={{ fontSize: mobile ? '0.5em' : '1.33em' }}>
                In today’ s day and age, we are reminded of the importance of
                hiring a professional security guard company in order to keep
                people safe from threats or terrorizing events. No person should
                be leaving their house headed toward a business or event and
                hoping they make it home alive. Business owners these days are
                not only faced with running a profitable business but they are
                also faced with keeping their customers and employees safe. We
                work hard with business owners and event organizers to reduce
                the possibility of threats by creating a custom defense plan for
                each and every possible scenario. These vulnerable events
                require the knowledge, experience, and skill of one the top
                security guard agencies in Zimbabwe.
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image bordered rounded size="large" src={Logo} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button as="a" href="#Testimonials" size="huge">
              Testimonials
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '6em 0em' }} vertical raised id="Services">
      <Grid columns={3} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon name="users" />
                123
              </Statistic.Value>
              <Statistic.Label>Trained Personnel</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon name="building" />
                40
              </Statistic.Value>
              <Statistic.Label>Protected Premises</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon name="shield alternate" />
                96
              </Statistic.Value>
              <Statistic.Label>Crimes Stopped</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Container style={{ marginTop: '2em' }}>
      <Grid columns='three'  stackable>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Image src={PropertySecurity} />
              <Card.Content>
                <Card.Header>Property Security</Card.Header>
                <Card.Description>Security for any building type</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src={Bodyguard} />
              <Card.Content>
                <Card.Header>Private BodyGuard</Card.Header>
                <Card.Description>VVIP Security</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src={Tracking} />
              <Card.Content>
                <Card.Header>Vehicle Tracking</Card.Header>
                <Card.Description>Track your vehicle</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Card>
              <Image src={ArmoredTruck} />
              <Card.Content>
                <Card.Header>Secure Goods-In-Transit</Card.Header>
                <Card.Description>Move high value goods safely</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src={Cctv} />
              <Card.Content>
                <Card.Header>CCTV Services</Card.Header>
                <Card.Description>24/7 monitored IP CCTV</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Image src={EventSecurity} />
              <Card.Content>
                <Card.Header>Events Security</Card.Header>
                <Card.Description>Make your events crime free</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          The professional approach to security
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          We are known as one of the top security service companies in the
          country. We are bonded and insured and we guarantee to be the only
          professional security guard services you need.We specialize in
          providing event security, mobile patrols, and alarm monitoring to
          clients nationwide. Our armed and unarmed guards are available 24 / 7
          for all your business, personal, and special event needs. We are
          trusted by some of the biggest names in the country and our security
          services are the most advanced in Zimbabwe. Don’ t let tragedy happen
          and hire a professional security guard now.
        </p>
        <Button as="a" size="large">
          Got a Question?
        </Button>
        <Divider
          id="Testimonials"
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href="#">Testimonials</a>
        </Divider>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Professional Security wasn’ t Available… So we fixed it
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          “Customer service was great! There was someone at my house the day
          after I called for a quote and three days later I was all set.”
        </p>
        <Button as="a" size="large">
          Get free security assessment
        </Button>
      </Container>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "To provide professional security in an insecure world"
            </Header>
            <p style={{ fontSize: '1.33em' }}>- Our pledge</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "Our clients have peace of mind because we entrusted them to
              CrimeStoppers"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src={Brown} />
              <b>Tendai</b> Chief Financial Officer, Kurai Properties
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Header as="h3" style={{ margin: '0.5em' }} id="Contact">
      <Icon name="envelope" color="#304D8A" />
      <Header.Content>
        Contact Us
        <Header.Subheader>Send us a web mail now</Header.Subheader>
      </Header.Content>
    </Header>
    <Segment style={{ margin: '0.1em' }}>
      <Form style={{ margin: '0.1em' }}>
        <Form.Group widths="equal">
          <Form.Field
            id="form-input-control-first-name"
            control={Input}
            label="First name"
            placeholder="First name"
          />
          <Form.Field
            id="form-input-control-last-name"
            control={Input}
            label="Last name"
            placeholder="Last name"
          />
          <Form.Field
            control={Select}
            options={genderOptions}
            label={{
              children: 'Gender',
              htmlFor: 'form-select-control-gender',
            }}
            placeholder="Gender"
            search
            searchInput={{ id: 'form-select-control-gender' }}
          />
        </Form.Group>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" />
        </Form.Field>
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Message"
          placeholder="Message"
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          color="facebook"
          content="Send Mail"
        />
      </Form>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a" href="#Services" >Property Security</List.Item>
                <List.Item as="a" href="#Services" >Private Bodyguard</List.Item>
                <List.Item as="a" href="#Services" >Vehicle Tracking</List.Item>
                <List.Item as="a" href="#Services" >Secure Goods-In-Transit</List.Item>
                <List.Item as="a" href="#Services" >CCTV Services</List.Item>
                <List.Item as="a" href="#Services" >Events Security</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted as="h4" content="Contact Details" />
              <List link inverted>
                <List.Item
                  as="a"
                  icon="phone"
                  content="+263 7732 0567 4"
                  href="tel:+263773205674"
                />
                <List.Item
                  as="a"
                  icon="mail"
                  content="security@pamushanaafrica.com"
                  href="mailto:security@pamushanaafrica.com?Subject=CrimeStoppers%20Information%20Request"
                  target="_top"
                />
                <List.Item
                  as="a"
                  icon="map"
                  content="Pamushana House Number 1813 14th Road, Harare, Zimbabwe"
                  href="https://maps.google.com/?q=1813 14th Road, Harare, Zimbabwe"
                  target ="_blank"
                />
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Quick Links" />
              <List link inverted>
                <List.Item
                  as="a"
                  icon="info circle"
                  content="Corporate Information"
                  href="#Company"
                />
                <List.Item as="a" icon="briefcase" content="Services" href="#Services" />
                <List.Item as="a" icon="phone" content="Contact Us" href="#Contact" />
                <List.Item as="a" icon="home" content="Home" href="#Home" />
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h4" inverted>
                Hardlife Chipika, CEO
              </Header>
              <p>
                "Trust us with your business, We will guard you with ours. Our
                business is protecting yours"
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
HomepageLayout.propTypes = {
  mobile: PropTypes.bool,
};

export default HomepageLayout;

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const { history, intl, location, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <SectionHero className={css.hero} history={history} location={location} />
          </div>
          <div className={css.landingBody}>
            <div className={css.info}>
              <h2>
                Aeromates has perfected the charter flight <br />
                experience, explore our network of flights today.
              </h2>
              <h3 style={{ color: 'white', alignSelf: 'flex-start' }}>Popular Destinations</h3>
              <p style={{ color: 'white', alignSelf: 'flex-start' }}>
                Charter a flight to one of our most popular destinations
              </p>
            </div>
            <div className={css.cardImageContainer}>
              <div className={css.cardImage}>Los Angeles, CA</div>
              <div className={css.cardImage}>San Diego, CA</div>
              <div className={css.cardImage}>San Francisco, CA</div>
              <div className={css.cardImage}>New York, NY</div>
              <div className={css.cardImage}>Miami, FL</div>
              <div className={css.cardImage}>Orlando, FL</div>
            </div>
            <Button className={css.cardButton} inverted basic color="white">
              Explore More Destinations
            </Button>
            <h2
              style={{ color: 'white', alignSelf: 'center', fontSize: '40px', marginBottom: '10%' }}
            >
              A Premium Charter Experience
            </h2>
            <div className={css.swappedContainer}>
              <div className={css.imgRight}>
                <div className={css.infoContainer}>
                  <div>
                    <h2>
                      Catering - <br />
                      Made to Order
                    </h2>
                    <p>
                      Make your flight even better by enjoying your <br />
                      favorite dishes en route to your final <br />
                      destination. With Aeromates, you can create <br />a profile of favorite food
                      and at the click of a <br />
                      button, enjoy it on your next flight with us.
                    </p>
                  </div>
                  <div className={css.rightImageView}>

                  </div>
                </div>
              </div>
              <div className={css.imgLeft}>2</div>
              <div className={css.imgRight}>3</div>
            </div>
          </div>
          {/* <ul className={css.sections}>
            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionLocations />
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                <SectionHowItWorks />
              </div>
            </li>
          </ul> */}
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;

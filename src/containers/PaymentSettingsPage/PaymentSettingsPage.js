import React from 'react';
import { bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  UserNav,
} from '../../components';
import { TopbarContainer } from '../../containers';
import { PaymentSettingsForm } from '../../forms';

import css from './PaymentSettingsPage.css';

export const PaymentSettingsPageComponent = props => {
  const { currentUser, scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: <FormattedMessage id="PaymentSettingsPage.contactDetailsTabTitle" />,
      selected: false,
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="PaymentSettingsPage.passwordTabTitle" />,
      selected: false,
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
    {
      text: <FormattedMessage id="PaymentSettingsPage.paymentsTabTitle" />,
      selected: false,
      linkProps: {
        name: 'PayoutPreferencesPage',
      },
    },
    {
      text: <FormattedMessage id="PaymentSettingsPage.paymentSettingsTabTitle" />,
      selected: true,
      linkProps: {
        name: 'PaymentSettingsPage',
      },
    },
  ];

  const title = intl.formatMessage({ id: 'PaymentSettingsPage.title' });

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentUserLoaded = !!ensuredCurrentUser.id;

  // Get first and last name of the current user and use it in the StripePaymentForm to autofill the name field
  const userName = currentUserLoaded
    ? `${ensuredCurrentUser.attributes.profile.firstName} ${
        ensuredCurrentUser.attributes.profile.lastName
      }`
    : null;

  const initalValuesForStripePayment = { name: userName };

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="PaymentSettingsPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="PaymentSettingsPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.title}>
              <FormattedMessage id="PaymentSettingsPage.heading" />
            </h1>
            <PaymentSettingsForm
              className={css.paymentForm}
              formId="PaymentSettingsForm"
              initialValues={initalValuesForStripePayment}
              onSubmit={() => null} //TODO
            />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

PaymentSettingsPageComponent.defaultProps = {
  currentUser: null,
  createStripeAccountError: null,
};

PaymentSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  //TODO
});

const PaymentSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(PaymentSettingsPageComponent);

export default PaymentSettingsPage;

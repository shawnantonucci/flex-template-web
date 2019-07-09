import React, { Component } from 'react';
import { func, number, string } from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape } from 'react-intl';
import { FieldTextInput } from '../../components';

import { FilterPopup, FilterPlain } from '../../components';
import css from './KeywordFilter.css';

const KeywordInput = props => {
  const { id, className, name, filterText, placeholder } = props;
  return (
    <fieldset className={className}>
      {filterText}
      <FieldTextInput
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        className={className}
      />
    </fieldset>
  );
};

class KeywordFilter extends Component {
  constructor(props) {
    super(props);

    this.filter = null;
    this.filterContent = null;

    this.positionStyleForContent = this.positionStyleForContent.bind(this);
  }

  positionStyleForContent() {
    if (this.filter && this.filterContent) {
      // Render the filter content to the right from the menu
      // unless there's no space in which case it is rendered
      // to the left
      const distanceToRight = window.innerWidth - this.filter.getBoundingClientRect().right;
      const labelWidth = this.filter.offsetWidth;
      const contentWidth = this.filterContent.offsetWidth;
      const contentWidthBiggerThanLabel = contentWidth - labelWidth;
      const renderToRight = distanceToRight > contentWidthBiggerThanLabel;
      const contentPlacementOffset = this.props.contentPlacementOffset;

      const offset = renderToRight
        ? { left: contentPlacementOffset }
        : { right: contentPlacementOffset };
      // set a min-width if the content is narrower than the label
      const minWidth = contentWidth < labelWidth ? { minWidth: labelWidth } : null;

      return { ...offset, ...minWidth };
    }
    return {};
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      name,
      label,
      options,
      initialValues,
      contentPlacementOffset,
      onSubmit,
      urlParam,
      intl,
      showAsPopup,
      ...rest
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const hasInitialValues = !!initialValues && initialValues.length > 0;
    const labelForPopup = hasInitialValues
      ? intl.formatMessage({ id: 'KeywordFilter.labelSelected' }, { labelText: initialValues })
      : label;

    const labelForPlain = hasInitialValues
      ? intl.formatMessage(
          { id: 'KeywordFilterPlainForm.labelSelected' },
          { labelText: initialValues }
        )
      : label;

    const filterText = intl.formatMessage({ id: 'KeywordFilter.filterText' });

    const placeholder = intl.formatMessage({ id: 'KeywordFilter.placeholder' });

    const contentStyle = this.positionStyleForContent();

    // pass the initial values with the name key so that
    // they can be passed to the correct field
    const namedInitialValues = { [name]: initialValues };

    const handleSubmit = (urlParam, values) => {
      const usedValue = values ? values[name] : values;
      onSubmit(urlParam, usedValue);
    };

    return showAsPopup ? (
      <FilterPopup
        className={classes}
        rootClassName={rootClassName}
        popupClassName={css.popupSize}
        name={name}
        label={labelForPopup}
        isSelected={hasInitialValues}
        id={`${id}.popup`}
        showAsPopup
        contentPlacementOffset={contentPlacementOffset}
        onSubmit={handleSubmit}
        initialValues={namedInitialValues}
        urlParam={urlParam}
        keepDirtyOnReinitialize
        {...rest}
      >
        <KeywordInput
          className={css.fieldGroup}
          name={name}
          id={`${id}-input`}
          options={options}
          filterText={filterText}
          placeholder={placeholder}
        />
      </FilterPopup>
    ) : (
      <FilterPlain
        className={className}
        rootClassName={rootClassName}
        label={labelForPlain}
        isSelected={hasInitialValues}
        id={`${id}.plain`}
        liveEdit
        contentPlacementOffset={contentStyle}
        onSubmit={handleSubmit}
        initialValues={namedInitialValues}
        urlParam={urlParam}
        {...rest}
      >
        <KeywordInput
          className={css.fieldGroupPlain}
          name={name}
          id={`${id}-input`}
          filterText={filterText}
          placeholder={placeholder}
        />
      </FilterPlain>
    );
  }
}

KeywordFilter.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  contentPlacementOffset: 0,
};

KeywordFilter.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSubmit: func.isRequired,
  initialValues: string,
  contentPlacementOffset: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(KeywordFilter);

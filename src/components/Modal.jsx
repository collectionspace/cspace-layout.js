/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'react-modal';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Modal.css';
import footerButtonStyles from '../../styles/cspace-layout/ModalFooterButton.css';
import headerButtonStyles from '../../styles/cspace-layout/ModalHeaderButton.css';
import overlayStyles from '../../styles/cspace-layout/Overlay.css';

const defaultRenderButtonBar = (config) => {
  const {
    acceptButtonClassName,
    acceptButtonDisabled,
    acceptButtonLabel,
    cancelButtonClassName,
    cancelButtonDisabled,
    cancelButtonLabel,
    showAcceptButton,
    showCancelButton,
    onAcceptButtonClick,
    onCancelButtonClick,
  } = config;

  let acceptButton;

  if (showAcceptButton) {
    acceptButton = (
      <button
        className={classNames(acceptButtonClassName, footerButtonStyles.common)}
        disabled={acceptButtonDisabled}
        name="accept"
        type="button"
        onClick={onAcceptButtonClick}
      >
        {acceptButtonLabel}
      </button>
    );
  }

  let cancelButton;

  if (showCancelButton) {
    cancelButton = (
      <button
        className={classNames(cancelButtonClassName, footerButtonStyles.common)}
        disabled={cancelButtonDisabled}
        name="cancel"
        type="button"
        onClick={onCancelButtonClick}
      >
        {cancelButtonLabel}
      </button>
    );
  }

  return (
    <div>
      {cancelButton}
      {acceptButton}
    </div>
  );
};

const defaultRenderCloseButton = (config) => {
  const {
    closeButtonClassName,
    closeButtonDisabled,
    closeButtonLabel,
    showCloseButton,
    onCloseButtonClick,
  } = config;

  if (!showCloseButton) {
    return null;
  }

  return (
    <button
      className={classNames(closeButtonClassName, headerButtonStyles.common)}
      disabled={closeButtonDisabled}
      name="close"
      type="button"
      onClick={onCloseButtonClick}
    >
      {closeButtonLabel}
    </button>
  );
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  acceptButtonClassName: PropTypes.string,
  acceptButtonDisabled: PropTypes.bool,
  acceptButtonLabel: PropTypes.string,
  cancelButtonClassName: PropTypes.string,
  cancelButtonDisabled: PropTypes.bool,
  cancelButtonLabel: PropTypes.string,
  closeButtonClassName: PropTypes.string,
  closeButtonDisabled: PropTypes.bool,
  closeButtonLabel: PropTypes.string,
  showAcceptButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  renderButtonBar: PropTypes.func,
  renderCloseButton: PropTypes.func,
  onAcceptButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  className: undefined,
  contentLabel: 'Modal',
  isOpen: undefined,
  title: undefined,
  acceptButtonClassName: undefined,
  acceptButtonDisabled: undefined,
  acceptButtonLabel: 'OK',
  cancelButtonClassName: undefined,
  cancelButtonDisabled: undefined,
  cancelButtonLabel: 'Cancel',
  closeButtonClassName: undefined,
  closeButtonDisabled: undefined,
  closeButtonLabel: '×',
  showAcceptButton: true,
  showCancelButton: true,
  showCloseButton: true,
  renderButtonBar: defaultRenderButtonBar,
  renderCloseButton: defaultRenderCloseButton,
  onAcceptButtonClick: undefined,
  onCancelButtonClick: undefined,
  onCloseButtonClick: undefined,
};

export default class Modal extends Component {
  constructor() {
    super();

    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleBodyRef = this.handleBodyRef.bind(this);
    this.handleFooterRef = this.handleFooterRef.bind(this);
    this.handleHeaderRef = this.handleHeaderRef.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleAfterOpen() {
    // Focus the first input in the body, the first button in the footer, or the first button in the
    // header.

    window.setTimeout(() => {
      let element;

      if (this.bodyDomNode) {
        element = this.bodyDomNode.querySelector('input:not(:disabled)');
      }

      if (!element && this.footerDomNode) {
        element = this.footerDomNode.querySelector('button');
      }

      if (!element && this.headerDomNode) {
        element = this.headerDomNode.querySelector('button');
      }

      if (element) {
        element.focus();
      }
    }, 0);
  }

  handleBodyRef(ref) {
    this.bodyDomNode = ref;
  }

  handleFooterRef(ref) {
    this.footerDomNode = ref;
  }

  handleHeaderRef(ref) {
    this.headerDomNode = ref;
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      // TODO: Make a different callback?

      const {
        closeButtonDisabled,
        onCloseButtonClick,
      } = this.props;

      if (!closeButtonDisabled && onCloseButtonClick) {
        onCloseButtonClick(event);
      }
    }
  }

  render() {
    const {
      children,
      className,
      contentLabel,
      isOpen,
      title,
      renderButtonBar,
      renderCloseButton,
      acceptButtonClassName,
      acceptButtonDisabled,
      acceptButtonLabel,
      cancelButtonClassName,
      cancelButtonDisabled,
      cancelButtonLabel,
      closeButtonClassName,
      closeButtonDisabled,
      closeButtonLabel,
      showAcceptButton,
      showCancelButton,
      showCloseButton,
      onAcceptButtonClick,
      onCancelButtonClick,
      onCloseButtonClick,
      ...remainingProps
    } = this.props;

    const closeButton = renderCloseButton({
      closeButtonClassName,
      closeButtonDisabled,
      closeButtonLabel,
      showCloseButton,
      onCloseButtonClick,
    });

    const buttonBar = renderButtonBar({
      acceptButtonClassName,
      acceptButtonDisabled,
      acceptButtonLabel,
      cancelButtonClassName,
      cancelButtonDisabled,
      cancelButtonLabel,
      showAcceptButton,
      showCancelButton,
      onAcceptButtonClick,
      onCancelButtonClick,
    });

    const footer = buttonBar
      ? <footer ref={this.handleFooterRef}>{buttonBar}</footer>
      : null;

    return (
      <BaseModal
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...remainingProps}
        contentLabel={contentLabel}
        isOpen={isOpen}
        className={styles.common}
        overlayClassName={overlayStyles.common}
        portalClassName={className}
        onAfterOpen={this.handleAfterOpen}
      >
        <div
          role="presentation"
          onKeyDown={this.handleKeyDown}
        >
          <header ref={this.handleHeaderRef}>
            <div>{title}</div>
            {closeButton}
          </header>
          <div ref={this.handleBodyRef}>
            {children}
          </div>
          {footer}
        </div>
      </BaseModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.setAppElement = (element) => BaseModal.setAppElement(element);

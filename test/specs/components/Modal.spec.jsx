/* global window, document */

import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render } from 'react-dom';
import createTestContainer from '../../helpers/createTestContainer';
import Modal from '../../../src/components/Modal';

const { expect } = chai;

chai.should();

describe('Modal', () => {
  before(() => {
    Modal.setAppElement(document.body);
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the title and content', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
      >
        {content}
      </Modal>, this.container,
    );

    this.container.querySelector('.ReactModal__Content > div > header > div').textContent.should
      .equal(title);

    this.container.querySelector('.ReactModal__Content > div > div').textContent.should
      .equal(content);
  });

  it('should render a close button and a button bar with a cancel button and an accept button', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
      >
        {content}
      </Modal>, this.container,
    );

    this.container.querySelector('.ReactModal__Content > div > header button[name=close]').should
      .not.equal(null);

    this.container.querySelector('.ReactModal__Content > div > footer button[name=cancel]').should
      .not.equal(null);

    this.container.querySelector('.ReactModal__Content > div > footer button[name=accept]').should
      .not.equal(null);
  });

  it('should not render a close button if showCloseButton is false', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
        showCloseButton={false}
      >
        {content}
      </Modal>, this.container,
    );

    expect(this.container.querySelector('.ReactModal__Content > div > header button[name=close]')).to
      .equal(null);
  });

  it('should not render a cancel button if showCancelButton is false', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
        showCancelButton={false}
      >
        {content}
      </Modal>, this.container,
    );

    expect(this.container.querySelector('.ReactModal__Content > div > footer button[name=cancel]')).to
      .equal(null);
  });

  it('should not render an accept button if showAcceptButton is false', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
        showAcceptButton={false}
      >
        {content}
      </Modal>, this.container,
    );

    expect(this.container.querySelector('.ReactModal__Content > div > footer button[name=accept]')).to
      .equal(null);
  });

  it('should focus the first button in the footer when opened', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
      >
        {content}
      </Modal>, this.container,
    );

    const cancelButton = this.container.querySelector('.ReactModal__Content > div > footer button[name=cancel]');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        document.activeElement.should.equal(cancelButton);

        resolve();
      }, 0);
    });
  });

  it('should focus the first button in the header when opened if there are no buttons in the footer', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
        showAcceptButton={false}
        showCancelButton={false}
      >
        {content}
      </Modal>, this.container,
    );

    const closeButton = this.container.querySelector('.ReactModal__Content > div > header button[name=close]');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        document.activeElement.should.equal(closeButton);

        resolve();
      }, 0);
    });
  });

  it('should call onCloseButtonClick when escape is depressed in the modal', function test() {
    const title = 'Modal Title';
    const content = 'Hello world';

    let handlerCalled = false;

    const handleCloseButtonClick = () => {
      handlerCalled = true;
    };

    render(
      <Modal
        isOpen
        title={title}
        parentSelector={() => this.container}
        onCloseButtonClick={handleCloseButtonClick}
      >
        {content}
      </Modal>, this.container,
    );

    const modalContentContainer = this.container.querySelector('.ReactModal__Content > div');

    Simulate.keyDown(modalContentContainer, { key: 'Escape' });

    handlerCalled.should.equal(true);
  });
});

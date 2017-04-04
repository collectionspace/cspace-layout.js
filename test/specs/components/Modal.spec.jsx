/* global document */

import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../helpers/createTestContainer';
import Modal from '../../../src/components/Modal';

const expect = chai.expect;

chai.should();

describe('Modal', function suite() {
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
      </Modal>, this.container);

    this.container.querySelector('.ReactModal__Content > header > div').textContent.should
      .equal(title);

    this.container.querySelector('.ReactModal__Content > div').textContent.should
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
      </Modal>, this.container);

    this.container.querySelector('.ReactModal__Content > header button[name=close]').should
      .not.equal(null);

    this.container.querySelector('.ReactModal__Content > footer button[name=cancel]').should
      .not.equal(null);

    this.container.querySelector('.ReactModal__Content > footer button[name=accept]').should
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
      </Modal>, this.container);

    expect(this.container.querySelector('.ReactModal__Content > header button[name=close]')).to
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
      </Modal>, this.container);

    expect(this.container.querySelector('.ReactModal__Content > footer button[name=cancel]')).to
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
      </Modal>, this.container);

    expect(this.container.querySelector('.ReactModal__Content > footer button[name=accept]')).to
      .equal(null);
  });
});

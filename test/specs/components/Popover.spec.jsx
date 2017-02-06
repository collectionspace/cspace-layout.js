/* global window */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';

import createTestContainer from '../../helpers/createTestContainer';

import Popover from '../../../src/components/Popover';

const expect = chai.expect;

chai.should();

const expectedClassName = 'cspace-layout-Popover--common cspace-layout-Popover--left';

describe('Popover', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<Popover />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(<Popover />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the header', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header} />
      </div>, this.container);

    this.container.querySelector('button').textContent.should.equal('Header');
  });

  it('should open when mouse enters the header', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.mouseEnter(headerElement);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelectorAll('span').length.should.equal(2);
        resolve();
      }, 500);
    });
  });

  it('should open when down arrow is depressed on the header', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.keyDown(headerElement, { key: 'ArrowDown' });

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelectorAll('span').length.should.equal(2);
        resolve();
      }, 500);
    });
  });

  it('should open when header is clicked', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.click(headerElement);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelectorAll('span').length.should.equal(2);
        resolve();
      }, 500);
    });
  });

  it('should wait for the time specified by the openDelay prop before opening', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header} openDelay={500}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.mouseEnter(headerElement);

    return (
      new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelectorAll('span').length.should.equal(0);

          window.setTimeout(() => {
            this.container.querySelectorAll('span').length.should.equal(2);
            resolve();
          }, 200);
        }, 400);
      })
    );
  });

  it('should not open if the mouse leaves before the open delay', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header} openDelay={500}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.mouseEnter(headerElement);

    return (
      new Promise((resolve) => {
        window.setTimeout(() => {
          this.container.querySelectorAll('span').length.should.equal(0);

          Simulate.mouseLeave(headerElement);

          window.setTimeout(() => {
            this.container.querySelectorAll('span').length.should.equal(0);
            resolve();
          }, 200);
        }, 400);
      })
    );
  });

  it('should show a right aligned popup if align prop is \'right\'', function test() {
    const header = <div style={{ textAlign: 'right' }}>Header</div>;

    render(
      <div style={{ position: 'relative', left: '400px' }}>
        <Popover header={header} align="right">
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.mouseEnter(headerElement);

    return (
      new Promise((resolve) => {
        window.setTimeout(() => {
          const popup = this.container.querySelector('.cspace-layout-Popup--common');
          const rect = popup.getBoundingClientRect();

          headerElement.getBoundingClientRect().right.should.be.closeTo(rect.right, 0.5);

          resolve();
        }, 300);
      })
    );
  });

  it('should close when the popup loses focus', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.click(headerElement);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const popup = this.container.querySelector('.cspace-layout-Popup--common');

        Simulate.blur(popup);

        expect(this.container.querySelector('.cspace-layout-Popup--common')).to.equal(null);

        resolve();
      }, 500);
    });
  });

  it('should close when escape is depressed in the popup', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.click(headerElement);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const popup = this.container.querySelector('.cspace-layout-Popup--common');

        Simulate.keyDown(popup, { key: 'Escape' });

        expect(this.container.querySelector('.cspace-layout-Popup--common')).to.equal(null);

        resolve();
      }, 500);
    });
  });

  it('should close when mouse leaves the popup', function test() {
    const header = <div>Header</div>;

    render(
      <div style={{ position: 'relative' }}>
        <Popover header={header}>
          {header}
          <span style={{ whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet,</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>consectetur adipiscing elit.</span>
        </Popover>
        <br /><br />
      </div>, this.container);

    const headerElement = this.container.querySelector('button');

    Simulate.click(headerElement);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const popup = this.container.querySelector('.cspace-layout-Popup--common');

        Simulate.mouseLeave(popup);

        expect(this.container.querySelector('.cspace-layout-Popup--common')).to.equal(null);

        resolve();
      }, 500);
    });
  });
});

import React from 'react';
import { Simulate } from 'react-dom/test-utils';

import createTestContainer from '../../helpers/createTestContainer';
import { render } from '../../helpers/renderHelpers';

import Panel from '../../../src/components/Panel';

const { expect } = chai;

chai.should();

const expectedClassName = 'cspace-layout-Panel--common cspace-layout-Panel--black';

describe('Panel', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a section', function test() {
    render(<Panel />, this.container);

    this.container.firstElementChild.nodeName.should.equal('SECTION');
  });

  it('should render with correct class', function test() {
    render(<Panel />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the supplied header', function test() {
    const headerText = 'This is the header';

    render(<Panel header={headerText} />, this.container);

    this.container.querySelector('header').textContent.should.equal(headerText);
  });

  it('should render the content', function test() {
    render(
      <Panel>
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should render buttons when a header is present', function test() {
    const buttons = [
      <button key="button1" type="button">1</button>,
      <button key="button2" type="button">2</button>,
    ];

    render(
      <Panel header="header" buttons={buttons}>
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    const buttonElements = this.container.querySelectorAll('.cspace-layout-PanelButtonBar--common button');

    buttonElements.length.should.equal(2);
    buttonElements[0].textContent.should.equal('1');
    buttonElements[1].textContent.should.equal('2');
  });

  it('should hide content when collapsible and collapsed', function test() {
    render(
      <Panel collapsible collapsed>
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    expect(this.container.querySelector('div > div#content')).to.equal(null);
  });

  it('should ignore collapsed when not collapsible', function test() {
    render(
      <Panel collapsed>
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should default to not collapsed when collapsible', function test() {
    render(
      <Panel collapsible>
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should call onToggleCollapsed when the header is clicked', function test() {
    const panelName = 'descPanel';

    let handlerCalledName = null;
    let handlerCalledIsCollapsed = null;

    const handleToggleCollapsed = (name, isCollapsed) => {
      handlerCalledName = name;
      handlerCalledIsCollapsed = isCollapsed;
    };

    render(
      <Panel
        name={panelName}
        header="Header"
        collapsible
        onToggleCollapsed={handleToggleCollapsed}
      >
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    const headerButton = this.container.querySelector('header > button');

    Simulate.click(headerButton);

    handlerCalledName.should.equal(panelName);
    handlerCalledIsCollapsed.should.equal(true);
  });

  it('should not render a header button when not collapsible', function test() {
    render(
      <Panel
        header="Header"
        collapsible={false}
      >
        <div id="content">This is some content</div>
      </Panel>, this.container,
    );

    const headerButton = this.container.querySelector('header > button');

    expect(headerButton).to.equal(null);
  });
});

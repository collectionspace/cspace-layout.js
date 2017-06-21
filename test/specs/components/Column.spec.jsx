import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../helpers/createTestContainer';

import Column from '../../../src/components/Column';
import Row from '../../../src/components/Row';
import Panel from '../../../src/components/Panel';

chai.should();

const expectedClassName = 'cspace-layout-Column--normal';

describe('Column', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<Column />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(<Column />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the content', function test() {
    render(
      <div>
        <Column left>
          <Row>
            <Panel>
              <div id="content">This is some content in a Panel in a Row in a Column</div>
            </Panel>
          </Row>
        </Column>
        <Column right>
          <Row>
            <Panel>
              <div id="content">This is some content in a Panel in a Row in a Column</div>
            </Panel>
          </Row>
        </Column>
      </div>
      , this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content in a Panel in a Row in a Column');
  });

  it('should pulled to the left by default', function test() {
    render(
      <Column>
        <b>This column should be pulled to the left by default</b>
      </Column>
    , this.container);
  });
});
import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../helpers/createTestContainer';

import Row from '../../../src/components/Row';

chai.should();

const expectedClassName = 'cspace-layout-Row--normal';

describe('Row', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<Row />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(<Row />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the content', function test() {
    render(
      <Row>
        <div id="content">This is some content</div>
      </Row>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});

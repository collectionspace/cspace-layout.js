import React from 'react';

import createTestContainer from '../../helpers/createTestContainer';
import { render } from '../../helpers/renderHelpers';

import Col from '../../../src/components/Col';

chai.should();

describe('Col', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<Col />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <Col>
        <div id="content">This is some content.</div>
      </Col>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content.');
  });
});

import React from 'react';

import createTestContainer from '../../helpers/createTestContainer';
import { render } from '../../helpers/renderHelpers';

import Cols from '../../../src/components/Cols';

chai.should();

describe('Cols', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<Cols />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <Cols>
        <div id="content">This is some content.</div>
      </Cols>, this.container,
    );

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content.');
  });
});

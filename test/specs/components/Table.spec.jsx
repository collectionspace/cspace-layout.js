import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';

import createTestContainer from '../../helpers/createTestContainer';

import Table from '../../../src/components/Table';

chai.should();

describe('Table', () => {
  const columns = [
    {
      label: 'Identification number',
      dataKey: 'objectNumber',
      width: 150,
    },
    {
      label: 'Title',
      dataKey: 'title',
      width: 200,
    },
    {
      label: 'Last modified',
      dataKey: 'updatedAt',
      width: 200,
    },
  ];

  const data = [
    {
      csid: '9a371b20-1a25-4bd5-b331',
      objectNumber: '2016.1.18',
      title: 'Object 1',
      updatedAt: '2016-12-21T19:34:55.403Z',
    },
    {
      csid: '902e86d0-d743-4950-acef',
      objectNumber: 'IN2016.20',
      title: 'Another Object',
      updatedAt: '2016-12-21T15:36:52.878Z',
    },
    {
      csid: '2279d3de-b037-4543-9975',
      objectNumber: '2016.1.15',
      title: 'The Title of the Object',
      updatedAt: '2016-12-21T09:35:28.905Z',
    },
  ];

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render column headers', function test() {
    render(
      <div style={{ height: '140px' }}>
        <Table
          columns={columns}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        />
      </div>, this.container,
    );

    const headers = this.container.querySelectorAll('span.ReactVirtualized__Table__headerTruncatedText');

    headers[0].textContent.should.equal(columns[0].label);
    headers[1].textContent.should.equal(columns[1].label);
    headers[2].textContent.should.equal(columns[2].label);
  });

  it('should call onRowClick when a row is clicked', function test() {
    let rowClickedIndex = null;

    const handleRowClick = (index) => {
      rowClickedIndex = index;
    };

    render(
      <div style={{ height: '140px' }}>
        <Table
          columns={columns}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          onRowClick={handleRowClick}
        />
      </div>, this.container,
    );

    const rows = this.container.querySelectorAll('div.cspace-layout-TableRow--common');

    Simulate.click(rows[1]);

    rowClickedIndex.should.equal(1);
  });

  it('should render a checkbox column when showCheckboxColumn is true', function test() {
    render(
      <div style={{ height: '140px' }}>
        <Table
          columns={columns}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          showCheckboxColumn
        />
      </div>, this.container,
    );

    const headers = this.container.querySelectorAll('span.ReactVirtualized__Table__headerTruncatedText');

    headers[0].textContent.should.equal('');
    headers[1].textContent.should.equal(columns[0].label);
    headers[2].textContent.should.equal(columns[1].label);
    headers[3].textContent.should.equal(columns[2].label);
  });

  it('should call renderCheckbox to render checkboxes', function test() {
    let renderCalledCount = 0;

    const renderCheckbox = ({ rowIndex }) => { // eslint-disable-line react/prop-types
      renderCalledCount += 1;

      return <input name={rowIndex} type="checkbox" />;
    };

    render(
      <div style={{ height: '140px' }}>
        <Table
          columns={columns}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          showCheckboxColumn
          renderCheckbox={renderCheckbox}
        />
      </div>, this.container,
    );

    const rows = this.container.querySelectorAll('div.cspace-layout-TableRow--common');

    for (let i = 0; i < rows.length; i += 1) {
      rows[i].querySelector(`input[type="checkbox"][name="${i}"]`).should.not.equal(null);
    }

    renderCalledCount.should.equal(3);
  });
});

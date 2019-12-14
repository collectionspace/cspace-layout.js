import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-virtualized/styles.css';

import {
  AutoSizer,
  Column,
  defaultTableRowRenderer,
  SortDirection,
  Table as VirtualizedTable,
} from 'react-virtualized';

import dimensions from '../../styles/dimensions.css';
import styles from '../../styles/cspace-layout/Table.css';
import rowStyles from '../../styles/cspace-layout/TableRow.css';

const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    dataKey: PropTypes.string,
    width: PropTypes.number,
  })),
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  onRowClick: PropTypes.func,
};

const defaultProps = {
  columns: [],
  showCheckboxColumn: undefined,
  renderCheckbox: undefined,
  onRowClick: undefined,
};

const rowClassName = ({ index }) => {
  if (index >= 0) {
    return (index % 2 === 0 ? rowStyles.even : rowStyles.odd);
  }

  return null;
};

const cellRenderer = ({ cellData }) => cellData;

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick({ index }) {
    const {
      onRowClick,
    } = this.props;

    if (onRowClick) {
      onRowClick(index);
    }
  }

  render() {
    const {
      columns,
      renderCheckbox,
      showCheckboxColumn,
      ...remainingProps
    } = this.props;

    const inputHeight = parseInt(dimensions.inputHeight, 10);

    let checkboxColumn;

    if (showCheckboxColumn) {
      checkboxColumn = (
        <Column
          key="check"
          dataKey="selected"
          disableSort
          cellRenderer={renderCheckbox}
          width={inputHeight - 2}
          flexGrow={0}
          flexShrink={0}
        />
      );
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <VirtualizedTable
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...remainingProps}
            className={styles.common}
            width={width}
            height={height}
            headerHeight={inputHeight}
            rowHeight={inputHeight}
            rowClassName={rowClassName}
            tabIndex={-1}
            onRowClick={this.handleRowClick}
          >
            {checkboxColumn}
            {columns.map((column) => (
              <Column
                key={column.dataKey}
                cellRenderer={cellRenderer}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...column}
              />
            ))}
          </VirtualizedTable>
        )}
      </AutoSizer>
    );
  }
}

Table.SortDirection = SortDirection;
Table.defaultRowRenderer = defaultTableRowRenderer;

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

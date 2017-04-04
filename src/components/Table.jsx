import React, { Component, PropTypes } from 'react';
import { AutoSizer, Column, SortDirection, Table as VirtualizedTable } from 'react-virtualized';
import styles from '../../styles/cspace-layout/Table.css';
import rowStyles from '../../styles/cspace-layout/TableRow.css';
/* eslint-disable import/imports-first, import/no-unresolved */
import '!style-loader!css-loader!react-virtualized/styles.css';
/* eslint-enable import/imports-first, import/no-unresolved */

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      dataKey: PropTypes.string,
      width: PropTypes.number,
    })
  ),
  showCheckboxColumn: PropTypes.bool,
  renderCheckbox: PropTypes.func,
  onRowClick: PropTypes.func,
};

const defaultProps = {
  columns: [],
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

    let checkboxColumn;

    if (showCheckboxColumn) {
      checkboxColumn = (
        <Column
          key="check"
          dataKey="selected"
          cellRenderer={renderCheckbox}
          width={20}
        />
      );
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <VirtualizedTable
            {...remainingProps}
            className={styles.common}
            width={width}
            height={height}
            headerHeight={22}
            rowHeight={22}
            rowClassName={rowClassName}
            tabIndex={null}
            onRowClick={this.handleRowClick}
          >
            {checkboxColumn}
            {columns.map(column => (
              <Column
                key={column.dataKey}
                cellRenderer={cellRenderer}
                {...column}
              />
            ))}
          </VirtualizedTable>
        )}
      </AutoSizer>
    );
  }
}

Table.SORT_ASC = SortDirection.ASC;
Table.SORT_DESC = SortDirection.DESC;

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

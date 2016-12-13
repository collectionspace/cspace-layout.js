import React, { Component, PropTypes } from 'react';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
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
      ...remainingProps
    } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <VirtualizedTable
            {...remainingProps}
            className={styles.normal}
            width={width}
            height={height}
            headerHeight={22}
            rowHeight={22}
            rowClassName={rowClassName}
            tabIndex={null}
            onRowClick={this.handleRowClick}
          >
            {columns.map(column => (
              <Column
                cellDataGetter={column.cellDataGetter}
                key={column.dataKey}
                label={column.label}
                dataKey={column.dataKey}
                width={column.width}
              />
            ))}
          </VirtualizedTable>
        )}
      </AutoSizer>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

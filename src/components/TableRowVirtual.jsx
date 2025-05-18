import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { calculateDSR } from "../utils/calculateDSR";

const TableRowVirtual = React.memo(({ index, style, data }) => {
  const row = data.rows[index];
  const columns = data.columns;
  const columnWidths = data.columnWidths;

  return (
    <TableRow
      component="div"
      hover
      style={{ ...style, display: "flex", width: "100%" }}
      key={row.id}
    >
      {columns.map((column, colIndex) => {
        let value;
        switch (column.id) {
          case "fullName":
            value = `${row.firstName} ${row.lastName}`;
            break;
          case "dsr":
            value = calculateDSR(row.registeredDate);
            break;
          case "registeredDate":
            value = new Date(row.registeredDate).toLocaleDateString();
            break;
          default:
            value = row[column.id];
        }
        return (
          <TableCell
            key={column.id}
            component="div"
            variant="body"
            align="left"
            style={{
              width: columnWidths[colIndex],
              flexShrink: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
});

export default TableRowVirtual;

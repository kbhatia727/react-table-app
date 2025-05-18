import React, { useState } from "react";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import Draggable from "react-draggable";

const headerHeight = 60;

function TableHeader({
  columns,
  setColumns,
  sortConfig,
  setSortConfig,
  columnWidths,
}) {
  const [draggingCol, setDraggingCol] = useState(null);
  const [draggedPos, setDraggedPos] = useState({ x: 0 });

  const handleSort = (columnId) => {
    setSortConfig((prev) => {
      if (prev.orderBy === columnId) {
        return {
          orderBy: columnId,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      } else {
        return { orderBy: columnId, order: "asc" };
      }
    });
  };

  const handleDragStop = (e, data, index) => {
    setDraggingCol(null);
    setDraggedPos({ x: 0 });
    const cellWidth = 150; // approx width
    const movedBy = Math.round(data.x / cellWidth);
    if (!movedBy) return;
    const newIndex = index + movedBy;
    if (newIndex < 0 || newIndex >= columns.length) return;
    const newCols = [...columns];
    const [movedCol] = newCols.splice(index, 1);
    newCols.splice(newIndex, 0, movedCol);
    setColumns(newCols);
  };

  return (
    <TableRow
      component="div"
      className="table-header-row"
      style={{ display: "flex", width: "100%", height: headerHeight }}
    >
      {columns.map((column, index) => (
        <Draggable
          key={column.id}
          axis="x"
          bounds="parent"
          onStart={() => setDraggingCol(index)}
          onStop={(e, data) => handleDragStop(e, data, index)}
          position={draggingCol === index ? draggedPos : { x: 0, y: 0 }}
          onDrag={(e, data) => setDraggedPos({ x: data.x })}
        >
          <TableCell
            sx={{
              cursor: column.sortable ? "pointer" : "default",
              position: "relative",
              width: columnWidths[index],
              userSelect: "none",
              backgroundColor: "#e0e0e0",
            }}
            key={column.id}
            align={"left"}
            padding={"normal"}
            sortDirection={
              sortConfig.orderBy === column.id ? sortConfig.order : false
            }
            className={`table-header-cell ${column.sortable ? "sortable" : ""}`}
            onClick={() => column.sortable && handleSort(column.id)}
            role="columnheader"
            component="div"
          >
            {column.sortable ? (
              <TableSortLabel
                active={sortConfig.orderBy === column.id}
                direction={sortConfig.order}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        </Draggable>
      ))}
    </TableRow>
  );
}

export default TableHeader;

import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import { FixedSizeList as List } from "react-window";
import TableHeader from "./TableHeader";
import { calculateDSR } from "../utils/calculateDSR";
import TableRowVirtual from "./TableRowVirtual";

const headColumns = [
  { id: "id", label: "ID", sortable: true, minWidth: 80 },
  { id: "firstName", label: "First Name", sortable: true, minWidth: 130 },
  { id: "lastName", label: "Last Name", sortable: true, minWidth: 130 },
  { id: "email", label: "Email", sortable: true, minWidth: 230 },
  { id: "city", label: "City", sortable: true, minWidth: 130 },
  {
    id: "registeredDate",
    label: "Registered Date",
    sortable: true,
    minWidth: 130,
  },
  {
    id: "fullName",
    label: "Full Name",
    sortable: true,
    minWidth: 180,
  },
  {
    id: "dsr",
    label: "DSR",
    sortable: true,
    minWidth: 80,
  },
];

const rowHeight = 50;

function DataTable({ data }) {
  const [columns, setColumns] = useState(headColumns);
  const [sortConfig, setSortConfig] = useState({ orderBy: "id", order: "asc" });

  const comparator = useCallback(
    (a, b) => {
      const getValue = (row, colId) => {
        if (colId === "fullName") {
          return `${row.firstName} ${row.lastName}`.toLowerCase();
        }
        if (colId === "dsr") {
          return calculateDSR(row.registeredDate);
        }
        if (colId === "registeredDate") {
          return new Date(row.registeredDate);
        }
        const val = row[colId];
        if (typeof val === "string") return val.toLowerCase();
        return val;
      };
      const { orderBy, order } = sortConfig;
      const valA = getValue(a, orderBy);
      const valB = getValue(b, orderBy);
      if (valA < valB) {
        return order === "asc" ? -1 : 1;
      }
      if (valA > valB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    },
    [sortConfig]
  );

  const sortedData = useMemo(() => {
    return [...data].sort(comparator);
  }, [data, comparator]);

  const columnWidths = columns.map((col) => col.minWidth || 100);

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <Paper sx={{ alignContent: "center", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100%", overflowY: "auto" }}
        >
          <Table stickyHeader style={{ width: "100%", height: "100%" }}>
            <TableHead sx={{ position: "sticky", top: 0 }}>
              <TableHeader
                columns={columns}
                setColumns={setColumns}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                columnWidths={columnWidths}
              />
            </TableHead>
            <TableBody>
              <List
                height={600}
                itemCount={sortedData.length}
                itemSize={rowHeight}
                width="100%"
                overscanCount={10}
                style={{ overflowX: "hidden" }}
                itemData={{ rows: sortedData, columns, columnWidths }}
              >
                {TableRowVirtual}
              </List>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default DataTable;

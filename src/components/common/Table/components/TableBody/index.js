import { Tbody, Tr, Td } from "@chakra-ui/react";
import React from "react";

import TableAction from "../TableAction";

const TableBody = ({ tableData, columnData, onEdit, onRemove }) => (
  <Tbody>
    {tableData.map((data, index) => (
      <React.Fragment key={index}>
        <Tr>
          {columnData.map((column, idx) => {
            const customCell = column?.render;

            if (column?.columnId === "action") {
              return (
                <Td
                  key={`${column?.columnId}-${idx}`}
                  borderColor="background.grey.600"
                  py={2}>
                  {customCell ? (
                    customCell(data?.[column?.columnId], data, index)
                  ) : (
                    <TableAction
                      onEdit={() => onEdit(data)}
                      onRemove={() => onRemove(data?.id, data)}
                    />
                  )}
                </Td>
              );
            }

            return (
              <Td
                key={`${column?.columnId}-${idx}`}
                borderColor="background.grey.600"
                whiteSpace="nowrap"
                textTransform="capitalize"
                fontSize="16px"
                textAlign="center"
                py={2}>
                {customCell
                  ? customCell(data?.[column?.columnId], data, index)
                  : data?.[column?.columnId]}
              </Td>
            );
          })}
        </Tr>
      </React.Fragment>
    ))}
  </Tbody>
);

export default TableBody;

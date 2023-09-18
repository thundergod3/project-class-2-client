import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { TableContainer, TableLoadingContainer } from "./table.styles";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import PagePagination from "../PagePagination";
import Loading from "../Loading";

const Table = ({
  totalPage = 0,
  tableData = [],
  columnData,
  loading,
  usingPagination = true,
  page,
  setPage,
  sizePage = 10,
  renderEmptyData,
  textEmpty = "No data found",
  onEdit,
  onRemove,
}) => (
  <Box>
    <Box overflowX="scroll">
      {loading ? (
        <TableLoadingContainer>
          <Loading />
        </TableLoadingContainer>
      ) : !tableData?.length ? (
        renderEmptyData || (
          <TableLoadingContainer>
            <Text fontSize="20px">{textEmpty}</Text>
          </TableLoadingContainer>
        )
      ) : (
        <>
          <TableContainer>
            <TableHead columnData={columnData} />
            <TableBody
              tableData={tableData}
              columnData={columnData}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          </TableContainer>
        </>
      )}
    </Box>
    {usingPagination && !loading && tableData.length > 0 && (
      <PagePagination
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        sizePage={sizePage}
      />
    )}
  </Box>
);

export default Table;

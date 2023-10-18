import { Box, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";

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
  textEmpty = "Không có dữ liệu",
  onEdit,
  onRemove,
}) => {
  const formatColumnData = useMemo(
    () => columnData?.filter((record) => !record?.hide),
    [columnData]
  );

  return (
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
              <TableHead columnData={formatColumnData} />
              <TableBody
                tableData={tableData}
                columnData={formatColumnData}
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
};

export default Table;

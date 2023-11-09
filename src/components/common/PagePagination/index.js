import React from "react";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

import { PagePaginationContainer } from "./pagePagination.styles";

import "./pagePagination.styles.scss";

const PagePagination = ({
  page,
  setPage,
  totalPage = 0,
  sizePage = 5,
  onChangePage,
  positionContent = "center",
}) => {
  const handleChangePage = (value) => {
    setPage(value);
    onChangePage?.(value);
  };

  return (
    <PagePaginationContainer positionContent={positionContent}>
      <ReactPaginate
        forcePage={page}
        previousLabel={
          <Icon
            as={IoIosArrowBack}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
            mb="2px"
          />
        }
        nextLabel={
          <Icon
            as={IoIosArrowForward}
            color={useColorModeValue("gray.700", "gray.200")}
            boxSize={4}
            mb="2px"
          />
        }
        breakClassName={"break-me"}
        breakLabel={"..."}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(totalPage / sizePage)}
        containerClassName={`page-pagination ${
          positionContent === "center"
            ? "justify-center"
            : positionContent === "right"
            ? "justify-end"
            : "justify-start"
        }`}
        activeClassName={"active"}
        onPageChange={(value) => handleChangePage?.(value.selected)}
        previousClassName={`arrow-button ${page === 0 ? "d-none" : ""}`}
        nextClassName={`arrow-button ${
          page === Math.ceil(totalPage / sizePage) - 1 ? "d-none" : ""
        }`}
      />
    </PagePaginationContainer>
  );
};

export default PagePagination;

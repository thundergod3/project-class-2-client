import { useState } from "react";

export default function usePagination(initialPage = 0, initialSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
    setPage(0);
  };

  return {
    page,
    setPage,
    size,
    setSize,
    onPageChange: handlePageChange,
    onSizeChange: handleSizeChange,
  };
}

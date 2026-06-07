const buildPagination = (
  page = 1,
  limit = 10
) => {
  const currentPage =
    Math.max(
      parseInt(page),
      1
    );

  const pageSize =
    Math.max(
      parseInt(limit),
      1
    );

  const skip =
    (currentPage - 1) *
    pageSize;

  return {
    currentPage,
    pageSize,
    skip,
  };
};

export default buildPagination;
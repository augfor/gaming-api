const config = require('../config');

const { pagination } = config;

exports.paginationParams = ({
  page = pagination.page,
  limit = pagination.limit,
  skip = pagination.skip,
}) => ({
  page: Number.parseInt(page, 10),
  limit: Number.parseInt(limit, 10),
  skip: skip ? Number.parseInt(skip, 10) : (page - 1) * 10,
});

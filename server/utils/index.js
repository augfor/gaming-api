const config = require('../config');

const { pagination, sort } = config;

exports.paginationParams = ({
  page = pagination.page,
  limit = pagination.limit,
  skip = pagination.skip,
}) => ({
  page: Number.parseInt(page, 10),
  limit: Number.parseInt(limit, 10),
  skip: skip ? Number.parseInt(skip, 10) : (page - 1) * 10,
});

// prettier-ignore
exports.sortParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields,
) => {
  const safeList = {
    sortBy: [Object.getOwnPropertyNames(fields), ...sort.sortBy.fields],
    direction: sort.direction.options,
  };

  return {
    sortBy: safeList.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: safeList.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

exports.sortTransform = (sortBy, direction) => {
  const dir = direction === 'desc' ? '-' : '';

  return `${dir}${sortBy}`;
};

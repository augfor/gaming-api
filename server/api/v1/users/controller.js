exports.all = (req, res, next) => {
  const { query = {} } = req;

  res.json({
    ...query,
  });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;

  res.json({
    ...body,
    meta: {
      status: 200,
    },
  });
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  const { params = {}, body = {}, query = {} } = req;

  res.json({
    ...body,
    ...params,
    meta: {
      ...query,
      status: 200,
    },
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  res.json({
    id,
  });
};

const { Model, fields } = require('./model');
const {
  paginationParams,
  sortParams,
  sortTransform,
} = require('../../../utils');
const { signToken } = require('../auth');

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = '' } = params;

  try {
    const data = await Model.findById(id);

    if (!data) {
      const message = `${Model.modelName} not found`;

      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = data;

      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const { query } = req;
  const { page, limit, skip } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);

  const docs = Model.find({})
    .sort(sortTransform(sortBy, direction))
    .skip(skip)
    .limit(limit);
  const all = Model.countDocuments();

  try {
    const response = await Promise.all([docs.exec(), all.exec()]);
    const [data, total] = response;
    const pages = Math.ceil(total / limit);

    res.json({
      data,
      meta: {
        total,
        pages,
        page,
        limit,
        skip,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  // Receives information
  const { body = {} } = req;
  const { email, password } = body;

  try {
    // Search user (document) by email
    const user = await Model.findOne({
      email,
    }).exec();
    // If user doesn't exist
    const message = 'Invalid email or password';
    const statusCode = 200;

    if (!user) {
      return next({
        message,
        statusCode,
      });
    }

    // Verify password if user exists
    const verified = await user.verifyPassword(password);

    if (!verified) {
      return next({
        message,
        statusCode,
      });
    }

    const token = signToken({
      id: user.id,
    });

    // Return user's information if verified
    return res.json({
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const data = await document.save();
    const status = 201;

    res.status(status);

    const token = signToken({
      id: data.id,
    });

    res.json({
      data,
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.profile = async (req, res, next) => {
  const { decoded } = req;
  const { id } = decoded;

  try {
    const data = await Model.findById(id);

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;

  try {
    const data = await Model.findByIdAndUpdate(id, body, { new: true });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { decoded } = req;
  const { id } = decoded;

  try {
    const data = await Model.findByIdAndDelete(id);

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

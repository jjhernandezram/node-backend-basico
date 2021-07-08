const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
  const params = req.query;
  res.json({
    msg: 'get API',
    params,
  });
};

const usersPost = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: 'post API',
    body,
  });
};

const usersPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put API',
    id,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API',
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API',
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};

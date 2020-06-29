// GET 404 error page when non-existent route is requested.
exports.get404 = (req, res, next) => {
  res.status(404);
  res.render('404', {
    pageTitle: 'Page not found.',
    path: undefined,
  });
};

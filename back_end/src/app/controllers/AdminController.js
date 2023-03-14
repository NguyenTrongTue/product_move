const AdminController = (Model) => {
  return {
    // Update modal
    updateModel(req, res, next) {
      Model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    // Show 1 modal
    showModel(req, res, next) {
      Model.findOne({ _id: req.params.id })
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    // Show all modal
    showAllModel(req, res, next) {
      Model.find({})
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
  };
};

module.exports = AdminController;

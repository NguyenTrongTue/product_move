const bcrypt = require("bcryptjs");

const SiteController = (Model) => {
  return {
    createModel(req, res, next) {
      const newModel = new Model(req.body);
      newModel
        .save()
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    updateModel(req, res, next) {
      Model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    showModel(req, res, next) {
      Model.findOne({ _id: req.params.id })
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    showAllModel(req, res, next) {
      Model.find({})
        .then((model) => {
          res.status(200).json(model);
        })
        .catch(next);
    },
    deleteModel(req, res, next) {
      Model.delete({ _id: req.params.id })
        .then(() => {
          res.status(200).json("Model has been deleted");
        })
        .catch(next);
    },
    createUser(req, res, next) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new Model({ ...req.body, password: hash });
      newUser
        .save()
        .then((newUser) => {
          res.json(newUser);
        })
        .catch(next);
    },
  };
};

module.exports = SiteController;

exports.getRessourcesWithPopulate = async (model, populate, fields) => {
  const result = await model.find().populate(populate, fields);
  return {
    success: true,
    data: result,
  };
};

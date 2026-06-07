const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.validatedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors || error.issues,
      });
    }
  };
};

export default validate;
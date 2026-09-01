export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "usernmae must be betweeen 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be emmpty",
    },
    isString: {
      errorMessage: "must be a string",
    },
  },
  displayName: {
    notEmpty: true,
    isLength: {
      options: {
        min: 5,
        max: 10,
      },
    },
  },
};

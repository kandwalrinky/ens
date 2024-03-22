import { check } from "express-validator";

class UserValidation {

  constructor() { }

  create() {
    return [
      check("firstName")
        .trim()
        .notEmpty()
        .withMessage("firstName field couldn't be empty.")
        .bail()
        .isString()
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in fname not allowed").bail(),

      check("lastName")
        .trim()
        .notEmpty()
        .withMessage("lastname field couldn't be empty.")
        .bail()
        .isString()
        .withMessage("lname should be a string")
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in lname not allowed").bail(),


      check('email')
        .trim()
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('email must be valid email')
        .bail(),


      check("password")
        .trim()
        .notEmpty()
        .withMessage("password field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("password field is required.")
        .bail()
        .matches(/^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[A-Z])(?=.*\d)[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~A-Za-z\d ]{8,}$/)
        .withMessage("The password field should have a minimum of 8 characters with at least 1 uppercase letter, 1 number & 1 special character")
        .bail(),

      check("role")
        .trim()
        .notEmpty()
        .withMessage("role field couldn't be empty.")
        .isString()
        .isIn(["user", "admin"])
        .withMessage("role should be user or admin"),

    ]
  }

  login() {
    return [
    
      check('email')
        .trim()
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('email must be valid email')
        .bail(),


      check("password")
        .trim()
        .notEmpty()
        .withMessage("password field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("password field is required.")
        .bail()
        .matches(/^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[A-Z])(?=.*\d)[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~A-Za-z\d ]{8,}$/)
        .withMessage("The password field should have a minimum of 8 characters with at least 1 uppercase letter, 1 number & 1 special character")
        .bail()

    ]
  }

  createUpdateBook() {
    return [
    
      check("book_name")
      .trim()
      .notEmpty()
      .withMessage("book_name field couldn't be empty.")
      .bail()
      .isString()
      .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in book_name not allowed").bail(),

    check("author")
      .trim()
      .notEmpty()
      .withMessage("author field couldn't be empty.")
      .bail()
      .isString()
      .withMessage("lname should be a string")
      .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in author not allowed").bail(),

    ]
  }

  createUpdateTask() {
    return [
    
      check("task_name")
      .trim()
      .notEmpty()
      .withMessage("task_name field couldn't be empty.")
      .bail()
      .isString()
      .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in task_name not allowed").bail(),


    ]
  }

  }

export const userValidation = new UserValidation();

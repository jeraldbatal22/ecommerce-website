'use strict';

exports.isValidEmail = function (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.wrapErrorMongoose = function (error) {
  const errors = [];
  const err = JSON.parse(JSON.stringify(error));

  if (err.hasOwnProperty('errors')) {
    const err = JSON.parse(JSON.stringify(error.errors))
    for (const key in err) {
      errors.push(err[key].message)
    }
  } else {
    if (err.code === 11000) {
      const keyValue = Object.keys(err.keyValue)
      errors.push(`${err.keyValue[keyValue[0]]} is already exist`)
    }
  }

  return errors
}
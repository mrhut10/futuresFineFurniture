// https://eslint.org/docs/user-guide/getting-started
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  extends: ['wesbos'],
  rules: {
    'arrow-body-style': 0,
    'react/no-danger': 0,
  },
  root: true,
};
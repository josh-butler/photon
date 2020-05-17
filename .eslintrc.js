module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": "off",
    "arrow-parens": ["error", "as-needed"],
    "max-classes-per-file": ["error", 5]
  }
};
// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   },
//   extends: [
//     // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
//     // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
//     'plugin:vue/essential'
//   ],
//   // required to lint *.vue files
//   plugins: [
//     'vue'
//   ],
//   // add your custom rules here
//   rules: {}
// }

// export default {
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint'
    // parser: 'eslint'
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    // "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "no-unused-vars": "warn",
    "vue/no-v-html": "off", 
    "vue/html-closing-bracket-spacing": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/singleline-html-element-content-newline": "off",

    "semi": [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "no-empty-pattern": "off", // nuxt plugins require empty objects 
    // "prettier/prettier": ["error", { "semi": false }]
    "vue/require-default-prop": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-indent": ["error", 2, {
        "ignores": ['style']
      }],
    "vue/no-side-effects-in-computed-properties": "off", // does weird things with ES6 array operators (phagefutures) BUT might be a bad idea to turn off
  }
}


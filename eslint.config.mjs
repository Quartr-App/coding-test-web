import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import tsParser from "@typescript-eslint/parser"

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off"
    }
  }
]

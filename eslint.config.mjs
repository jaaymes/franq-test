import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importX from "eslint-plugin-import-x";
import vuePlugin from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignorePatterns: ['node_modules', 'dist', 'build', 'public', 'src/assets', 'src/components/ui'],
  files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      parser: tseslint.parser,
      tsconfigRootDir: import.meta.dirname,
      project: ["*/tsconfig.json", "*/tsconfig.node.json"],
    }
  },
  extends: [
    tseslint.configs.base,
    pluginJs.configs.recommended,
    eslintConfigPrettier,
    ...vuePlugin.configs['flat/essential'],
  ],
  plugins: {
    'import-x': importX,
    vue: vuePlugin
  },
  settings: {
    "import-x/internal-regex": "^@/",
    "import-x/parsers": {
      espree: [".js", ".cjs", ".mjs"],
      "@typescript-eslint/parser": [".ts"],
      "vue-eslint-parser": [".vue"],
    },
  },
  rules: {
    ...importX.configs.recommended.rules,
    ...importX.configs.typescript.rules,
    "no-undef": "off",
    "import-x/first": "error",
    "import-x/newline-after-import": "error",
    "import-x/no-unresolved": "off",
    "import-x/namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/require-default-prop": "off",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "always",
        "component": "always"
      }
    }],
    "import-x/order": [
      "warn",
      {
        groups: [
          "builtin", 
          "external", 
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        pathGroups: [
          {
            pattern: "vue",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "vitest",
            group: "builtin",
            position: "after",
          },
          {
            pattern: "@vitest/**",
            group: "builtin",
            position: "after",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/views/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/stores/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/composables/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/**/*",
            group: "internal",
            position: "before",
          },
          {
            pattern: "*",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import-x/default": "off",
    "import-x/no-named-as-default": "off",
    "import-x/no-named-as-default-member": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
})

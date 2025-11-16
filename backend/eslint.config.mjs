import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";


export default defineConfig([
    globalIgnores([
        "build/**/*",
        "node_modules/**/*",
        "dist/**/*",
    ]),
    {
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    eslintConfigPrettier,

    // ALLOW TYPED LINTER CHECKS
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    defaultProject: "tsconfig.json",
                    allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            // COMMON LINT RULES
            "no-useless-escape": "warn",
            "no-unsafe-optional-chaining": "warn",
            "no-case-declarations": "off",
            "no-extra-boolean-cast": "off",
            "no-empty": "warn",
            "no-prototype-builtins": "warn",
            "no-constant-condition": "warn",
            "arrow-body-style": "off",
            "prefer-arrow-callback": "off",
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
            ],
            "no-duplicate-imports": "warn",
            "no-control-regex": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^next$",
                },
            ],
            "@typescript-eslint/no-var-requires": "warn",
            "@typescript-eslint/no-require-imports": "warn",
            "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true, allowShortCircuit: true }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-object-type": "off",
            "sort-keys": "off",
            "sort-imports": "off",
            "no-constant-binary-expression": "warn",

            // TYPED LINT RULES
            "@typescript-eslint/no-misused-spread": ["warn", { allow: ["Error"] }],
            "@typescript-eslint/no-mixed-enums": "error",
            "no-shadow": "off",
            "@typescript-eslint/switch-exhaustiveness-check": "warn",
        },
    },
]);

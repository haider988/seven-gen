import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive-deps
      "react-hooks/rules-of-hooks": "off", // Disable rules-of-hooks
      "@typescript-eslint/no-unused-vars": "warn", // Change unused-vars to warning
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
    },
  },
];

export default eslintConfig;

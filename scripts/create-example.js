const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const validCategories = ["fundamental", "technical", "business"];
const [category, projectName] = process.argv.slice(2);
if (!category || !projectName || !validCategories.includes(category)) {
  console.error("Usage: pnpm run create:example <category> <projectName>");
  console.error("Valid categories:", validCategories.join(", "));

  process.exit(1);
}

const projectDir = path.join("apps", category, projectName);
const appsCategoryDir = path.join("apps", category);

try {
  fs.mkdirSync(appsCategoryDir, { recursive: true });

  execSync(`nest new ${projectName} --package-manager=pnpm --skip-git`, {
    cwd: appsCategoryDir,
    stdio: "inherit",
  });

  console.log(`✅ Project created at ${projectDir}`);
} catch (error) {
  console.error("🚨 Creation failed:", error);

  process.exit(1);
}

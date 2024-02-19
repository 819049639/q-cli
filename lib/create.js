const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./Generator");
const { wrapLoading } = require("./utils");

module.exports = async function (name, options) {
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);

  if (fs.existsSync(targetAir)) {
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message:
            "Target directory already exists. Do you want to overwrite it?",
          choices: [
            { name: "Overwrite", value: "Overwrite" },
            { name: "Cancel", value: false },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === "Overwrite") {
        await wrapLoading(() => fs.remove(targetAir), "removing...");
      }
    }
  }

  const generator = new Generator(name, targetAir);
  generator.create();
};

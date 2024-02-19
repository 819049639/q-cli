const ora = require("ora");

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    console.error(error);
    spinner.fail("request failed");
  }
}

module.exports = {
  wrapLoading,
};

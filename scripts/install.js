const path = require("path");
const execSync = require("child_process").execSync;
const { libPackages } = require('../config/libpackPaths')
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());

function exec(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

const cwd = process.cwd();
console.log(libPackages);
const config = require(`${libPackages}`)

if (config.packages.length > 0) {
  config.packages.forEach(packageName => {
    process.chdir(path.resolve(appDirectory, "packages/" + packageName));
    exec("npm i");
  });
} else {
  console.error("! error not foud packages in libpacks config file");
}

if (config.examples.length > 0) {
  config.examples.forEach(packageName => {
    process.chdir(path.resolve(appDirectory, "examples/" + packageName));
    exec("npm i");
  });
} else {
  console.error("! error not foud examples in libpacks config file");
}


process.chdir(cwd);

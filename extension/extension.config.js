const path = require("path");

class MonorepoPlugin {
  apply(compiler) {
    const monorepoRoot = path.join(process.cwd(), "..");

    // Maybe let's try adding swc-loader ourselves?
    compiler.options.module.rules = [
      {
        test: /\.(js|mjs|jsx|mjsx|ts|mts|tsx|mtsx)$/,
        include: [monorepoRoot],
        exclude: /node_modules/,
        use: {
          loader: require.resolve("swc-loader"),
          options: {
            sync: true,
            module: {
              type: "es6",
            },
            minify: compiler.options.mode === "production",
            isModule: true,
            jsc: {
              target: "es2016",
              parser: {
                syntax: "typescript",
                tsx: true,
                jsx: true,
                dynamicImport: true,
              },
              transform: {
                react: {
                  development: compiler.options.mode === "development",
                  refresh: compiler.options.mode === "development",
                  runtime: "automatic",
                  importSource: "react",
                },
              },
            },
          },
        },
      },
      ...compiler.options.module.rules,
    ];
  }
}

/** @type {import('extension').FileConfig} */
module.exports = {
  config: (config) => {
    config.plugins.push(new MonorepoPlugin());

    return config;
  },
};

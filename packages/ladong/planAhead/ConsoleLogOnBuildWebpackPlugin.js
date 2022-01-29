const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

// class ConsoleLogOnBuildWebpackPlugin {
//   apply(compiler) {
//     compiler.hooks.run.tap(pluginName, (compilation) => {
//       console.log('The webpack build process is starting!');
//     });
//   }
// }
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('This is my custom webpack plugin');
      console.log('Let me see what in the compilation');
      console.log(JSON.stringify(compilation));
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
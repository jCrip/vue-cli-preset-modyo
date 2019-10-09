/** @typedef {import('@vue/cli/lib/GeneratorAPI') GeneratorAPI} */
/**
 * @param {GeneratorAPI} api
 * @param {any} options
 */


module.exports = ( api ) => {
  try {
    /*
     * extend packages
     */

    const pkg = {
      dependencies: {
        // '@modyo/commons': '1.0.0',
        // '@modyo/vue-cli-plugin-cmds': '1.0.0'
      },
    }

    api.extendPackage( pkg )

    /*
     * Modify main.js
     */
    api.injectImports( api.entryFile, 'import \'./vee-validate-conf\';' )
    api.injectImports( api.entryFile, 'import \'bootstrap/dist/css/bootstrap.min.css\';' )

    /*
     * render templates
     */

    api.render( './templates' )
  } catch ( e ) {
    api.exitLog( `unexpected error in preset: ${e.message}`, 'error' )
  }
}

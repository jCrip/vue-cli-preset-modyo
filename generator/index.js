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
        axios: '0.19.0',
        bootstrap: '4.3.1',
        'v-calendar': '^1.0.0-beta.22',
        'currency.js': '1.2.2',
        'date-fns': '2.4.1',
        'v-money': '0.8.1',
        'vee-validate': '3.0.8',
        'vue-multiselect': '2.1.6',
      },
    }

    api.extendPackage( pkg )

    /*
     * Modify main.js
     */
    const file = 'src/main.js'
    api.injectImports( file, 'import \'./vee-validate-conf\';' )

    /*
     * render templates
     */

    api.render( './templates' )
  } catch ( e ) {
    api.exitLog( `unexpected error in preset: ${e.message}`, 'error' )
  }
}

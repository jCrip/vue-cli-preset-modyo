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

    api.onCreateComplete(() => {
      const {
        EOL,
        // eslint-disable-next-line global-require
      } = require( 'os' )
      // eslint-disable-next-line global-require
      const fs = require( 'fs' )
      const contentMain = fs.readFileSync( api.entryFile, {
        encoding: 'utf-8',
      })
      const lines = contentMain.split( /\r?\n/g )

      const renderIndex = lines.findIndex(( line ) => line.match( /Vue\.config/ ))
      lines[renderIndex] += `${EOL}  Vue.directive('rut', rutDirective);`

      fs.writeFileSync( api.entryFile, lines.join( EOL ), {
        encoding: 'utf-8',
      })
    })
  } catch ( e ) {
    api.exitLog( `unexpected error in preset: ${e.message}`, 'error' )
  }
}

/** @typedef {import('@vue/cli/lib/GeneratorAPI') GeneratorAPI} */
/**
 * @param {GeneratorAPI} api
 * @param {any} options
 */

const slugify = require( '../slugify' )

module.exports = ( api, options ) => {
  try {
    /*
     * extend packages
     */

    const pkg = {
      dependencies: {
        // TODO: uncomment when ready
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

    api.onCreateComplete(() => {
      const files = []
      files.push( api.resolve( 'public/index.html' ))
      files.push( api.resolve( 'src/main.js' ))
      const fs = require( 'fs' )
      files.forEach(( file ) => {
        let content = fs.readFileSync( file, { encoding: 'utf-8' })
        content = content.replace( /app/g, slugify( options.name ))
        fs.writeFileSync( file, content, { encoding: 'utf-8' })
      })
    })
  } catch ( e ) {
    api.exitLog( `unexpected error in preset: ${e.message}`, 'error' )
  }
}

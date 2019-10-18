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
        // '@modyo/financial-commons': '1.0.0',
        axios: '^0.19.0',
        bootstrap: '^4.3.1',
        'currency.js': '^1.2.2',
        'date-fns': '^2.5.0',
        'v-money': '^0.8.1',
        'vee-validate': '^3.0.11',
        'vue-multiselect': '^2.1.6',
        '@mathieustan/vue-datepicker': '^0.1.9',

      },
    }

    api.extendPackage( pkg )

    /*
     * Modify main.js
     */
    api.injectImports( api.entryFile, 'import \'./vee-validate-conf\';' )
    api.injectImports( api.entryFile, 'import \'bootstrap/scss/bootstrap.scss\';' )

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

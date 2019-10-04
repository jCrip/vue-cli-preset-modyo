import {
  extend,
  configure,
} from 'vee-validate'
import {
  required,
  email,
  numeric,
  min_value,
  max_value,
} from 'vee-validate/dist/rules'

import {
  rutUtilities,
} from './helpers/rut'

import i18n from './i18n'

configure({
  defaultMessage: (_, values) => i18n.t(`validations.${values._rule_}`, values),
})

extend('required', required)
extend('email', email)
extend('numeric', numeric)
extend('min_value', min_value)
extend('max_value', max_value)

extend('rut', {
  validate: value => rutUtilities.validate(value),
  message: 'El {_field_} ingresado no es valido',
})

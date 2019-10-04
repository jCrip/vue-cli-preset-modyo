export const rutUtilities = {
  clean(value) {
    if (typeof _value !== 'string') {
      value = value.toString();
    }
    return value.replace(/^0+|[^0-9kK]+/g, '').toUpperCase().substring(0, 9);
  },

  format(_value, _default) {
    _value = this.clean(_value);

    if (!_value) {
      return _default;
    }

    if (_value.length <= 1) {
      return _value;
    }

    let result = `${_value.slice(-4, -1)}-${_value.substr(_value.length - 1)}`;
    for (let i = 4; i < _value.length; i += 3) {
      result = `${_value.slice(-3 - i, -i)}.${result}`;
    }
    return result;
  },

  validate(rut) {
    if (typeof (rut) !== 'string') {
      return false;
    }
    const cRut = rut.replace(/[\.-]/g, '');
    const cDv = cRut.charAt(cRut.length - 1).toUpperCase();
    let nRut = parseInt(cRut.substr(0, cRut.length - 1), 10);
    if (isNaN(nRut)) {
      return false;
    }
    let sum = 0;
    let factor = 2;
    nRut = nRut.toString();
    for (let i = nRut.length - 1; i >= 0; i--) {
      sum += nRut.charAt(i) * factor;
      factor = (factor + 1) % 8 || 2;
    }
    let computedDv = 0;

    switch (sum % 11) {
      case 1:
        computedDv = 'k';
        break;
      case 0:
        computedDv = 0;
        break;
      default:
        computedDv = 11 - (sum % 11);
        break;
    }

    return computedDv.toString().toUpperCase() === cDv.toString().toUpperCase();
  },
};

export const rutDirective = {
  bind(el, binding, vnode) {
    el.addEventListener('blur', (e) => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
      console.log('hola', rutUtilities.validate(el.value));
    });
    el.addEventListener('keyup', (e) => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
      console.log('hola', rutUtilities.validate(el.value));
    });
  },
  updated(el, binding) {
    console.log('updated');
  },
};

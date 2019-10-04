import Vue from 'vue';
import currency from 'currency.js';


const CLP = value => currency(value, {
  symbol: '$',
  precision: 0,
  separator: '.',
  decimal: ',',
  formatWithSymbol: true,
});

const USD = value => currency(value, {
  symbol: 'US$',
  separator: '.',
  decimal: ',',
  formatWithSymbol: true,
});

const UF = value => currency(value, {
  symbol: 'UF ',
  separator: '.',
  decimal: ',',
  formatWithSymbol: true,
});

const EURO = value => currency(value, {
  symbol: '€ ',
  separator: '.',
  decimal: ',',
  formatWithSymbol: true,
});

Vue.filter('currency', (value, moneda = 'CLP') => {
  if (moneda.toUpperCase() === 'UF') {
    return UF(parseFloat(value)).format();
  }
  if (moneda.toUpperCase() === 'USD') {
    return USD(parseFloat(value)).format();
  }
  if (moneda.toUpperCase() === 'EURO') {
    return EURO(parseFloat(value)).format();
  }
  return CLP(parseFloat(value)).format();
});

// Vue.filter('ccard', (value, hide = false) => {
//   const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//   if (hide) {
//     return `...${value.substr(-4, 4)}`;
//   }

//   const matches = v.match(/\d{4,16}/g);
//   const match = (matches && matches[0]) || '';
//   const parts = [];
//   for (let i = 0, len = match.length; i < len; i += 4) {
//     parts.push(match.substring(i, i + 4));
//   }
//   if (parts.length) {
//     return parts.join(' ');
//   }
//   return value;
// });

// Vue.filter('formatNum', value => parseInt(value, 10).toLocaleString('es-CL'));

// // Vue.filter('date', (value, format = 'DD/MM/YYYY') => dateFns.format(dateFns.parse(value), format));

// Vue.filter('slug', (originalValue) => {
//   let newValue = originalValue.replace(/^\s+|\s+$/g, ''); // trim
//   newValue = newValue.toLowerCase();

//   // remove accents, swap ñ for n, etc
//   const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
//   const to = 'aaaaaeeeeeiiiiooooouuuunc------';
//   for (let i = 0, l = from.length; i < l; i += 1) {
//     newValue = newValue.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
//   }

//   newValue = newValue.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
//     .replace(/\s+/g, '-') // collapse whitespace and replace by -
//     .replace(/-+/g, '-'); // collapse dashes

//   return newValue;
// });

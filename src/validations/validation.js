export function validateAlphabet(value) {
  return /^[\u0E00-\u0E7Fa-zA-Z']+$/.test(value) ? true : false
}

export function validateAmount(value) {
  return value > 0 ? true : false
}

export function validateSymbol(symbol) {
    return symbol !== "" && /^[A-Z0-9]{1,5}$/.test(symbol);
  }
  
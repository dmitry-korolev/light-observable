const getSymbol = (name: string) => {
  return (typeof Symbol === 'function' && (Symbol as any)[name]) || '@@' + name
}

export const $$iterator = getSymbol('iterator')
export const $$observable = getSymbol('observable')

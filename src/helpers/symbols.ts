export const getSymbol = (name: string) => {
  return (typeof Symbol === 'function' && (Symbol as any)[name]) || '@@' + name
}

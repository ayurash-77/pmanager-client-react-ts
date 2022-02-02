export const ErrorList = (errors: string | any[]): JSX.Element | unknown => {
  const iterable = typeof errors === 'object'
  return iterable ? (
    errors.map((item, index) => (
      <div className="error" key={index}>
        {item}
      </div>
    ))
  ) : (
    <div className="error">{errors}</div>
  )
}

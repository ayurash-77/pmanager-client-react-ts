import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ ...props }: Props): JSX.Element => {
  return (
    <>
      <div {...props}>FOOTER</div>
    </>
  )
}

export default Footer

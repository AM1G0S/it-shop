import React, { FC } from 'react'

interface IProps {
  size: number
}

const CloseIcon: FC<IProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#816E4C" />
      <path
        d="M9.44105 8.24725C9.1114 7.91759 8.57692 7.91758 8.24725 8.24723C7.91759 8.57687 7.91758 9.11134 8.24724 9.441L14.8062 16L8.24724 22.559C7.91758 22.8887 7.91759 23.4231 8.24725 23.7528C8.57692 24.0824 9.1114 24.0824 9.44105 23.7528L16 17.1938L22.5589 23.7528C22.8886 24.0824 23.4231 24.0824 23.7527 23.7528C24.0824 23.4231 24.0824 22.8887 23.7528 22.559L17.1938 16L23.7528 9.441C24.0824 9.11134 24.0824 8.57687 23.7527 8.24723C23.4231 7.91758 22.8886 7.91759 22.5589 8.24725L16 14.8062L9.44105 8.24725Z"
        fill="white"
      />
    </svg>
  )
}

export default CloseIcon

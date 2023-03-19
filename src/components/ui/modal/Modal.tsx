import React, { FC, ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import { StyledModal } from './styled'
import { RootModalOverlay } from '@root/RootModalOverlay'

interface IProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void | typeof isOpen
  children: ReactNode
}

const Modal: FC<IProps> = ({ isOpen, setIsOpen, children }) => {
  const onClose = () => setIsOpen(false)

  // чтобы по умолчанию не рендерились все модалки
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <RootModalOverlay>
        <Dialog.Panel>
          <StyledModal>{children}</StyledModal>
        </Dialog.Panel>
      </RootModalOverlay>
    </Dialog>
  )
}

export default Modal

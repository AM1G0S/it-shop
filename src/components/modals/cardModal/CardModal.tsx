import React, { Dispatch, FC, useEffect, useRef, useState } from 'react'
import Modal from '@ui/modal/Modal'
import { IProduct } from '@/types/IProduct'
import {
  Body,
  Button,
  CardModalWrapper,
  CloseModal,
  Description,
  Footer,
  ImgBox,
  Price,
  Selected,
  SizeInput,
  SizeLabel,
  Sizes,
  Title,
} from './styled'
import { useCountBox } from '@/hooks/useCountBox'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { addProduct } from '@/store/cart/cartSlice'
import CloseIcon from '@ui/icons/CloseIcon'
import { RootCountBox } from '@root/RootCountBox'
import { RootCountInput } from '@root/RootCountInput'
import { RootCountBtn } from '@root/RootCountBtn'
import { setIsOpenCart } from '@/store/dialogWindows/dialogWindowsSlice'

interface IProps {
  product: IProduct
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
}

const CardModal: FC<IProps> = ({ isOpen, setIsOpen, product }) => {
  const dispatch = useAppDispatch()

  const sizes = ['xs', 's', 'm', 'l', 'xl']
  const [size, setSize] = useState(sizes[0])
  const {
    count,
    setCount,
    price,
    increment,
    decrement,
    handleCountInputChange,
  } = useCountBox(product)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const productToCart = {
      id: product.id + size,
      img: product.image,
      name: product.name,
      price: product.price,
      count,
      size,
    }
    dispatch(addProduct(productToCart))
    dispatch(setIsOpenCart(true))
    setIsOpen(false)
    setCount(1)
  }

  // далее код, передвигающий ползунок в размерах
  const [position, setPosition] = useState(0)
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    if (labelRef.current) {
      setPosition(labelRef.current.offsetLeft)
    }
  }, [size])

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CardModalWrapper>
        <ImgBox>
          <img src={product.image} alt={product.name} />
        </ImgBox>

        <CloseModal>
          <CloseIcon size={24} />
        </CloseModal>

        <Body>
          <Title>{product.name}</Title>
          <Description>{product.description}</Description>

          <Sizes>
            <Selected position={position}></Selected>
            {sizes.map(value => (
              <React.Fragment key={value}>
                <SizeInput
                  type="radio"
                  id={`sizes__input_${value}`}
                  name={'size'}
                  value={value}
                  readOnly={true}
                  checked={value === size}
                />
                <SizeLabel
                  ref={value === size ? labelRef : null}
                  onClick={() => setSize(value)}
                  htmlFor={`sizes__input_${value}`}>
                  {value}
                </SizeLabel>
              </React.Fragment>
            ))}
          </Sizes>
        </Body>

        <Footer onSubmit={handleSubmit}>
          <Price>{price.toLocaleString('ru')} ₽</Price>
          <RootCountBox>
            <RootCountBtn action="minus" onClick={decrement}>
              -
            </RootCountBtn>
            <RootCountInput
              type="text"
              inputMode="numeric"
              value={count}
              onChange={handleCountInputChange}
              maxLength={3}
            />
            <RootCountBtn action="plus" onClick={increment}>
              +
            </RootCountBtn>
          </RootCountBox>
          <Button type="submit" variant="outlined">
            В корзину
          </Button>
        </Footer>
      </CardModalWrapper>
    </Modal>
  )
}

export default CardModal

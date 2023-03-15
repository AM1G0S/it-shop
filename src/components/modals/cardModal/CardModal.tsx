import React, { FC, useEffect, useRef, useState } from 'react'
import Modal from '@ui/modal/Modal'
import { IProduct } from '@/types/IProduct'
import {
  Body,
  Button,
  CardModalWrapper,
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
import { RootCountBox, RootCountBtn, RootCountInput } from '@/styled/root'
import { useCountBox } from '@/hooks/useCountBox'

interface IProps {
  product: IProduct
  isOpenCard: boolean
  setIsOpenCard: (isOpenCard: boolean) => void
}

const CardModal: FC<IProps> = ({ isOpenCard, setIsOpenCard, product }) => {
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
    setIsOpenCard(false)
    setCount(1)
    console.log(
      `товар: ${product.name} на сумму: ${price}\nразмер: ${size}\nколичествр: ${count}`
    )
  }

  // далее код, передвигающий ползунок в размерах
  const [position, setPosition] = useState(0)
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    if (labelRef.current) {
      setPosition(labelRef.current.offsetLeft)
    }
  }, [size])

  return (
    <Modal isOpen={isOpenCard} setIsOpen={() => setIsOpenCard(false)}>
      <CardModalWrapper>
        <ImgBox>
          <img src={product.image} alt={product.name} />
        </ImgBox>

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
          <Button type="submit" variant="main">
            В корзину
          </Button>
        </Footer>
      </CardModalWrapper>
    </Modal>
  )
}

export default CardModal

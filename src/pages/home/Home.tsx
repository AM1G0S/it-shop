import React, { FC, useLayoutEffect } from 'react'
import Card from '@ui/card/Card'
import { RootTitle } from '@root/RootTitle'
import RecommendCard from '@ui/recommendCard/RecommendCard'
import { useAppSelector } from '@/hooks/reduxHooks'
import {
  CardsItems,
  Catalog,
  HeroSection,
  HeroSectionContainer,
  HeroSectionInfo,
  HeroSectionLink,
  HeroSectionLogo,
  RecommendCardsContainer,
  Subtitle,
  Title,
} from './styled'
import { ReactComponent as WolfIcon } from '@/assets/svg/wolf.svg'
import { RootContainer } from '@root/RootContainer'

const Home: FC = () => {
  const products = useAppSelector(state => state.product.products)
  const recommended = useAppSelector(state => state.recommended.products)
  const headerHeight = useAppSelector(state => state.header.height)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const catalog = document.getElementById('catalog')
    e.preventDefault()
    catalog &&
      catalog.scrollIntoView({
        behavior: 'smooth',
      })
  }

  useLayoutEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <HeroSection headerHeight={headerHeight}>
        <HeroSectionContainer>
          <HeroSectionInfo>
            <Title>
              Первый <span>мерч-шоп</span> гармонии с природой
            </Title>

            <Subtitle>
              Добро пожаловать в уникальный интернет-магазин, где каждая покупка
              становится эксклюзивом! Наш магазин
              представляет собой настоящий рай для ценителей качественного
              мерчендайза, которые хотят приобрести не только стильную вещь, но
              и поддержать идею умной потребительской культуры.
            </Subtitle>
            <HeroSectionLink href="/" onClick={scrollToSection}>
              В каталог
            </HeroSectionLink>
          </HeroSectionInfo>

          <HeroSectionLogo>
            <WolfIcon />
          </HeroSectionLogo>
        </HeroSectionContainer>
      </HeroSection>

      <Catalog>
        <section>
          <RootTitle>Рекомендованные товары</RootTitle>

          <RecommendCardsContainer>
            {recommended.map(product => (
              <RecommendCard key={product.id} product={product} />
            ))}
          </RecommendCardsContainer>
        </section>

        <section>
          <RootContainer>
            <RootTitle id="catalog">Футболки и свитшоты</RootTitle>

            <CardsItems>
              {products.map(product => (
                <Card key={product.id} product={product} />
              ))}
            </CardsItems>
          </RootContainer>
        </section>
      </Catalog>
    </>
  )
}

export default Home

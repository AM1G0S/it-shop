import { colors } from '@/styled/vars'
import styled from 'styled-components'

export const CartWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    color: ${colors.white};
  }
`

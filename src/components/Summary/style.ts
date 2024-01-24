import styled, { css } from 'styled-components'

export const SummaryConatiner = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;

  margin-top: -5rem;

  @media (max-width: 1200px) {
    margin-top: -3rem;
  }

  @media (max-width: 1024px) {
    margin-top: -2.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    grid-template-columns: 1fr;
  }
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};
    `}
`

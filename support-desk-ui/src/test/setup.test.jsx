import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

function TestingSetupCheck() {
  return <p>Testing tools are ready</p>
}

describe('frontend testing setup', () => {
  it('renders React content in jsdom with jest-dom assertions', () => {
    render(<TestingSetupCheck />)

    expect(screen.getByText('Testing tools are ready')).toBeInTheDocument()
  })
})

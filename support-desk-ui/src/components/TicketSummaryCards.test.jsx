import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TicketSummaryCards from './TicketSummaryCards.jsx'

const sampleTickets = [
  { id: 'T001', status: 'OPEN' },
  { id: 'T002', status: 'OPEN' },
  { id: 'T003', status: 'IN_PROGRESS' },
  { id: 'T004', status: 'CLOSED' },
]

describe('TicketSummaryCards', () => {
  it('displays the total and correct count for every ticket status', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />)

    const expectedCounts = {
      'Total Tickets': '4',
      Open: '2',
      'In Progress': '1',
      Closed: '1',
    }

    Object.entries(expectedCounts).forEach(([label, count]) => {
      const card = screen.getByRole('article', { name: label })
      expect(within(card).getByText(label)).toBeInTheDocument()
      expect(within(card).getByText(count)).toBeInTheDocument()
    })
  })
})

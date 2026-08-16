import { describe, expect, it } from 'vitest'
import { filterTickets } from './tickets.js'

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' },
]

describe('filterTickets', () => {
  it('filters tickets by search text in the title or category', () => {
    expect(filterTickets(sampleTickets, 'email', 'ALL')).toEqual([sampleTickets[0]])
    expect(filterTickets(sampleTickets, 'hardware', 'ALL')).toEqual([sampleTickets[1]])
  })

  it('filters tickets by status', () => {
    expect(filterTickets(sampleTickets, '', 'CLOSED')).toEqual([sampleTickets[2]])
  })

  it('filters by search text and status together', () => {
    expect(filterTickets(sampleTickets, 'laptop', 'IN_PROGRESS')).toEqual([sampleTickets[1]])
    expect(filterTickets(sampleTickets, 'laptop', 'OPEN')).toEqual([])
  })

  it('returns all tickets when search is empty and status is ALL', () => {
    expect(filterTickets(sampleTickets, '', 'ALL')).toEqual(sampleTickets)
  })
})

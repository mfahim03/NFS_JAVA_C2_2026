import { describe, expect, it } from 'vitest'
import {
  formatTicketFormLabel,
  normalizeTicketFormPayload,
  validateTicketFormStep,
} from './ticketFormValidation.js'

const validValues = {
  title: 'Cannot access email',
  description: 'The mailbox rejects the user password.',
  category: 'Email',
  priority: 'HIGH',
  status: 'OPEN',
}

describe('ticket form validation', () => {
  it('returns required-field messages for blank text fields', () => {
    const errors = validateTicketFormStep({
      ...validValues,
      title: '   ',
      description: '',
      category: '\t',
    })

    expect(errors).toEqual({
      title: 'Title is required.',
      description: 'Description is required.',
      category: 'Category is required.',
    })
  })

  it('normalizes text fields without changing selected values', () => {
    expect(normalizeTicketFormPayload({
      ...validValues,
      title: '  Cannot access email  ',
      category: ' Email ',
    })).toEqual(validValues)
  })

  it('formats camel-case field names as readable labels', () => {
    expect(formatTicketFormLabel('createdBy')).toBe('Created By')
  })
})

const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']
const VALID_STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED']

export function validateTicketFormStep(formValues) {
  const errors = {}

  if (!formValues.title.trim()) errors.title = 'Title is required.'
  if (!formValues.description.trim()) errors.description = 'Description is required.'
  if (!formValues.category.trim()) errors.category = 'Category is required.'

  if (!formValues.priority) {
    errors.priority = 'Priority is required.'
  } else if (!VALID_PRIORITIES.includes(formValues.priority)) {
    errors.priority = 'Priority is invalid.'
  }

  if (!formValues.status) {
    errors.status = 'Status is required.'
  } else if (!VALID_STATUSES.includes(formValues.status)) {
    errors.status = 'Status is invalid.'
  }

  return errors
}

export function normalizeTicketFormPayload(formValues) {
  return {
    title: formValues.title.trim(),
    description: formValues.description.trim(),
    category: formValues.category.trim(),
    priority: formValues.priority,
    status: formValues.status,
  }
}

export function formatTicketFormLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (character) => character.toUpperCase())
}

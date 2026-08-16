import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../context/AuthContext.jsx'
import TicketFormWizard from './TicketFormWizard.jsx'

function renderForm(onSubmit = vi.fn()) {
  render(
    <AuthProvider>
      <TicketFormWizard onSubmit={onSubmit} />
    </AuthProvider>,
  )

  return onSubmit
}

async function completeRequiredFields(user) {
  await user.type(screen.getByLabelText('Title'), '  Cannot access email  ')
  await user.type(
    screen.getByLabelText('Description'),
    '  The mailbox rejects the user password.  ',
  )
  await user.type(screen.getByLabelText('Category'), '  Email  ')
  await user.selectOptions(screen.getByLabelText('Priority'), 'HIGH')
}

describe('TicketFormWizard', () => {
  it('shows inline errors and does not submit when required fields are empty', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()

    await user.click(screen.getByRole('button', { name: 'Create ticket' }))

    expect(screen.getByText('Title is required.')).toBeInTheDocument()
    expect(screen.getByText('Description is required.')).toBeInTheDocument()
    expect(screen.getByText('Category is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits clean, trimmed payload data when the form is valid', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm(vi.fn().mockResolvedValue(undefined))
    await completeRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Create ticket' }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Cannot access email',
      description: 'The mailbox rejects the user password.',
      category: 'Email',
      priority: 'HIGH',
      status: 'OPEN',
    })
  })

  it('shows a disabled saving button while submission is in progress', async () => {
    const user = userEvent.setup()
    let finishSubmission
    const onSubmit = vi.fn(() => new Promise((resolve) => {
      finishSubmission = resolve
    }))
    renderForm(onSubmit)
    await completeRequiredFields(user)

    await user.click(screen.getByRole('button', { name: 'Create ticket' }))

    const savingButton = screen.getByRole('button', { name: 'Saving...' })
    expect(savingButton).toBeDisabled()
    expect(onSubmit).toHaveBeenCalledOnce()

    finishSubmission()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Create ticket' })).toBeEnabled()
    })
  })
})

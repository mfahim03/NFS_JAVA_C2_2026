import { useState } from 'react'

const INITIAL_VALUES = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  status: 'OPEN',
}

function TicketFormWizard() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})

  function validate(formValues) {
    const nextErrors = {}

    if (!formValues.title.trim()) nextErrors.title = 'Title is required.'
    if (!formValues.description.trim()) nextErrors.description = 'Description is required.'
    if (!formValues.category.trim()) nextErrors.category = 'Category is required.'
    if (!formValues.priority) nextErrors.priority = 'Priority is required.'
    if (!formValues.status) nextErrors.status = 'Status is required.'

    return nextErrors
  }

  function handleChange(event) {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    setValues(nextValues)

    if (errors[name]) {
      const nextErrors = validate(nextValues)
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: nextErrors[name],
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      <label>
        Title
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Briefly describe the issue"
          required
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <span className="field-error" id="title-error">{errors.title}</span>}
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Add the details needed to investigate"
          rows="6"
          required
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <span className="field-error" id="description-error">{errors.description}</span>
        )}
      </label>

      <label>
        Category
        <input
          name="category"
          value={values.category}
          onChange={handleChange}
          placeholder="For example: Hardware"
          required
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? 'category-error' : undefined}
        />
        {errors.category && (
          <span className="field-error" id="category-error">{errors.category}</span>
        )}
      </label>

      <div className="ticket-form-row">
        <label>
          Priority
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.priority)}
            aria-describedby={errors.priority ? 'priority-error' : undefined}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && (
            <span className="field-error" id="priority-error">{errors.priority}</span>
          )}
        </label>

        <label>
          Status
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.status)}
            aria-describedby={errors.status ? 'status-error' : undefined}
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="CLOSED">Closed</option>
          </select>
          {errors.status && (
            <span className="field-error" id="status-error">{errors.status}</span>
          )}
        </label>
      </div>

      <button className="primary-action" type="submit">
        Create ticket
      </button>
    </form>
  )
}

export default TicketFormWizard

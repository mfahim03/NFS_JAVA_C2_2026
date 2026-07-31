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

  function handleChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Briefly describe the issue"
          required
        />
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
        />
      </label>

      <label>
        Category
        <input
          name="category"
          value={values.category}
          onChange={handleChange}
          placeholder="For example: Hardware"
          required
        />
      </label>

      <div className="ticket-form-row">
        <label>
          Priority
          <select name="priority" value={values.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={values.status} onChange={handleChange}>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
      </div>

      <button className="primary-action" type="submit">
        Create ticket
      </button>
    </form>
  )
}

export default TicketFormWizard

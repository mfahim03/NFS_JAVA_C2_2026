import TicketFormWizard from '../components/TicketFormWizard'

function TicketFormPage() {
  return (
    <section className="form-page">
      <div className="dashboard-intro">
        <div>
          <p className="eyebrow">Support request</p>
          <h2>Create a ticket</h2>
        </div>
        <p>Provide enough detail for the support team to begin investigating.</p>
      </div>

      <div className="page-card">
        <TicketFormWizard />
      </div>
    </section>
  )
}

export default TicketFormPage

import ErrorMessage from './ErrorMessage'
import LoadingMessage from './LoadingMessage'

function ApiInfoCard({ loading, error, apiInfo }) {
  return (
    <section className="api-card" aria-labelledby="backend-heading">
      <div className="api-card-heading">
        <div>
          <p className="eyebrow">Live connection</p>
          <h2 id="backend-heading">Backend API</h2>
        </div>
        {!loading && !error && apiInfo && (
          <span className="connection-status">
            <span aria-hidden="true" />
            Connected
          </span>
        )}
      </div>

      {loading && <LoadingMessage message="Loading API information…" />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && apiInfo && (
        <div className="api-info">
          <div>
            <span>Application</span>
            <strong>{apiInfo.application}</strong>
          </div>
          <div>
            <span>Version</span>
            <strong>{apiInfo.version}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="api-status-value">{apiInfo.status}</strong>
          </div>
          {apiInfo.description && (
            <p className="api-description">{apiInfo.description}</p>
          )}
        </div>
      )}
    </section>
  )
}

export default ApiInfoCard

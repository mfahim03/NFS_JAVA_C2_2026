function ErrorMessage({ message }) {
  return (
    <div className="api-message error-message" role="alert">
      <span className="message-icon" aria-hidden="true">!</span>
      <div>
        <strong>Backend unavailable</strong>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage

function LoadingMessage({ message }) {
  return (
    <div className="api-message loading-message" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingMessage

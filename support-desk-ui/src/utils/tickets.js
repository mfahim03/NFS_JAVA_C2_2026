export function filterTickets(tickets, searchText, statusFilter) {
  const normalizedSearch = searchText.trim().toLowerCase()

  return tickets.filter((ticket) => {
    const matchesSearch =
      normalizedSearch === '' ||
      ticket.title.toLowerCase().includes(normalizedSearch) ||
      ticket.category.toLowerCase().includes(normalizedSearch)
    const matchesStatus =
      statusFilter === 'ALL' || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })
}

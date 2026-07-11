package com.example.assettracker.service;

import com.example.assettracker.dto.CreateTicketRequest;
import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.exception.ResourceNotFoundException;
import com.example.assettracker.model.Ticket;
import com.example.assettracker.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TicketService {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getTickets(String status, String priority, String category) {
        log.debug("Fetching tickets with filters - status={}, priority={}, category={}", status, priority, category);
        List<Ticket> tickets;

        if (hasValue(status)) {
            tickets = ticketRepository.findByStatusIgnoreCase(status.trim());
        } else if (hasValue(priority)) {
            tickets = ticketRepository.findByPriorityIgnoreCase(priority.trim());
        } else if (hasValue(category)) {
            tickets = ticketRepository.findByCategoryIgnoreCase(category.trim());
        } else {
            tickets = ticketRepository.findAll();
        }

        List<TicketResponse> responses = tickets.stream().map(this::toResponse).toList();
        log.info("Fetched {} tickets (status='{}', priority='{}', category='{}')", responses.size(), status, priority, category);
        return responses;
    }

    public TicketResponse getTicketById(String id) {
        log.debug("Fetching ticket by id={}", id);
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
        return toResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket(
                request.title().trim(),
                request.description().trim(),
                request.category().trim(),
                request.priority().trim().toUpperCase(),
                "OPEN",
                request.createdBy().trim(),
                LocalDate.now()
        );
        Ticket saved = ticketRepository.save(ticket);
        log.info("Created ticket id={}", saved.getId());
        return toResponse(saved);
    }

    public Page<TicketResponse> getTicketsPaged(int page, int size, String sortBy, String direction) {
        log.debug("Fetching paged tickets - page={}, size={}, sortBy={}, direction={}", page, size, sortBy, direction);
        Sort.Direction dir = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortBy));
        Page<Ticket> pageResult = ticketRepository.findAll(pageable);
        Page<TicketResponse> mapped = pageResult.map(this::toResponse);
        log.info("Paged tickets: pageNumber={}, pageSize={}, totalElements={}, totalPages={}", mapped.getNumber(), mapped.getSize(), mapped.getTotalElements(), mapped.getTotalPages());
        return mapped;
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }

    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(), ticket.getTitle(), ticket.getDescription(), ticket.getCategory(),
                ticket.getPriority(), ticket.getStatus(), ticket.getCreatedBy(), ticket.getCreatedAt()
        );
    }

}

package com.example.assettracker.service;

import com.example.assettracker.dto.CreateTicketRequest;
import com.example.assettracker.dto.TicketResponse;
import com.example.assettracker.dto.UpdateTicketRequest;
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

    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getTickets(String status, String priority, String category) {
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

        return tickets.stream().map(this::toResponse).toList();
    }

    public TicketResponse getTicketById(String id) {
        return toResponse(findTicketOrThrow(id));
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket(
                normalizeRequired(request.title()),
                normalizeRequired(request.description()),
                normalizeRequired(request.category()),
                normalizePriority(request.priority()),
                normalizeStatus(request.status()),
                normalizeRequired(request.createdBy()),
                LocalDate.now()
        );
        Ticket saved = ticketRepository.save(ticket);
        logger.info("Created ticket id={}", saved.getId());
        return toResponse(saved);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(normalizeRequired(request.title()));
        ticket.setDescription(normalizeRequired(request.description()));
        ticket.setCategory(normalizeRequired(request.category()));
        ticket.setPriority(normalizePriority(request.priority()));
        ticket.setStatus(normalizeStatus(request.status()));

        Ticket updated = ticketRepository.save(ticket);
        logger.info("Updated ticket id={}", updated.getId());
        return toResponse(updated);
    }

    public Page<TicketResponse> getTicketsPaged(int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction)
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return ticketRepository.findAll(pageable).map(this::toResponse);
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }

    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    private String normalizeRequired(String value) {
        return value.trim();
    }

    private String normalizePriority(String priority) {
        return normalizeRequired(priority).toUpperCase();
    }

    private String normalizeStatus(String status) {
        return normalizeRequired(status).toUpperCase();
    }

    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(), ticket.getTitle(), ticket.getDescription(), ticket.getCategory(),
                ticket.getPriority(), ticket.getStatus(), ticket.getCreatedBy(), ticket.getCreatedAt()
        );
    }
}

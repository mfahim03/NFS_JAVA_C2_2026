package com.example.supportdesk.service;

import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    private final List<TicketResponse> tickets = new ArrayList<>(List.of(
        new TicketResponse(
            "T001",
            "Cannot access email",
            "User cannot login to company email account.",
            "Email",
            "HIGH",
            "OPEN",
            "amir@example.com",
            "2026-07-03"
        ),
        new TicketResponse(
            "T002",
            "Laptop is slow",
            "Laptop performance is very slow after boot.",
            "Hardware",
            "MEDIUM",
            "OPEN",
            "sara@example.com",
            "2026-07-02"
        ),
        new TicketResponse(
            "T003",
            "VPN not connecting",
            "User cannot establish VPN connection from home.",
            "Network",
            "HIGH",
            "IN_PROGRESS",
            "john@example.com",
            "2026-07-01"
        )
    ));

    private int nextTicketNumber = 4;

    public List<TicketResponse> getAllTickets() {
        return List.copyOf(tickets);
    }

    public TicketResponse getTicketById(String id) {
        return tickets
            .stream()
            .filter(ticket -> ticket.getId().equalsIgnoreCase(id))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        String id = String.format("T%03d", nextTicketNumber++);
        String createdAt = LocalDate.now().toString();

        TicketResponse ticket = new TicketResponse(
            id,
            request.getTitle(),
            request.getDescription(),
            request.getCategory(),
            request.getPriority(),
            "OPEN",
            request.getCreatedBy(),
            createdAt
        );

        tickets.add(ticket);
        return ticket;
    }
}

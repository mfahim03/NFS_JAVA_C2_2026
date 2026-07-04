package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    public List<TicketResponse> getAllTickets() {
        return List.of(
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
        );
    }

    public TicketResponse getTicketById(String id) {
        return getAllTickets()
            .stream()
            .filter(ticket -> ticket.getId().equalsIgnoreCase(id))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Ticket " + id + " was not found"));
    }
}

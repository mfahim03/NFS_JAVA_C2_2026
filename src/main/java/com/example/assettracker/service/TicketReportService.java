package com.example.assettracker.service;

import com.example.assettracker.dto.ReportCountResponse;
import com.example.assettracker.model.Ticket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketReportService {

    private static final Logger logger = LoggerFactory.getLogger(TicketReportService.class);

    private final MongoTemplate mongoTemplate;

    public TicketReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> countTicketsByPriority() {
        logger.info("Generating ticket count report by priority");
        return countTicketsByField("priority");
    }

    public List<ReportCountResponse> countTicketsByStatus() {
        logger.info("Generating ticket count report by status");
        return countTicketsByField("status");
    }

    private List<ReportCountResponse> countTicketsByField(String field) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group(field).count().as("count"),
                Aggregation.project("count").and("_id").as("label"),
                Aggregation.sort(Sort.Direction.ASC, "label")
        );

        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
                aggregation,
                Ticket.class,
                ReportCountResponse.class
        );

        return results.getMappedResults();
    }
}

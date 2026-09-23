package com.even.service;

import com.even.entity.Settlement;
import com.even.repository.SettlementRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SettlementService {


private final SettlementRepository settlementRepository;

public SettlementService(
        SettlementRepository settlementRepository) {

    this.settlementRepository = settlementRepository;
}

public Settlement createSettlement(
        Long groupId,
        Long paidBy,
        Long paidTo,
        BigDecimal amount) {

    if (paidBy.equals(paidTo)) {
        throw new RuntimeException(
                "You cannot settle with yourself");
    }

    if (amount == null ||
            amount.compareTo(BigDecimal.ZERO) <= 0) {

        throw new RuntimeException(
                "Settlement amount must be greater than zero");
    }

    Settlement settlement =
            Settlement.builder()
                    .groupId(groupId)
                    .paidBy(paidBy)
                    .paidTo(paidTo)
                    .amount(amount)
                    .status("COMPLETED")
                    .build();

    return settlementRepository.save(
            settlement);
}

public List<Settlement> getGroupSettlements(
        Long groupId) {

    return settlementRepository
            .findByGroupIdOrderByCreatedAtDesc(
                    groupId);
}

public Settlement getSettlement(
        Long settlementId) {

    return settlementRepository
            .findById(settlementId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Settlement not found"));
}

public Settlement markCompleted(
        Long settlementId) {

    Settlement settlement =
            getSettlement(settlementId);

    settlement.setStatus("COMPLETED");

    return settlementRepository.save(
            settlement);
}


}

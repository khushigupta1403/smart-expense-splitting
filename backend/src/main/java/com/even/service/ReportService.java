package com.even.service;

import com.even.dto.ReportResponse;
import com.even.entity.Expense;
import com.even.entity.Settlement;
import com.even.repository.ExpenseRepository;
import com.even.repository.SettlementRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ReportService {


private final ExpenseRepository expenseRepository;
private final SettlementRepository settlementRepository;

public ReportService(
        ExpenseRepository expenseRepository,
        SettlementRepository settlementRepository) {

    this.expenseRepository = expenseRepository;
    this.settlementRepository = settlementRepository;
}

public ReportResponse getReport(Long userId) {

    List<Expense> expenses =
            expenseRepository
                    .findByPaidByOrderByCreatedAtDesc(
                            userId);

    List<Settlement> settlements =
            settlementRepository
                    .findByPaidBy(userId);

    BigDecimal totalExpenses =
            BigDecimal.ZERO;

    for (Expense expense : expenses) {

        totalExpenses =
                totalExpenses.add(
                        expense.getAmount());
    }

    BigDecimal totalSettlements =
            BigDecimal.ZERO;

    for (Settlement settlement :
            settlements) {

        if ("COMPLETED".equalsIgnoreCase(
                settlement.getStatus())) {

            totalSettlements =
                    totalSettlements.add(
                            settlement.getAmount());
        }
    }

    return new ReportResponse(
            totalExpenses,
            totalSettlements,
            expenses.size(),
            settlements.size(),
            expenses,
            settlements
    );
}

}

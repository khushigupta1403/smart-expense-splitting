package com.even.service;

import com.even.dto.AnalyticsResponse;
import com.even.entity.Expense;
import com.even.entity.ExpenseSplit;
import com.even.entity.Settlement;
import com.even.repository.ExpenseRepository;
import com.even.repository.ExpenseSplitRepository;
import com.even.repository.SettlementRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {


private final ExpenseRepository expenseRepository;
private final ExpenseSplitRepository expenseSplitRepository;
private final SettlementRepository settlementRepository;

public AnalyticsService(
        ExpenseRepository expenseRepository,
        ExpenseSplitRepository expenseSplitRepository,
        SettlementRepository settlementRepository) {

    this.expenseRepository = expenseRepository;
    this.expenseSplitRepository = expenseSplitRepository;
    this.settlementRepository = settlementRepository;
}

public AnalyticsResponse getAnalytics(Long userId) {

    List<Expense> expenses =
            expenseRepository
                    .findByPaidByOrderByCreatedAtDesc(
                            userId);

    BigDecimal totalSpent =
            BigDecimal.ZERO;

    Map<String, BigDecimal> monthlySpending =
            new LinkedHashMap<>();

    Map<String, BigDecimal> groupSpending =
            new LinkedHashMap<>();

    DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern("yyyy-MM");

    for (Expense expense : expenses) {

        BigDecimal amount =
                expense.getAmount();

        totalSpent =
                totalSpent.add(amount);

        String month =
                expense.getCreatedAt()
                        .format(formatter);

        monthlySpending.put(
                month,
                monthlySpending.getOrDefault(
                        month,
                        BigDecimal.ZERO)
                        .add(amount)
        );

        String group =
                "Group " + expense.getGroupId();

        groupSpending.put(
                group,
                groupSpending.getOrDefault(
                        group,
                        BigDecimal.ZERO)
                        .add(amount)
        );
    }

    BigDecimal totalOwed =
            BigDecimal.ZERO;

    List<ExpenseSplit> splits =
            expenseSplitRepository
                    .findByUserId(userId);

    for (ExpenseSplit split : splits) {

        Expense expense =
                expenseRepository
                        .findById(
                                split.getExpenseId())
                        .orElse(null);

        if (expense == null) {
            continue;
        }

        if (!expense.getPaidBy()
                .equals(userId)) {

            totalOwed =
                    totalOwed.add(
                            split.getAmount());
        }
    }

    BigDecimal totalReceived =
            BigDecimal.ZERO;

    List<Settlement> settlements =
            settlementRepository
                    .findByPaidTo(userId);

    for (Settlement settlement :
            settlements) {

        if ("COMPLETED".equalsIgnoreCase(
                settlement.getStatus())) {

            totalReceived =
                    totalReceived.add(
                            settlement.getAmount());
        }
    }

    return new AnalyticsResponse(
            totalSpent,
            totalOwed,
            totalReceived,
            monthlySpending,
            groupSpending
    );
}


}

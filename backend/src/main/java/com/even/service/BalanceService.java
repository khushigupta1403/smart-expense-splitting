package com.even.service;

import com.even.dto.BalanceResponse;
import com.even.entity.Expense;
import com.even.entity.ExpenseSplit;
import com.even.entity.Settlement;
import com.even.repository.ExpenseRepository;
import com.even.repository.ExpenseSplitRepository;
import com.even.repository.SettlementRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BalanceService {


private final ExpenseRepository expenseRepository;
private final ExpenseSplitRepository expenseSplitRepository;
private final SettlementRepository settlementRepository;

public BalanceService(
        ExpenseRepository expenseRepository,
        ExpenseSplitRepository expenseSplitRepository,
        SettlementRepository settlementRepository) {

    this.expenseRepository = expenseRepository;
    this.expenseSplitRepository = expenseSplitRepository;
    this.settlementRepository = settlementRepository;
}

public List<BalanceResponse> getGroupBalances(
        Long groupId) {

    List<Expense> expenses =
            expenseRepository
                    .findByGroupIdOrderByCreatedAtDesc(
                            groupId);

    Map<Long, BigDecimal> paidMap =
            new HashMap<>();

    Map<Long, BigDecimal> owedMap =
            new HashMap<>();

    // Calculate expense payments and amounts owed
    for (Expense expense : expenses) {

        Long payer = expense.getPaidBy();

        paidMap.put(
                payer,
                paidMap.getOrDefault(
                        payer,
                        BigDecimal.ZERO)
                        .add(expense.getAmount())
        );

        List<ExpenseSplit> splits =
                expenseSplitRepository
                        .findByExpenseId(
                                expense.getId());

        for (ExpenseSplit split : splits) {

            Long userId = split.getUserId();

            owedMap.put(
                    userId,
                    owedMap.getOrDefault(
                            userId,
                            BigDecimal.ZERO)
                            .add(split.getAmount())
            );
        }
    }

    // Add users affected by settlements
    List<Settlement> settlements =
            settlementRepository
                    .findByGroupIdOrderByCreatedAtDesc(
                            groupId);

    for (Settlement settlement : settlements) {

        if (!"COMPLETED".equalsIgnoreCase(
                settlement.getStatus())) {

            continue;
        }

        Long paidBy =
                settlement.getPaidBy();

        Long paidTo =
                settlement.getPaidTo();

        BigDecimal amount =
                settlement.getAmount();

        // Person who pays settlement:
        // their balance increases
        paidMap.put(
                paidBy,
                paidMap.getOrDefault(
                        paidBy,
                        BigDecimal.ZERO)
                        .add(amount)
        );

        // Person receiving settlement:
        // their owed amount increases
        owedMap.put(
                paidTo,
                owedMap.getOrDefault(
                        paidTo,
                        BigDecimal.ZERO)
                        .add(amount)
        );
    }

    Map<Long, Boolean> users =
            new HashMap<>();

    for (Long userId : paidMap.keySet()) {
        users.put(userId, true);
    }

    for (Long userId : owedMap.keySet()) {
        users.put(userId, true);
    }

    List<BalanceResponse> balances =
            new ArrayList<>();

    for (Long userId : users.keySet()) {

        BigDecimal paid =
                paidMap.getOrDefault(
                        userId,
                        BigDecimal.ZERO);

        BigDecimal owed =
                owedMap.getOrDefault(
                        userId,
                        BigDecimal.ZERO);

        BigDecimal balance =
                paid.subtract(owed);

        balances.add(
                new BalanceResponse(
                        userId,
                        paid,
                        owed,
                        balance
                )
        );
    }

    return balances;
}


}

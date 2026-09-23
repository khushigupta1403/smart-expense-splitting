package com.even.service;

import com.even.dto.DashboardResponse;
import com.even.entity.Expense;
import com.even.entity.ExpenseSplit;
import com.even.entity.GroupMember;
import com.even.entity.Settlement;
import com.even.repository.ExpenseRepository;
import com.even.repository.ExpenseSplitRepository;
import com.even.repository.GroupMemberRepository;
import com.even.repository.SettlementRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {


private final ExpenseRepository expenseRepository;
private final ExpenseSplitRepository expenseSplitRepository;
private final SettlementRepository settlementRepository;
private final GroupMemberRepository groupMemberRepository;

public DashboardService(
        ExpenseRepository expenseRepository,
        ExpenseSplitRepository expenseSplitRepository,
        SettlementRepository settlementRepository,
        GroupMemberRepository groupMemberRepository) {

    this.expenseRepository = expenseRepository;
    this.expenseSplitRepository = expenseSplitRepository;
    this.settlementRepository = settlementRepository;
    this.groupMemberRepository = groupMemberRepository;
}

public DashboardResponse getDashboard(Long userId) {

    List<GroupMember> memberships =
            groupMemberRepository
                    .findByUserId(userId);

    long totalGroups =
            memberships.size();

    List<Expense> expenses =
            expenseRepository
                    .findByPaidByOrderByCreatedAtDesc(
                            userId);

    BigDecimal totalPaid =
            BigDecimal.ZERO;

    BigDecimal totalExpenses =
            BigDecimal.ZERO;

    BigDecimal totalOwed =
            BigDecimal.ZERO;

    BigDecimal totalToReceive =
            BigDecimal.ZERO;

    for (Expense expense : expenses) {

        totalPaid =
                totalPaid.add(
                        expense.getAmount());

        totalExpenses =
                totalExpenses.add(
                        expense.getAmount());
    }

    List<ExpenseSplit> allSplits =
            expenseSplitRepository
                    .findByUserId(userId);

    for (ExpenseSplit split : allSplits) {

        Expense expense =
                expenseRepository
                        .findById(
                                split.getExpenseId())
                        .orElse(null);

        if (expense == null) {
            continue;
        }

        if (expense.getPaidBy()
                .equals(userId)) {

            totalToReceive =
                    totalToReceive.add(
                            split.getAmount());

        } else {

            totalOwed =
                    totalOwed.add(
                            split.getAmount());
        }
    }

    List<Settlement> settlementsPaid =
            settlementRepository
                    .findByPaidBy(userId);

    List<Settlement> settlementsReceived =
            settlementRepository
                    .findByPaidTo(userId);

    for (Settlement settlement :
            settlementsPaid) {

        if ("COMPLETED".equalsIgnoreCase(
                settlement.getStatus())) {

            totalPaid =
                    totalPaid.add(
                            settlement.getAmount());
        }
    }

    for (Settlement settlement :
            settlementsReceived) {

        if ("COMPLETED".equalsIgnoreCase(
                settlement.getStatus())) {

            totalToReceive =
                    totalToReceive.subtract(
                            settlement.getAmount());
        }
    }

    List<Expense> recentExpenses =
            expenses.stream()
                    .limit(5)
                    .toList();

    List<Settlement> recentSettlements =
            settlementsPaid.stream()
                    .limit(5)
                    .toList();

    return new DashboardResponse(
            totalGroups,
            totalExpenses,
            totalPaid,
            totalOwed,
            totalToReceive,
            recentExpenses,
            recentSettlements
    );
}


}

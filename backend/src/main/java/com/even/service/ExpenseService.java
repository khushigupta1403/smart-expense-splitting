package com.even.service;

import com.even.entity.Expense;
import com.even.entity.ExpenseSplit;
import com.even.repository.ExpenseRepository;
import com.even.repository.ExpenseSplitRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

private final ExpenseRepository expenseRepository;
private final ExpenseSplitRepository expenseSplitRepository;

public ExpenseService(
        ExpenseRepository expenseRepository,
        ExpenseSplitRepository expenseSplitRepository) {

    this.expenseRepository = expenseRepository;
    this.expenseSplitRepository = expenseSplitRepository;
}

public Expense createExpense(
        Long groupId,
        Long paidBy,
        String title,
        String description,
        BigDecimal amount,
        String splitType,
        List<Map<String, Object>> splits) {

    if (title == null || title.isBlank()) {
        throw new RuntimeException(
                "Expense title is required");
    }

    if (amount == null ||
            amount.compareTo(BigDecimal.ZERO) <= 0) {

        throw new RuntimeException(
                "Expense amount must be greater than zero");
    }

    if (splitType == null || splitType.isBlank()) {
        splitType = "EQUAL";
    }

    splitType = splitType.toUpperCase();

    if (!splitType.equals("EQUAL") &&
            !splitType.equals("EXACT") &&
            !splitType.equals("PERCENTAGE")) {

        throw new RuntimeException(
                "Invalid split type. Use EQUAL, EXACT or PERCENTAGE");
    }

    if (splits == null || splits.isEmpty()) {
        throw new RuntimeException(
                "At least one split member is required");
    }

    Expense expense = Expense.builder()
            .groupId(groupId)
            .paidBy(paidBy)
            .title(title.trim())
            .description(description)
            .amount(amount)
            .splitType(splitType)
            .build();

    Expense savedExpense =
            expenseRepository.save(expense);

    saveSplits(
            savedExpense.getId(),
            amount,
            splitType,
            splits
    );

    return savedExpense;
}

private void saveSplits(
        Long expenseId,
        BigDecimal totalAmount,
        String splitType,
        List<Map<String, Object>> splits) {

    List<ExpenseSplit> expenseSplits =
            new ArrayList<>();

    if (splitType.equals("EQUAL")) {

        BigDecimal equalAmount =
                totalAmount.divide(
                        BigDecimal.valueOf(splits.size()),
                        2,
                        RoundingMode.HALF_UP
                );

        BigDecimal equalPercentage =
                BigDecimal.valueOf(100)
                        .divide(
                                BigDecimal.valueOf(splits.size()),
                                2,
                                RoundingMode.HALF_UP
                        );

        for (Map<String, Object> split : splits) {

            Long userId =
                    Long.valueOf(
                            split.get("userId").toString()
                    );

            expenseSplits.add(
                    ExpenseSplit.builder()
                            .expenseId(expenseId)
                            .userId(userId)
                            .amount(equalAmount)
                            .percentage(equalPercentage)
                            .settled(false)
                            .build()
            );
        }
    }

    else if (splitType.equals("EXACT")) {

        BigDecimal totalSplit =
                BigDecimal.ZERO;

        for (Map<String, Object> split : splits) {

            Long userId =
                    Long.valueOf(
                            split.get("userId").toString()
                    );

            BigDecimal splitAmount =
                    new BigDecimal(
                            split.get("amount").toString()
                    );

            if (splitAmount.compareTo(
                    BigDecimal.ZERO) < 0) {

                throw new RuntimeException(
                        "Split amount cannot be negative");
            }

            totalSplit =
                    totalSplit.add(splitAmount);

            expenseSplits.add(
                    ExpenseSplit.builder()
                            .expenseId(expenseId)
                            .userId(userId)
                            .amount(splitAmount)
                            .percentage(
                                    splitAmount
                                            .multiply(
                                                    BigDecimal.valueOf(100)
                                            )
                                            .divide(
                                                    totalAmount,
                                                    2,
                                                    RoundingMode.HALF_UP
                                            )
                            )
                            .settled(false)
                            .build()
            );
        }

        if (totalSplit.compareTo(totalAmount) != 0) {

            throw new RuntimeException(
                    "Exact split amounts must equal the total expense");
        }
    }

    else {

        BigDecimal totalPercentage =
                BigDecimal.ZERO;

        for (Map<String, Object> split : splits) {

            Long userId =
                    Long.valueOf(
                            split.get("userId").toString()
                    );

            BigDecimal percentage =
                    new BigDecimal(
                            split.get("percentage").toString()
                    );

            if (percentage.compareTo(
                    BigDecimal.ZERO) < 0) {

                throw new RuntimeException(
                        "Percentage cannot be negative");
            }

            totalPercentage =
                    totalPercentage.add(percentage);

            BigDecimal splitAmount =
                    totalAmount
                            .multiply(percentage)
                            .divide(
                                    BigDecimal.valueOf(100),
                                    2,
                                    RoundingMode.HALF_UP
                            );

            expenseSplits.add(
                    ExpenseSplit.builder()
                            .expenseId(expenseId)
                            .userId(userId)
                            .amount(splitAmount)
                            .percentage(percentage)
                            .settled(false)
                            .build()
            );
        }

        if (totalPercentage.compareTo(
                BigDecimal.valueOf(100)) != 0) {

            throw new RuntimeException(
                    "Percentages must add up to 100");
        }
    }

    expenseSplitRepository.saveAll(
            expenseSplits
    );
}

public List<Expense> getGroupExpenses(
        Long groupId) {

    return expenseRepository
            .findByGroupIdOrderByCreatedAtDesc(
                    groupId
            );
}

public Expense getExpense(Long expenseId) {

    return expenseRepository
            .findById(expenseId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Expense not found"));
}

public List<ExpenseSplit> getExpenseSplits(
        Long expenseId) {

    getExpense(expenseId);

    return expenseSplitRepository
            .findByExpenseId(expenseId);
}

public Expense updateExpense(
        Long expenseId,
        String title,
        String description,
        BigDecimal amount,
        String splitType) {

    Expense expense = getExpense(expenseId);

    if (title != null && !title.isBlank()) {
        expense.setTitle(title.trim());
    }

    if (description != null) {
        expense.setDescription(description);
    }

    if (amount != null) {

        if (amount.compareTo(
                BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Expense amount must be greater than zero");
        }

        expense.setAmount(amount);
    }

    if (splitType != null &&
            !splitType.isBlank()) {

        splitType = splitType.toUpperCase();

        if (!splitType.equals("EQUAL") &&
                !splitType.equals("EXACT") &&
                !splitType.equals("PERCENTAGE")) {

            throw new RuntimeException(
                    "Invalid split type");
        }

        expense.setSplitType(splitType);
    }

    return expenseRepository.save(expense);
}

public void deleteExpense(Long expenseId) {

    Expense expense = getExpense(expenseId);

    expenseSplitRepository
            .deleteByExpenseId(expenseId);

    expenseRepository.delete(expense);
}


}

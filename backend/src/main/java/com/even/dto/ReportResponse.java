package com.even.dto;

import com.even.entity.Expense;
import com.even.entity.Settlement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {


private BigDecimal totalExpenses;

private BigDecimal totalSettlements;

private int expenseCount;

private int settlementCount;

private List<Expense> expenses;

private List<Settlement> settlements;


}

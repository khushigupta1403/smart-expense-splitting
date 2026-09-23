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
public class DashboardResponse {


private long totalGroups;

private BigDecimal totalExpenses;

private BigDecimal totalPaid;

private BigDecimal totalOwed;

private BigDecimal totalToReceive;

private List<Expense> recentExpenses;

private List<Settlement> recentSettlements;

}

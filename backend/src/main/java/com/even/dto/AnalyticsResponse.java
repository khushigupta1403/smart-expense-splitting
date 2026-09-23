package com.even.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {


private BigDecimal totalSpent;

private BigDecimal totalOwed;

private BigDecimal totalReceived;

private Map<String, BigDecimal> monthlySpending;

private Map<String, BigDecimal> groupSpending;


}


package com.even.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BalanceResponse {


private Long userId;

private BigDecimal paid;

private BigDecimal owed;

private BigDecimal balance;


}

package com.even.repository;

import com.even.entity.ExpenseSplit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseSplitRepository
extends JpaRepository<ExpenseSplit, Long> {


List<ExpenseSplit> findByExpenseId(Long expenseId);

List<ExpenseSplit> findByUserId(Long userId);

void deleteByExpenseId(Long expenseId);


}

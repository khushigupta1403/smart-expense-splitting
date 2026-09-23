package com.even.repository;

import com.even.entity.Expense;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository
extends JpaRepository<Expense, Long> {


List<Expense> findByGroupIdOrderByCreatedAtDesc(
        Long groupId);

List<Expense> findByPaidByOrderByCreatedAtDesc(
        Long userId);


}

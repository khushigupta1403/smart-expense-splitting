package com.even.repository;

import com.even.entity.Settlement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettlementRepository
extends JpaRepository<Settlement, Long> {


List<Settlement> findByGroupIdOrderByCreatedAtDesc(
        Long groupId);

List<Settlement> findByPaidBy(Long userId);

List<Settlement> findByPaidTo(Long userId);

}

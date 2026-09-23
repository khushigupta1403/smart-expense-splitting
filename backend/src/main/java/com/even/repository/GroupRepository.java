package com.even.repository;

import com.even.entity.Group;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

List<Group> findByCreatedBy(Long userId);

}

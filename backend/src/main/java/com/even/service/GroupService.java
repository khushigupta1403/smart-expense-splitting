package com.even.service;

import com.even.entity.Group;
import com.even.repository.GroupRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {


private final GroupRepository groupRepository;

public GroupService(GroupRepository groupRepository) {
    this.groupRepository = groupRepository;
}

public Group createGroup(
        String name,
        String description,
        Long userId) {

    if (name == null || name.isBlank()) {
        throw new RuntimeException("Group name is required");
    }

    Group group = Group.builder()
            .name(name.trim())
            .description(description)
            .createdBy(userId)
            .build();

    return groupRepository.save(group);
}

public List<Group> getMyGroups(Long userId) {
    return groupRepository.findByCreatedBy(userId);
}

public Group getGroup(Long groupId) {
    return groupRepository.findById(groupId)
            .orElseThrow(() ->
                    new RuntimeException("Group not found"));
}

public void deleteGroup(Long groupId, Long userId) {

    Group group = getGroup(groupId);

    if (!group.getCreatedBy().equals(userId)) {
        throw new RuntimeException(
                "You can only delete your own group");
    }

    groupRepository.delete(group);
}


}

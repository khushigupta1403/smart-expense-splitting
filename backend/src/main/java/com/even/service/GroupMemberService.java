package com.even.service;

import com.even.entity.GroupMember;
import com.even.repository.GroupMemberRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMemberService {


private final GroupMemberRepository groupMemberRepository;

public GroupMemberService(
        GroupMemberRepository groupMemberRepository) {

    this.groupMemberRepository = groupMemberRepository;
}

public GroupMember addMember(
        Long groupId,
        Long userId) {

    if (groupMemberRepository
            .existsByGroupIdAndUserId(groupId, userId)) {

        throw new RuntimeException(
                "User is already a member of this group"
        );
    }

    GroupMember member = GroupMember.builder()
            .groupId(groupId)
            .userId(userId)
            .build();

    return groupMemberRepository.save(member);
}

public List<GroupMember> getMembers(Long groupId) {

    return groupMemberRepository
            .findByGroupId(groupId);
}

public void removeMember(
        Long groupId,
        Long userId) {

    GroupMember member =
            groupMemberRepository
                    .findByGroupIdAndUserId(
                            groupId,
                            userId
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Member not found"
                            )
                    );

    groupMemberRepository.delete(member);
}


}

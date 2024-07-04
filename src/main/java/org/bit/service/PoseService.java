package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.PoseMapper;
import org.bit.model.quiz.QuizPose;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PoseService {

    private final PoseMapper poseMapper;

    public List<Integer> getPoseIdList (String pose_level) {
        return poseMapper.getPoseIdList(pose_level);
    }

    public QuizPose getPose (int pose_id) {
        return poseMapper.getPose(pose_id);
    }
}

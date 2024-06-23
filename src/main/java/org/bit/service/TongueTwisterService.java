package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.TongueTwisterMapper;
import org.bit.model.quiz.TongueTwister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TongueTwisterService {

    private final TongueTwisterMapper tongueTwisterMapper;

    public List<Integer> getTongueTwisterIdList (String level) {
        return tongueTwisterMapper.getTongueTwisterIdList(level);
    }

    public TongueTwister getTongueTwister (int id) {
        return tongueTwisterMapper.getTongueTwister(id);
    }
}

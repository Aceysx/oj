package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.repositories.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MajorService {
    @Autowired
    private MajorRepository majorRepository;

    public Page<Major> getMajor(Pageable pageable) {
        return majorRepository.findAll(pageable);
    }

    public void addMajor(Major major) {
        majorRepository.save(major);
    }
}

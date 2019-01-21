package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorService {
    @Autowired
    private MajorRepository majorRepository;

    public Page<Major> getMajorsByPage(Pageable pageable) {
        return majorRepository.findAll(pageable);
    }

    public List<Major> getMajors() {
        return majorRepository.findAll();
    }

    public void addMajor(Major major) {
        majorRepository.save(major);
    }

    public void putMajor(Major major) throws BusinessException {
        majorRepository.findById(major.getId()).orElseThrow(
                () -> new BusinessException("无当前数据"));
        majorRepository.save(major);
    }
}

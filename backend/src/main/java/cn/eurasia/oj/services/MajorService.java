package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.MajorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MajorService {
    private final MajorRepository majorRepository;

    public Page<Major> getMajorsByPage( Pageable pageable) {
        return majorRepository.findAll(pageable);
    }

    public Major addMajor(Major major) {
        return majorRepository.save(major);
    }

    public void putMajor(Major major) throws BusinessException {
        majorRepository.findById(major.getId()).orElseThrow(
            () -> new BusinessException("无当前数据"));
        majorRepository.save(major);
    }

    public void deleteMajor(Long id) throws BusinessException {
        Major major = majorRepository.findById(id).orElseThrow(() -> new BusinessException("没有找到该专业"));
        majorRepository.delete(major);
    }

    public List<Major> findAll() {
        return majorRepository.findAll();
    }
}

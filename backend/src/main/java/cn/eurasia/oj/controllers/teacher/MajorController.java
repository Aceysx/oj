package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.services.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/majors")
public class MajorController {
    @Autowired
    private MajorService majorService;

    @GetMapping("pageable")
    public ResponseEntity getMajorsByPage(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(majorService.getMajorsByPage(pageable));
    }

    @GetMapping("")
    public ResponseEntity getMajors() {
        return ResponseEntity.ok(majorService.getMajors());
    }

    @PostMapping("")
    public ResponseEntity addMajor(@RequestBody Major major) {
        majorService.addMajor(major);
        return ResponseEntity.created(URI.create("/api/majors/" + major.getId())).build();
    }

    @PutMapping("")
    public ResponseEntity putMajor(@RequestBody Major major) throws BusinessException {
        majorService.putMajor(major);
        return ResponseEntity.noContent().build();
    }
}

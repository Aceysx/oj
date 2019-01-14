package cn.eurasia.oj.controllers.teacher;

import cn.eurasia.oj.entities.Major;
import cn.eurasia.oj.services.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

/**
 * @program: oj
 * @author: MaoLW
 * @create: 2019-01-14 16:26
 **/

@RestController
@RequestMapping(value = "/api/major")
public class MajorController {
    @Autowired
    private MajorService majorService;

    @GetMapping("")
    public ResponseEntity getMajor(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(majorService.getMajor(pageable));
    }

    @PostMapping("")
    public ResponseEntity addMajor(@RequestBody Major major) {
        majorService.addMajor(major);
        return ResponseEntity.created(URI.create("/api/major/" + major.getId())).build();
    }
}

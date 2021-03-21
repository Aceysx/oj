package cn.eurasia.oj.controllers;

import cn.eurasia.oj.entities.model.UploadProperty;
import cn.eurasia.oj.exceptions.BusinessException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@CrossOrigin
public class FileUploaderController {
    private final UploadProperty uploadProperty;

    @PostMapping("uploader")
    public ResponseEntity upload(
        @RequestParam("file") MultipartFile file,
        HttpServletRequest request) throws BusinessException {
        String fileUri = this.uploadImageByAcceptType(file, uploadProperty);
        return ResponseEntity.ok(fileUri);
    }

    public String uploadImageByAcceptType(MultipartFile file, UploadProperty uploadProperty) throws BusinessException {
        String type = file.getContentType();
        List<String> acceptTypes = uploadProperty.getAcceptType();
        if (!acceptTypes.contains(type)) {
            throw new BusinessException("");
        }
        int size = (int) Math.ceil(file.getSize() / 1024 / 1024);
        int maxSize = uploadProperty.getMaxSize();
        if (size > maxSize) {
            throw new BusinessException("");
        }
        String originalFilename = file.getOriginalFilename();
        String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
        LocalDate now = LocalDate.now();
        String rootPath = "static";
        String year = now.getYear() + "";
        String month = now.getMonth().getValue() + "";
        String day = now.getDayOfMonth() + "";
        Path path = Paths.get(uploadProperty.getPath(), rootPath, year, month, day);
        String filePath = path.toAbsolutePath().toString();
        File fileDir = new File(filePath);
        fileDir.mkdirs();
        String uuid = UUID.randomUUID().toString() + suffix;
        File realFile = new File(fileDir, uuid);
        try {
            IOUtils.copy(file.getInputStream(), new FileOutputStream(realFile));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return String.join("/", rootPath, year, month, day, uuid);
    }

}

package cn.eurasia.oj.entities.model;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "upload.image")
@Data
public class UploadProperty {
    private String path;
    private int maxSize;
    private List<String> acceptType = new ArrayList<>();
}
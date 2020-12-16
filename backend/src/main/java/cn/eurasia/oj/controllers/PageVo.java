package cn.eurasia.oj.controllers;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageVo<T> {
    private List<T> data;
    private Long total;
    private boolean success;

    private PageVo(List<T> data, long total) {
        this.success = true;
        this.data = data;
        this.total = total;
    }

    public static <T> PageVo<T> build(Page<T> page) {
        return new PageVo<>(page.getContent(), page.getTotalElements());
    }
}

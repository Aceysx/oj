package cn.eurasia.oj.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "reviewQuiz")
public class ReviewQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long classCourseId;
    private Long paperId;
    private Double score;
    private Long userId;
    private Date createTime;
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;
    private String submissionStatus;

    public ReviewQuiz(Long classCourseId, Long paperId, Long userId, Double score, String status) {
        this.classCourseId = classCourseId;
        this.paperId = paperId;
        this.userId = userId;
        this.score = score;
        this.createTime = new Date();
        this.submissionStatus = status;
        this.startTime = new Date();
    }
}
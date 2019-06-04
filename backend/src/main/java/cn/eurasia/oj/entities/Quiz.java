package cn.eurasia.oj.entities;

import cn.eurasia.oj.requestParams.CreateQuizParam;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "quiz")
@NoArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String options;
    private String answer;
    private String chapter;
    private String level;
    private String type;
    @ManyToOne
    @JoinColumn(name = "majorId")
    private Major major;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @OneToOne(cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "pictureId")
    private Picture picture;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;

    public Quiz(String description, String options, String answer, String chapter, Major major, User current, String level, String type) {
        this.description = description;
        this.options = options;
        this.answer = answer;
        this.chapter = chapter;
        this.major = major;
        this.user = current;
        this.level = level;
        this.type = type;
    }

    public Quiz(String description, String options, String answer, String chapter, User current, String type, Major major) {
        this.description = description;
        this.options = options;
        this.answer = answer;
        this.chapter = chapter;
        this.user = current;
        this.level = "简单";
        this.type = type;
        this.major = major;
    }

    public Quiz(String description, String answer, String chapter, User current, String type, Major major) {
        this.description = description;
        this.answer = answer;
        this.chapter = chapter;
        this.user = current;
        this.level = "简单";
        this.type = type;
        this.major = major;
    }

    public static Quiz convertParam(CreateQuizParam quizParam, User current) {
        return new Quiz(quizParam.getDescription(), quizParam.getOptions(),
            quizParam.getAnswer(), quizParam.getChapter(),
            new Major(quizParam.getMajor()), current, quizParam.getLevel(), quizParam.getType());
    }

    public void update(CreateQuizParam quizParam, Major major) {
        String description = quizParam.getDescription();
        if ("识图题".equals(quizParam.getType())) {
            description = this.picture.getUrl() + " — " + "";
        }
        this.description = description;
        this.options = quizParam.getOptions();
        this.answer = quizParam.getAnswer();
        this.chapter = quizParam.getChapter();
        this.major = major;
        this.level = quizParam.getLevel();
    }
}
package cn.eurasia.oj.entities;

import cn.eurasia.oj.requestParams.CreatePaperParam;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "paper")
@NoArgsConstructor
public class Paper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @ManyToMany
    @JoinTable(name = "paperQuiz", joinColumns = @JoinColumn(name = "paperId"),
        inverseJoinColumns = @JoinColumn(name = "quizId"))
    private List<Quiz> quizzes;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm", timezone = "GMT+8")
    private Date endTime;
    private Long timeBox;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Paper(String title, List<Quiz> quizzes, User current, Date endTime, Long timeBox) {
        this.title = title;
        this.quizzes = quizzes;
        this.user = current;
        this.endTime = endTime;
        this.timeBox = timeBox;
    }

    public static Paper convertParam(CreatePaperParam createPaperParam, User current) {
        return new Paper(createPaperParam.getTitle(), createPaperParam.getQuizzes(), current, createPaperParam.getEndTime(), createPaperParam.getTimeBox());
    }

    public void update(Paper paper) {
        this.title = paper.getTitle();
        this.quizzes = paper.getQuizzes();
        this.timeBox = paper.timeBox;
        this.endTime = paper.endTime;
    }

    public void removeQuizzesAnswer() {
        this.getQuizzes().forEach(quiz -> quiz.setAnswer(null));
    }
}
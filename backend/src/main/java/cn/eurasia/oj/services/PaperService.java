package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Paper;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.repositories.PaperRepository;
import cn.eurasia.oj.repositories.QuizRepository;
import cn.eurasia.oj.requestParams.CreatePaperParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PaperService {
  private QuizRepository quizRepository;
  @Autowired
  private PaperRepository paperRepository;

  public Paper addPaper(CreatePaperParam createPaperParam, User current) {
    Paper paper = Paper.convertParam(createPaperParam, current);
    return paperRepository.save(paper);
  }

  public Page<Paper> getQuizzesByPage(Pageable pageable) {
    return paperRepository.findAll(pageable);
  }
}

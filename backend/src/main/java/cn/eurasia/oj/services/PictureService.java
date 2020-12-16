package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Label;
import cn.eurasia.oj.entities.Picture;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.PictureRepository;
import cn.eurasia.oj.controllers.requestParams.CreatePictureParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PictureService {
  private final PictureRepository pictureRepository;
  private final QuizService quizService;

  public Picture addPicture(Picture picture, User current) {
    picture.setUserId(current.getId());
    return pictureRepository.save(picture);
  }

  public Page<Picture> getPictures(Pageable pageable, String title) {
    if ("".equals(title)) {
      return pictureRepository.findAll(pageable);
    }
    return pictureRepository.findByTitleIsLike("%"+title+"%", pageable);

  }

  public void editPictureLabels(Long pictureId, User current, List<Map> labelsStr) throws BusinessException {
    Picture picture = pictureRepository.findById(pictureId).orElseThrow(() -> new BusinessException("未找到"));
    picture.setUserId(current.getId());
    List<Label> labels = labelsStr.stream().map(label ->
      new Label(pictureId, label.get("fill").toString(), label.get("label").toString(), label.get("position").toString()))
      .collect(Collectors.toList());
      if (!labels.isEmpty()) {
          picture.setLabels(labels);
      }
    pictureRepository.save(picture);
  }

  public void editPicture(CreatePictureParam createPictureParam, User current) throws BusinessException {
    Picture picture = pictureRepository.findById(createPictureParam.getId()).orElseThrow(() -> new BusinessException("未找到"));
    picture.update(createPictureParam);
    picture.setUserId(current.getId());
    pictureRepository.save(picture);
  }

    public void deletePicture(Long id) throws BusinessException {
      Picture picture = pictureRepository.findById(id).orElseThrow(() -> new BusinessException("没有找到该图片"));
      quizService.deleteQuizByPictureId(picture.getId());
      pictureRepository.delete(picture);
    }
}

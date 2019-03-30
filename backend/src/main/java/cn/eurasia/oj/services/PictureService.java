package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Label;
import cn.eurasia.oj.entities.Picture;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.PictureRepository;
import cn.eurasia.oj.requestParams.CreatePictureParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PictureService {
  @Autowired
  private PictureRepository pictureRepository;

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
    picture.setLabels(labels);
    pictureRepository.save(picture);
  }

  public void editPicture(CreatePictureParam createPictureParam, User current) throws BusinessException {
    Picture picture = pictureRepository.findById(createPictureParam.getId()).orElseThrow(() -> new BusinessException("未找到"));
    picture.update(createPictureParam);
    picture.setUserId(current.getId());
    pictureRepository.save(picture);
  }
}

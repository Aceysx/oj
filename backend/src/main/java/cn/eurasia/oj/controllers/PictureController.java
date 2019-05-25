package cn.eurasia.oj.controllers;

import cn.eurasia.oj.annotations.Auth;
import cn.eurasia.oj.entities.Picture;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.PictureRepository;
import cn.eurasia.oj.requestParams.CreatePictureParam;
import cn.eurasia.oj.services.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/pictures")
public class PictureController {

  @Autowired
  private PictureService pictureService;
  @Autowired
  private PictureRepository pictureRepository;

  @GetMapping("pageable")
  public ResponseEntity getPictures(
    @RequestParam String title,
    @PageableDefault(sort = {"id"},
      direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(pictureService.getPictures(pageable,title));
  }

  @GetMapping("{pictureId}")
  public ResponseEntity getPicture(@PathVariable Long pictureId){
    return ResponseEntity.ok(pictureRepository.findById(pictureId).get());
  }

  @PostMapping("")
  public ResponseEntity addPicture(@RequestBody Picture picture,
                                       @Auth User current) {

    picture = pictureService.addPicture(picture,current);
    return ResponseEntity.created(URI.create("/api/pictures/"+picture.getId())).build();
  }

  @PutMapping("{pictureId}/labels")
  public ResponseEntity editPictureLabels(@RequestBody List<Map> labels,
                                       @PathVariable Long pictureId,
                                       @Auth User current) throws BusinessException {

    pictureService.editPictureLabels(pictureId,current,labels);
    return ResponseEntity.created(URI.create("/api/pictures")).build();
  }
  @PutMapping("{pictureId}")
  public ResponseEntity editPictureLabel(
                                       @RequestBody CreatePictureParam createPictureParam,
                                       @Auth User current) throws BusinessException {

    pictureService.editPicture(createPictureParam,current);
    return ResponseEntity.created(URI.create("/api/pictures")).build();
  }

  @DeleteMapping("{id}")
  public ResponseEntity deletePicture(@PathVariable Long id) throws BusinessException {
    pictureService.deletePicture(id);
    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }

}

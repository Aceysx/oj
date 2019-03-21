package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Quiz;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.QuizRepository;
import com.alibaba.fastjson.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizExcelImportService {

  @Autowired
  private QuizRepository quizRepository;
  private Workbook workbook;
  private Sheet firstSheet;

  public void init(MultipartFile file) throws IOException, BusinessException {
    this.workbook = this.getWorkbook(file);
    this.firstSheet = this.getFirstSheet(workbook);
  }

  private Sheet getFirstSheet(Workbook workbook) throws BusinessException {
    Sheet sheet = workbook.getSheetAt(0);
    if (Objects.isNull(sheet)) {
      throw new BusinessException("Could not find the first sheet");
    }
    return sheet;
  }

  private Workbook getWorkbook(MultipartFile file) throws IOException {
    Workbook workbook;
    String fileName = file.getOriginalFilename();
    boolean isExcel2003 = true;
    if (fileName.matches("^.+\\.(?i)(xlsx)$")) {
      isExcel2003 = false;
    }
    InputStream is = file.getInputStream();

    if (isExcel2003) {
      workbook = new HSSFWorkbook(is);
    } else {
      workbook = new XSSFWorkbook(is);
    }
    return workbook;
  }

  @Transactional
  public void importExcel(User current) {
    List<Quiz> quizzes = new ArrayList<>();
    for (int i = 1; i < firstSheet.getLastRowNum(); ++i) {
      Row row = firstSheet.getRow(i);
      String chapter = row.getCell(0).getStringCellValue();
      String description = row.getCell(1).getStringCellValue();
      List<String> answers = Arrays.asList(row.getCell(2).getStringCellValue().split(""));
      if (answers.isEmpty()) {
        continue;
      }
      answers = answers.stream().map(item -> ((int)(item.charAt(0))) - 65 + "").collect(Collectors.toList());
      String options = getOptions(row);
      String type = answers.size() > 1 ? "多选题" : "单选题";
      String answer = type.equals("多选题") ? answers.toString() : answers.get(0);
      quizzes.add(new Quiz(description, options, answer, chapter, current, type));
    }
    quizRepository.saveAll(quizzes);
  }

  private String getOptions(Row row) {
    int fromIndex = 3;
    List<String> options = new ArrayList<>();
    while (true) {
      Cell option = row.getCell(fromIndex++);
      if (Objects.isNull(option) || "".equals(option)) {
        break;
      }
      options.add(option+"");
    }
    options = options.stream().filter(item -> !"".equals(item)).collect(Collectors.toList());
    return JSONObject.toJSONString(options);
  }
}
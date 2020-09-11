package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Major;
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
    @Autowired
    private MajorService majorService;
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
        List<Major> majors = majorService.findAll();
        for (int i = 1; i < firstSheet.getLastRowNum(); ++i) {
            Row row = firstSheet.getRow(i);
            String chapter = row.getCell(0) + "";
            Major major = getMajors(majors, row,current.getId()); // major == 课程名称
            String type = row.getCell(4) + "";
            String level = (row.getCell(5) + "");
            String belongStr = (row.getCell(6) + "");
            Long belong = (long) Float.parseFloat(("".equals(belongStr) ? current.getId().toString() : belongStr));

            String description = row.getCell(1) + "";
            Cell answerCell = row.getCell(2);
            if (Objects.isNull(answerCell) || "".equals(answerCell+"")) {
                continue;
            }
            answerCell.setCellType(answerCell.CELL_TYPE_STRING);
            String answer = answerCell.getStringCellValue();
            String options = getOptions(row);
            quizzes.add(new Quiz(description, options,
                "多选题".equals(type)
                    ? "[" + answer + "]"
                    : answer,
                chapter, current, type, major, belong, level));
        }

        quizRepository.saveAll(quizzes);
    }

    private Major getMajors(List<Major> majors, Row row,Long userId) {
        String name = row.getCell(3) + "";
        return majors.stream().filter(item -> item.getName().equals(name))
            .findFirst().orElseGet(()-> majorService.addMajor(new Major(name,userId)));
    }

    private String getOptions(Row row) {
        int fromIndex = 7;
        List<String> options = new ArrayList<>();
        while (true) {
            Cell option = row.getCell(fromIndex++);
            if (Objects.isNull(option) || "".equals(option)) {
                break;
            }
            options.add(option + "");
        }
        options = options.stream().filter(item -> !"".equals(item)).collect(Collectors.toList());
        return JSONObject.toJSONString(options);
    }
}
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

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
        Sheet sheet = workbook.getSheetAt(1);
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

    public void importExcel(User current) {
        List<Quiz> quizzes = new ArrayList<>();
        List<Major> majors = majorService.findAll();
        for (int i = 1; i < firstSheet.getLastRowNum(); ++i) {
            Row row = firstSheet.getRow(i);
            String chapter = null;
            String type = null;
            String description = null;
            if (!(Objects.isNull(row.getCell(0))
                || "".equals(row.getCell(0).toString().trim()))) {
                chapter = row.getCell(0).toString();
            }

            Major major = getMajors(majors, row, current.getId()); // major == 课程名称
            if (!(Objects.isNull(row.getCell(4))
                || "".equals(row.getCell(4).toString().trim()))) {
                type = row.getCell(4).toString();
            }
            String level = Objects.isNull(row.getCell(5)) ? "一级" : row.getCell(5).toString();
            Long belong = Objects.isNull(row.getCell(6)) ? current.getId() : Long.parseLong(row.getCell(6).toString());
            if (!(Objects.isNull(row.getCell(1))
                || "".equals(row.getCell(1).toString().trim()))) {
                description = row.getCell(1).toString();
            }

            Cell answerCell = row.getCell(2);
            if (Objects.isNull(answerCell) || "".equals(answerCell.toString().trim())) {
                continue;
            }
            String answer = formatAnswers(answerCell.getStringCellValue().trim());
            String options = getOptions(row);
            quizzes.add(new Quiz(description, options,
                "多选题".equals(type)
                    ? "[" + answer + "]"
                    : answer,
                chapter, current, type, major, belong, level));
        }

        quizRepository.saveAll(quizzes);
    }

    public String formatAnswers(String answers) {
        return Stream.of(answers.split(",")).map(this::letterToNumber)
            .map(Objects::toString)
            .collect(Collectors.joining(","));
    }

    public int letterToNumber(String letter) {
        int length = letter.length();
        int num = 0;
        int number = 0;
        for (int i = 0; i < length; i++) {
            char ch = letter.charAt(length - i - 1);
            num = ch - 'A' + 1;
            num *= Math.pow(26, i);
            number += num;
        }
        return number - 1;
    }

    private Major getMajors(List<Major> majors, Row row, Long userId) {
        if (Objects.isNull(row.getCell(3)) || "".equals(row.getCell(3).toString().trim())) {
            return null;
        }
        String name = row.getCell(3) + "";
        return majors.stream().filter(item -> item.getName().equals(name))
            .findFirst().orElseGet(() -> majorService.addMajor(new Major(name, userId)));
    }

    private String getOptions(Row row) {
        int fromIndex = 7;
        List<String> options = new ArrayList<>();
        while (true) {
            Cell option = row.getCell(fromIndex++);
            if (Objects.isNull(option) || "".equals(option.toString().trim())) {
                break;
            }
            options.add(option + "");
        }
        options = options.stream().filter(item -> !"".equals(item)).collect(Collectors.toList());
        return JSONObject.toJSONString(options);
    }
}
package cn.eurasia.oj.services;

import cn.eurasia.oj.entities.Role;
import cn.eurasia.oj.entities.User;
import cn.eurasia.oj.exceptions.BusinessException;
import cn.eurasia.oj.repositories.RoleRepository;
import cn.eurasia.oj.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserExcelImportService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
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

    //  username,password,name,phone,email,role[学生,管理员,教师]
    @Transactional
    public void importExcel() throws BusinessException {
        try {
            List<Role> roles = roleRepository.findAll();
            List<User> users = new ArrayList<>();
            for (int i = 1; i < firstSheet.getLastRowNum(); ++i) {
                Row row = firstSheet.getRow(i);
                users.add(parse(row, roles));
            }
            userRepository.saveAll(users);
        } catch (Exception e) {
            throw new BusinessException("格数错误 或 用户名存在重复");
        }

    }

    private User parse(Row row, List<Role> roles) {
        String username = row.getCell(0) + "";
        String password = row.getCell(1) + "";
        String name = row.getCell(2) + "";
        String phone = new DecimalFormat("0").format(row.getCell(3).getNumericCellValue());
        String email = row.getCell(4) + "";
        List<String> userRolesStr = Arrays.asList(row.getCell(5).getStringCellValue().split(","));
        List<Role> userRoles = roles.stream().filter(role -> userRolesStr.contains(role.getRoleName())).collect(Collectors.toList());
        return User.build(username, password, name, phone, email, userRoles);
    }
}
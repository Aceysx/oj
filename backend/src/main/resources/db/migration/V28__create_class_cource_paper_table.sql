drop table classCoursePaper;

CREATE TABLE `classCoursePaper`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `endTime`    TIMESTAMP not null,
    `timeBox`    int(11),
    `classCourseId`    int(11),
    `paperId`    int(11),
    `createTime` TIMESTAMP default CURRENT_TIMESTAMP,
    `createdBy`  int(11),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

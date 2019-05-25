ALTER TABLE quizSubmission
ADD UNIQUE KEY(classCourseId, paperId,quizId,userId);
const DUMMY_COURSE = { visited: [], progress: 0 };

export const StorageHandler = {
  setVideoProgress: (lessonId, time) => {
    if (lessonId) {
      localStorage.setItem(`lessons/${lessonId}`, time);
    }
  },
  setInitialCourseProgress: (courseId, firstLessonId, lessonsCount) => {
    localStorage.setItem(
      `courses/${courseId}`,
      JSON.stringify({
        visited: [firstLessonId],
        progress: Math.round(100 / lessonsCount),
      })
    );
  },
  updateCourseProgress: (courseId, lessonsCount, lessonId) => {
    const prevData =
      JSON.parse(localStorage.getItem(`courses/${courseId}`)) || DUMMY_COURSE;

    const visitedLessons = [...prevData.visited];
    if (visitedLessons.indexOf(lessonId) === -1) {
      visitedLessons.push(lessonId);
    }
    localStorage.setItem(
      `courses/${courseId}`,
      JSON.stringify({
        visited: visitedLessons,
        progress: Math.round((visitedLessons.length / lessonsCount) * 100),
      })
    );
  },
  getVideoProgress: (lessonId) =>
    Number(localStorage.getItem(`lessons/${lessonId}`) || 0),
  getCourseProgress: (courseId) =>
    JSON.parse(localStorage.getItem(`courses/${courseId}`)),
};

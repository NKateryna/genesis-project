export const coursesService = {
  getCourses: async (token, page, limit) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/${process.env.REACT_APP_API_VERSION}/core/preview-courses?token=${token}`
    );

    const { courses } = await response.json();

    return {
      courses: courses
        .sort((a, b) => b - a)
        .slice((page - 1) * limit, page * limit),
      total: courses.length,
    };
  },
  getCourseById: async (id, token) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/${process.env.REACT_APP_API_VERSION}/core/preview-courses/${id}?token=${token}`
    );

    const data = await response.json();

    return data;
  },
};

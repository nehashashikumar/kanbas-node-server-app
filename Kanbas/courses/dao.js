import model from "./model.js";

export const findAllCourses = () => model.find();

export const createCourse = (course) => {
  delete course._id;
  return model.create(course);
};

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

export const updateCourse = (courseId, course) => {
  return model.updateOne({ _id: courseId }, { $set: course });
};

export const findCourseById = (courseId) => {
 return model.findOne({ id: courseId });
};
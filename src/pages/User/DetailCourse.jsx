import React, { useEffect, useState } from "react";
import axios from "axios";

function CourseDetails({ courseId }) {
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://api.course-selling.id.vn/api/course/${courseId}`
        );

        const responseData = response.data;

        if (responseData.status) {
          const courseData = responseData.data;
          setCourseData(courseData);
        } else {
          setError(responseData.message);
        }
      } catch (error) {
        setError("Failed to fetch the course. Please try again later.");
      }
    };

    fetchCourse();
  }, [courseId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!courseData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <p>Name: {courseData.name}</p>
      <p>Description: {courseData.description}</p>
      <p>Thumbnail: <img src={courseData.thumbnail} alt="Course Thumbnail" /></p>
      <p>Video Demo URL: {courseData.video_demo_url}</p>
      <p>Views: {courseData.views}</p>
      <p>Price: {courseData.price}</p>
      <p>Status: {courseData.status}</p>
      <p>Created At: {courseData.created_at}</p>
      <p>Updated At: {courseData.updated_at}</p>
    </div>
  );
}

export default CourseDetails;
class FilterPreviousCourses {
    FilterPreviousCourses(courses, previousCourseNames) {
        let coursesTaken = [];
        for(const course of Object.entries(courses)) {
            for (const prevName of Object.values(previousCourseNames)){
                if(course[0] === prevName){
                    coursesTaken.push(course);
                }
            }
        }
        courses = coursesTaken;
        return courses;
    }
  }
  
  export default FilterPreviousCourses; 
  
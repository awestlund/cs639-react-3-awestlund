class SearchAndFilter {
  searchAndFilter(courses, chips, allChips, subject, minimumCredits, maximumCredits) {
    if(chips.length !== 0 && allChips) {
      let coursesChips = [];
      for(const course of Object.values(courses)) {
        let courseKeys = course.keywords;
        var containsAll = chips.every(i => courseKeys.includes(i));
        if(containsAll && !coursesChips.includes(course)) {
          coursesChips.push(course);
          break;
        }
      }
      courses = coursesChips;
    }

    if(chips.length !== 0 && !allChips) {
      let coursesChips = [];
      for(const course of Object.values(courses)) {
        for(const keyword of course.keywords) {
          for(const key of chips) {
            if(keyword.includes(key) && !coursesChips.includes(course)) {
              coursesChips.push(course);
              break;
            }
          }
        }
      }
      courses = coursesChips;
    }

    if(subject !== 'All') {
      let coursesSubject = [];
      for(const course of Object.values(courses)) {
        if(course.subject === subject)
          coursesSubject.push(course)
      }
      courses = coursesSubject;
    }

    if(minimumCredits !== '') {
      let coursesMinimumCredits = [];
      for(const course of Object.values(courses)) {
        if(course.credits >= parseInt(minimumCredits))
          coursesMinimumCredits.push(course);
      }
      courses = coursesMinimumCredits;
    }

    if(maximumCredits !== '') {
      let coursesMaximumCredits = [];
      for(const course of Object.values(courses)) {
        if(course.credits <= parseInt(maximumCredits))
          coursesMaximumCredits.push(course);
      }
      courses = coursesMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter; 

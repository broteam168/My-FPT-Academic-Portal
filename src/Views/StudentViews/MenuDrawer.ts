export function getMenu(highlight: string) {
  return [
    {
      icon: 'today',
      name: 'Timetable',
      url: '/student/timetable1',
      current: false,
      below: false,
    },
    {
      icon: 'business',
      name: 'Curriculum',
      url: '/student/curiculum1',
      current: false,
      below: false,
    },
    {
      icon: 'add_to_photos',
      name: 'Course',
      url: '/student/course1',
      current: false,
      below: false,
    },
    {
      icon: 'person',
      name: 'Information',
      url: '/student/information1',
      current: false,
      below: false,
    },
  ].map((x) => {
    if (x.name === highlight) {
      x.current = true;
      return x;
    }
    return x;
  });
}

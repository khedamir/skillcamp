import { FC, useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { CourseData } from "../../redux/types";
import debounce from "lodash.debounce";

interface SearchCourseProps {
  courses: CourseData[];
  setFilteredCourses: (courses: CourseData[]) => void;
  debounceDelay?: number;
}

const SearchCourse: FC<SearchCourseProps> = ({
  courses,
  setFilteredCourses,
  debounceDelay = 300,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Функция фильтрации курсов
  const filterCourses = useCallback(
    (value: string) => {
      const trimmedValue = value.trim().toLowerCase();

      if (!trimmedValue) {
        setFilteredCourses(courses);
        return;
      }

      setIsSearching(true);

      try {
        const filtered = courses.filter(
          (course) =>
            course.title.toLowerCase().includes(trimmedValue) ||
            course.description?.toLowerCase().includes(trimmedValue)
        );
        setFilteredCourses(filtered);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredCourses(courses);
      } finally {
        setIsSearching(false);
      }
    },
    [courses, setFilteredCourses]
  );

  // Дебаунс для оптимизации поиска
  const debouncedFilter = useCallback(debounce(filterCourses, debounceDelay), [
    filterCourses,
    debounceDelay,
  ]);

  useEffect(() => {
    debouncedFilter(searchValue);

    // Отмена дебаунса при размонтировании
    return () => debouncedFilter.cancel();
  }, [searchValue, debouncedFilter]);

  // Сброс фильтра при изменении исходного списка курсов
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredCourses(courses);
    }
  }, [courses, searchValue, setFilteredCourses]);

  return (
    <div className="search-course">
      <span className="search-course__icon">
        {isSearching ? (
          <div className="spinner" /> // Можно добавить спиннер загрузки
        ) : (
          <FaSearch />
        )}
      </span>
      <input
        type="text"
        placeholder="Поиск по названию или описанию"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label="Поиск курсов"
      />
      {searchValue && (
        <button
          className="search-course__clear"
          onClick={() => setSearchValue("")}
          aria-label="Очистить поиск"
        >
          <IoCloseSharp />
        </button>
      )}
    </div>
  );
};

export default SearchCourse;

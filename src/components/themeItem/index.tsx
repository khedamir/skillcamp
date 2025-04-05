import React, { FC } from "react";
import { ThemeData } from "../../redux/types";
import { HiOutlineAcademicCap } from "react-icons/hi2";

import { IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface ThemeItemProps {
  theme: ThemeData;
  is_done: boolean;
}

const ThemeItem: FC<ThemeItemProps> = ({ theme, is_done }) => {
  const navigate = useNavigate()
  const goToLessonPage = () => {
    navigate(`${theme.id}`)
  }
  return (
    <div onClick={goToLessonPage} className={`theme-item ${is_done && "is--done"}`}>
      {is_done && <IoCheckmarkCircle className="icon done-icon" />}
      <div className="theme-item__title">
        <HiOutlineAcademicCap className="icon" />
        <h3>{theme.title}</h3>
      </div>
    </div>
  );
};

export default ThemeItem;

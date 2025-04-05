import { useEffect, useState } from "react";
import { profileService } from "../../services/profile.service";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../../redux/auth/slice";
import { RootState } from "../../redux/store";
import { baseUrl } from "../../App";
import { FaBriefcase } from "react-icons/fa";
import UserAchievements from "../../components/userAchievements";
import { subjectService } from "../../services/subject.service";
import { CourseData } from "../../redux/types";
import CourseCard from "../../components/courseCard";

const Profile = () => {
  const [lastSubject, setLastSubject] = useState<CourseData | null>(null);

  const dispatch = useDispatch();
  const { profile, autharizationData } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    profileService.getData().then((data) => {
      dispatch(setProfileData({ data }));
    });
    profileService.getlastSubject().then((data) => {
      subjectService.getSubject(String(data.subjects_id)).then((data) => {
        setLastSubject(data);
      });
    });
  }, [dispatch]);

  if (!profile) {
    return;
  }

  return (
    <div className="profile-page page-container">
      <header className="profile-page__header">
        <img
          width={200}
          className="profile-image"
          src={`${baseUrl}/images?id=${profile?.image}`}
          alt="Profile Image"
        />
        <div className="user-role">
          <FaBriefcase className="user-role__icon" />
          {autharizationData?.user_role === "admin" ? "Админ" : "Пользователь"}
        </div>
      </header>
      <div className="profile-page__description">
        <div className="user-info">
          <h1 className="username">{profile?.full_name}</h1>
          <p className="user-description">{profile?.description}</p>
          <p className="user-phone">{profile?.phone}</p>
          <button className="button">Редактировать профиль</button>
        </div>
        <div className="other">
          <div className="other-title">Ваш прогресс:</div>
          <UserAchievements profile={profile} />
        </div>
      </div>
      <div className="last-course">
        <h2 className="last-course__title">Продолжите изучение:</h2>
        {lastSubject && <CourseCard course={lastSubject} />}
      </div>
    </div>
  );
};

export default Profile;

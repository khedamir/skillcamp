import { useEffect, useState } from "react";
import { profileService } from "../../services/profile.service";
import { useSelector } from "react-redux";
import { setProfileData } from "../../redux/auth/slice";
import { RootState } from "../../redux/store";
import { FaBriefcase } from "react-icons/fa";
import UserAchievements from "../../components/userAchievements";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../redux/auth/slice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import EditProfile from "../../components/editProfile";
import ProfileImage from "../../components/profileImage";
import { useAppDispatch } from "../../redux/hooks";
import ProfileLastCourse from "../../components/profileLastCourse";
import Loader from "../../components/loader";

const Profile = () => {
  const navigate = useNavigate();
  const [editProfileModalActive, setEditProfileModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { profile, autharizationData } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    profileService.getData().then((data) => {
      dispatch(setProfileData({ data }));
      setIsLoading(false);
    });
  }, [dispatch]);

  const logoutClick = () => {
    localStorage.setItem("SKUToken", "-");
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!profile) {
    return <p>Данные профиля отсутствуют...</p>;
  }

  return (
    <div className="profile-page page-container">
      <header className="profile-page__header">
        <ProfileImage profileImage={profile?.image} />
        <div className="user-role">
          <FaBriefcase className="user-role__icon" />
          {autharizationData?.user_role === "admin" ? "Админ" : "Пользователь"}
        </div>
        <span onClick={logoutClick} className="mobile-logout">
          <MdOutlineLogout />
        </span>
      </header>
      <div className="profile-page__description">
        <div className="user-info">
          <h1 className="username">{profile?.full_name}</h1>
          <p className="user-description">{profile?.description}</p>
          <p className="user-phone">{profile?.phone}</p>
          <Button onClick={() => setEditProfileModalActive(true)}>
            Редактировать профиль
          </Button>
        </div>
        <div className="other">
          <div className="other-title">Ваш прогресс:</div>
          <UserAchievements profile={profile} />
        </div>
      </div>
      <ProfileLastCourse />
      <EditProfile
        active={editProfileModalActive}
        setActive={setEditProfileModalActive}
        profileData={profile}
      />
    </div>
  );
};

export default Profile;

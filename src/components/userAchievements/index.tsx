import React, { FC, useEffect, useState } from "react";
import { ProfileData } from "../../redux/types";
import { themeService } from "../../services/theme.service";
import { testService } from "../../services/test.service";

interface UserAchievementsProps {
  profile: ProfileData;
}

const UserAchievements: FC<UserAchievementsProps> = ({ profile }) => {
  const [doneThemes, setDoneThemes] = useState(0);
  const [doneTests, setDoneTests] = useState(0);

  useEffect(() => {
    themeService.getDoneThemesAllLessons(profile.user_id).then((data) => {
      setDoneThemes(data);
    });

    testService.getAllComplatedtests(profile.user_id).then((data) => {
      setDoneTests(data);
    });
  }, []);

  return (
    <div className="user-achievements">
      <div className="item points">
        <p>Баллы</p>
        <p>{profile?.score}</p>
      </div>
      <div className="item themes">
        <p>Темы</p>
        <p>{doneThemes}</p>
      </div>
      <div className="item tests">
        <p>Тесты</p>
        <p>{doneTests}</p>
      </div>
    </div>
  );
};

export default UserAchievements;

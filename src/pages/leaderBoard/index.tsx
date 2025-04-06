import { useEffect, useState } from "react";
import { profileService } from "../../services/profile.service";
import { LeaderBoardUserData } from "../../redux/types";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardUserData[]>([]);

  useEffect(() => {
    profileService.getLeaderBoard().then((data) => {
      setLeaderBoard(data);
    });
  }, []);

  return (
    <div className="leaderboard-page page-container">
      <header className="leaderboard-page__header">
        <h1>ТОП 10</h1>
      </header>
      <div className="user-items">
        {leaderBoard.map((user, i) => (
          <div key={user.id} className="user-item">
            <span>{i + 1}.</span>
            <p>{user.username}</p>
            <span>{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

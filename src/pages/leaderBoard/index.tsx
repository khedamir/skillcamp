import { useEffect, useState } from "react";
import { profileService } from "../../services/profile.service";
import { LeaderBoardUserData } from "../../redux/types";
import Loader from "../../components/loader";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    profileService.getLeaderBoard().then((data) => {
      setLeaderBoard(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="leaderboard-page page-container">
      <header className="leaderboard-page__header">
        <h1>ТОП 10</h1>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="user-items">
          {leaderBoard.map((user, i) => (
            <div key={user.id} className="user-item">
              <span>{i + 1}.</span>
              <p>{user.username}</p>
              <span>{user.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={logo} alt="SkillCamp" />
      <h1>SkillCamp</h1>
      <Link to={"/login"}>Авторизоваться</Link>
    </div>
  );
};

export default HomePage;

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={logo} alt="SkillCamp" />
      <h1>SkillCamp</h1>
      <Link to={"/signin"}>Авторизоваться</Link>
    </div>
  );
};

export default HomePage;

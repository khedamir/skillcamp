import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>SkillCamp</h1>
      <Link to={"/login"}>Авторизоваться</Link>
    </div>
  );
};

export default HomePage;

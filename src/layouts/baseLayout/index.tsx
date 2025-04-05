import { FC, ReactNode, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { userLoginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setAutharizationData } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";

interface BaseLayotProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayotProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userLoginService
      .userAutharization()
      .then((data) => {
        dispatch(setAutharizationData({ data }));
      })
      .catch(() => navigate("/signin"));
  }, [dispatch, navigate]);

  return (
    <div className="base-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;

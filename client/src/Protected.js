import { useNavigate } from "react-router-dom";

function Protected({ isAuth, Cmp, isAdmin }) {
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/login", { replace: true });
  } else {
    return <Cmp isAdmin={isAdmin} isAuth={isAuth} />;
  }
}

export default Protected;

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SplashLoader from "../components/SplashLoader";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    navigate("/home", { replace: true });
  }, [navigate]);

  return <SplashLoader onComplete={handleComplete} />;
}

import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
  children,
  authentication = true,
}: {
  children: JSX.Element;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.userStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/signin");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [authStatus, authentication, navigate]);
  return loading ? <div>Loading...</div> : <>{children}</>;
}

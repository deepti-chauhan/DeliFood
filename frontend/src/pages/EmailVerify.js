import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import env from 'react-dotenv'

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${env.BASE_URL}/api/user/${param.userId}/verify/${param.token}`;
        console.log('url', url)
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log("user data : ",data);
          setValidUrl(true);
        } else {
          console.log("Error:", response.status);
          setValidUrl(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {validUrl ? ( 
        <div>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerify;

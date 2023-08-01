import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="">
      <div className="contentErrorPage">
        <h2 className="title">404 Page not found</h2>
        <Link to={"/"} className="btnBackToHome">
          Go back to Homepage.
        </Link>
      </div>
    </div>
  );
}

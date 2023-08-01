import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="ErrorPage">
      <p>
        Error <span className="text-danger">404</span>. Page not found. Go Back
        to{" "}
        <Link to={"/"} className="text-decoration-none">
          Homepage
        </Link>
      </p>
    </div>
  );
}

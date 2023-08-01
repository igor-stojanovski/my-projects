import React from "react";
import FooterList from "./FooterList";

type Props = {};

export default function Footer({}: Props) {
  const eventInfo = [
    "Enter Now",
    "Event Info",
    "Course Maps",
    "Race Pack",
    "Results",
    "FAQs",
    "Am I Registered?",
  ];

  const registration = [
    "Volunteers",
    "Gallery",
    "Press",
    "Results",
    "Privacy Policy",
    "Service Plus",
    "Contacts",
  ];

  const schedule = [
    "Gallery",
    "About",
    "Videos",
    "Race Pack",
    "Results",
    "FAQs",
    "Am I Registered?",
  ];

  return (
    <footer className="container-fluid footer">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <h3>Social share</h3>
              <ul className="social-links">
                <li>
                  <a href="">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <FooterList title="Event Info" linksList={eventInfo} />
            </div>
            <div className="col-3">
              <FooterList title="Registration" linksList={registration} />
            </div>
            <div className="col-3">
              <FooterList title="Schedule" linksList={schedule} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

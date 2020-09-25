import React from "react";
import "./visitorDetail.scss";
import { Card } from "../../../components/controls/card/Card";

export const VisitorDetail = () => {
  const techonology = [
    {
      attribute: "Ip Address",
      vlaue: "192.168.0.1",
    },
    {
      attribute: "Browser",
      vlaue: "Chrome (84.0.4147.135)",
    },
    {
      attribute: "User agent",
      vlaue:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
    },
  ];
  return (
    <div className="visitor-detail">
      <Card>
        <h3 className="card-header-middle">Visitor Details</h3>

        <div className="basic-detail">
          <img src="https://miro.medium.com/fit/c/96/96/2*LBsubWLK8pNk4MaJJOvBlQ.png" />
          <div className="visitor-name">Henok Dejen</div>
          <div className="visitor-id">henokdejen84@gmail.com</div>
        </div>
      </Card>

      <Card>
        <div className="technology">
          <h4>Source details</h4>
          {techonology.map((tech, index) => (
            <div className="techonoloy-item" key={index}>
              <span className="attribute">{tech.attribute}: </span>
              {tech.vlaue}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h4>Visited Sites</h4>
        {[1, 2, 3].map((site, index) => (
          <div className="visited-site-item" key={index}>
            <div className="v-s-n">This is the site title</div>
            <a className="v-s-l" href="#">
              https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
            </a>
          </div>
        ))}
      </Card>
    </div>
  );
};

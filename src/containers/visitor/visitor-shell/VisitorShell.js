import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink, useRouteMatch } from "react-router-dom";
import Button from "../../../components/controls/buttons/Button";
import { Card } from "../../../components/controls/card/Card";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { InnerNavHeader } from "../../../components/controls/innerHeader/InnerNavHeader";
import { InnerNav } from "../../../components/controls/innerNav/InnerNav";
import { createConversationRequested } from "../../../store/actions";
import "./visitorsShell.scss";

const VisitorNavItem = ({ to, children }) => {
  return (
    <NavLink to={to} className="visitor-nav-item " activeClassName="active">
      {children}
    </NavLink>
  );
};

const VisitorItem = withRouter(({ visitor, createConversation, history }) => {
  const onStartChat = (e) => {
    createConversation(visitor.browserID, history);
  };

  return (
    <div className="visitor-item">
      <div className="visitor-id">#{visitor.browserID}</div>
      <div className="user-agent">{visitor.userAgent.split("/")[0]}</div>
      <div className="visiting-site">
        <a href={`http://${visitor.host}`} target="_blank">
          http://{visitor.host}
        </a>
      </div>
      <div className="actions">
        <Button onClick={onStartChat} variant="primary" size="sm">
          Start Chat
        </Button>
      </div>
    </div>
  );
});

const menus = [
  {
    name: "Unassigned Visitors",
    path: "unassigned",
  },
  {
    name: "Assigned Visitors",
    path: "assigned",
  },
  {
    name: "All Visitors",
    path: "all",
  },
];

const VisitorShell = ({ createConversation, getOnlineVisitors }) => {
  let { path } = useRouteMatch();

  let onlineVisitors = getOnlineVisitors();
  console.log("RECEIVED visitors", onlineVisitors);

  return (
    <div className="visitors-wrapper">
      <InnerNav className="visitors-nav">
        <InnerNavHeader>Visitors</InnerNavHeader>
        {menus.map((menu, index) => {
          return (
            <VisitorNavItem to={`${path}/${menu.path}`} key={index}>
              {menu.name}
            </VisitorNavItem>
          );
        })}
      </InnerNav>

      <div className="visitors-list-wrapper">
        <InnerHeader>
          <div className="title">All Visitors</div>
        </InnerHeader>
        <div>
          {onlineVisitors.length ? (
            onlineVisitors.map((v) => (
              <VisitorItem
                key={v.browserID}
                visitor={v}
                createConversation={createConversation}
              />
            ))
          ) : (
            <div className="no-visitors">You have got no visitors</div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let props = {
    getOnlineVisitors: () => state.visitorsState.onlineVisitors,
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const createConversation = (browserID, history) => {
    dispatch(createConversationRequested(browserID, history));
  };

  return { createConversation };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitorShell);

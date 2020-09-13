import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink, useRouteMatch } from "react-router-dom";
import Button from "../../components/controls/buttons/Button";
import { Card } from "../../components/controls/card/Card";
import { InnerHeader } from "../../components/controls/innerHeader/InnerHeader";
import { InnerNavHeader } from "../../components/controls/innerHeader/InnerNavHeader";
import { InnerNav } from "../../components/controls/innerNav/InnerNav";
import { createConversationRequested } from "../../store/actions";
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
    // history.push('/conversations')
    createConversation(visitor.browserID, history);
  };
  return (
    <div className="visitor-item">
      <div className="visitor-id">#{visitor.browserID}</div>
      <div className="visiting-site">
        <a href="#">https://dummy.url.fornow/#chatwindow_0-tab</a>
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
    name: "Unassigned Visitors (18)",
    path: "unassigned",
  },
  {
    name: "Assigned Visitors (12)",
    path: "assigned",
  },
  {
    name: "All Visitors (30)",
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

      <div className="visitors-list-wrapper setting-sections-wrapper">
        <InnerHeader>
          <h4>All Visitors</h4>
        </InnerHeader>
        <Card>
          {onlineVisitors.map((v) => (
            <VisitorItem
              key={v.browserID}
              visitor={v}
              createConversation={createConversation}
            />
          ))}
        </Card>
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

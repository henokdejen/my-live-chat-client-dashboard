import React from "react";
import Select from "react-select";
import { connect } from "react-redux";

import "./header.scss";
import { DropDownMenu } from "../../components/controls/dropDownMenu/DropDownMenu";
import { DDMenuItem } from "../../components/controls/dropDownMenu/DDMenuItem/DDMenuItem";
import { BsChevronDown, BsFillCaretDownFill } from "react-icons/bs";
import { ProjectSelector } from "./project-selector/ProjectSelector";
import { withRouter } from "react-router-dom";
import { openAddProject, switchProjectRequested } from "../../store/actions";
import Profile from "./profile-popup/Profile";

const Header = withRouter(
  ({ currentProjectId, projects, switchProject, addNewProject, history }) => {
    return (
      <header className="main-header">
        <div className="header-left">
          <input className="header-search" type="text" placeholder="Search" />
        </div>

        <div className="header-right">
          <ProjectSelector
            projects={projects}
            onProjectSelected={(projectID) => switchProject(projectID, history)}
            handleAddNew={() => addNewProject(history)}
          />

          <Profile />
        </div>
      </header>
    );
  }
);

const mapStateToProps = (state) => {
  let { userInfo, projectInfo } = state.basicState;

  let currentProjectId = projectInfo._id;

  // console.log('fi', )

  let projects = userInfo.projects.map((project) => ({
    id: project.projectID,
    label: project.siteName,
    isCurrent: project.projectID === projectInfo._id,
  }));
  return { currentProjectId, projects };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  switchProject: (projectID, history) => {
    dispatch(switchProjectRequested(projectID, history));
    console.log(history);
  },

  addNewProject: (history) => {
    dispatch(openAddProject(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

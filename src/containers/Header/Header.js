import React from "react";
import Select from "react-select";
import { connect } from "react-redux";

import "./header.scss";
import { DropDownMenu } from "../../components/controls/dropDownMenu/DropDownMenu";
import { DDMenuItem } from "../../components/controls/dropDownMenu/DDMenuItem/DDMenuItem";
import { BsChevronDown, BsFillCaretDownFill } from "react-icons/bs";
import { ProjectSelector } from "../../components/project-selector/ProjectSelector";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#ddd",
    minHeight: "30px",
    height: "30px",
    minWidth: "180px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "10px",
    disabled: true,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
  }),
};

const Header = ({ currentProjectId, projects }) => {
  return (
    <header className="main-header">
      <div className="header-left">
        <input className="header-search" type="text" placeholder="Search" />
      </div>

      <div className="header-right">
        <ProjectSelector projects={projects} />
      </div>
    </header>
  );
};

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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from "react";
import { useState } from "react";
import {
  BsCheck,
  BsFillCaretDownFill,
  BsKanban,
  BsPlusCircleFill,
} from "react-icons/bs";
import { PopupContainer } from "../../../components/controls/popupContainer/PopupContainer";
import "./projectSelector.scss";

export const ProjectSelector = ({
  projects,
  onProjectSelected,
  handleAddNew,
}) => {
  const [showProjects, setshowProjects] = useState(false);

  const currentProject = projects.find((project) => project.isCurrent);

  return (
    <div className="projects-wrapper">
      <div
        className="selected-project"
        onClick={() => setshowProjects(!showProjects)}
      >
        <BsKanban />
        <span className="selected-proj-name"> {currentProject.label}</span>
        <BsFillCaretDownFill />
      </div>
      {showProjects && (
        <PopupContainer
          className="projects-popup-wrapper"
          handleClose={() => setshowProjects(false)}
        >
          <div className="projects-header">Projects ({projects.length}/10)</div>
          <div className="projects-list">
            {projects.map(({ id, label, isCurrent }) => (
              <div
                className="project-lst-itm"
                key={id}
                onClick={() => onProjectSelected(id)}
              >
                <span className="selected-icon lst-itm-icon">
                  {isCurrent && <BsCheck />}
                </span>
                <span className="proj-name">{label}</span>
              </div>
            ))}
          </div>

          <div className="project-actions">
            <div className="add-proj project-lst-itm" onClick={handleAddNew}>
              <span className=" lst-itm-icon">
                <BsPlusCircleFill />
              </span>
              Add New
            </div>
          </div>
        </PopupContainer>
      )}
    </div>
  );
};

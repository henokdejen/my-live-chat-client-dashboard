import React from "react";
import { useState } from "react";
import { BsCheck, BsFillCaretDownFill, BsPlusCircleFill } from "react-icons/bs";
import { PopupContainer } from "../controls/popupContainer/PopupContainer";
import "./projectSelector.scss";

export const ProjectSelector = ({
  projects,
  onProjectSelected,
  handleAddNew,
}) => {
  const [showProjects, setshowProjects] = useState(false);

  return (
    <div className="projects-wrapper">
      <div
        className="selected-project"
        onClick={() => setshowProjects(!showProjects)}
      >
        <span className="selected-proj-name"> What Do you Mean </span>{" "}
        <BsFillCaretDownFill />
      </div>
      {showProjects && (
        <PopupContainer
          className="projects-popup-wrapper"
          handleClose={() => setshowProjects(false)}
        >
          <div className="projects-header">Projects (3/5)</div>
          <div className="projects-list">
            {projects.map(({ id, label, isCurrent }) => (
              <div className="project-lst-itm" key={id}>
                <span className="selected-icon lst-itm-icon">
                  {isCurrent && <BsCheck />}
                </span>
                <span className="proj-name">{label}</span>
              </div>
            ))}
          </div>

          <div className="project-actions">
            <div className="add-proj project-lst-itm">
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

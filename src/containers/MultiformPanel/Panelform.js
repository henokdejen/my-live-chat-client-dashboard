import React from "react";
import "./Panelform.scss";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { addprojectRequested } from "../../store/actions/project";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { LS_TOKEN } from "../../constants";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const PanelformComponent = ({ errors, touched, projectInfo }) => {
  const [firsttimeloading, setFirstTimeLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    if (projectInfo.ErrorMessage) {
      console.log("error on adding");
    } else {
      // if (!firsttimeloading) history.push("/");
    }
    setFirstTimeLoading(false);
  }, [projectInfo]);

  return (
    <div className="panelrootcontainer">
      <div className="panelprogressbar">
        <p>
          <span> Step 1</span> / 1
        </p>
        <div className="paneldotcontainer">
          <span className="paneldot-active"></span>
          {/* <span className={`${currentStep == 2 ? "paneldot-active" : "paneldot"}`}></span> */}
        </div>
      </div>

      <div className="panelstepsContainer">
        <Form>
          <p className="formStepswelcome"> Project Details </p>
          <div className="formStepsinnerform">
            {touched.websitename && errors.websitename && (
              <p className="stepserrormessage">{errors.websitename}</p>
            )}
            <p> Website name </p>
            <Field type="text" placeholder="example" name="websitename" />

            {touched.websiteurl && errors.websiteurl && (
              <p className="stepserrormessage">{errors.websiteurl}</p>
            )}
            <p> Website address </p>
            <Field
              type="text"
              placeholder="www.example.com"
              name="websiteurl"
            />
          </div>
          <div className="panelnav-buttons">
            {/* <button type="button" onClick={()=>{goBack()}} className="panelgobk"> Go back </button> */}
            <button type="submit" className="panelgofd">
              {" "}
              Continue{" "}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

let Panelform = withRouter(
  withFormik({
    mapPropsToValues({ websitename, websiteurl }) {
      return {
        websitename: websitename || "",
        websiteurl: websiteurl || "",
      };
    },

    validationSchema: Yup.object().shape({
      websitename: Yup.string().required("*required"),
      websiteurl: Yup.string()
        .matches(
          /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Enter correct url!"
        )
        .required("*required"),
    }),

    handleSubmit(values, { props }) {
      if (localStorage.getItem(LS_TOKEN))
        props.dispatch(addprojectRequested(values, props.history));
    },
  })(PanelformComponent)
);

const mapStateToProps = (state) => {
  return {
    projectInfo: state.projectState,
  };
};

export default connect(mapStateToProps)(Panelform);

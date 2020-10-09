import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { connect } from "react-redux";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import * as API from "../../../API/base";
import Button from "../../../components/controls/buttons/Button";
import { ButtonWithLoader } from "../../../components/controls/buttons/ButtonWithLoader/ButtonWithLoader";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { ChangePasswordModal } from "../../../components/modals/changePasswordModal/ChangePasswordModal";
import { timeZoneOptions } from "../../../services/timezone-select-options";
import { userDataChanged } from "../../../store/actions";
import "./myProfile.scss";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("* Required")
    .test(
      "name",
      "Name should contain first name and last name separated by space",
      (name) => {
        return name && name.trim().split(" ").length === 2;
      }
    ),

  timeZone: Yup.string().required("* Required"),
});

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#ddd",
    minHeight: "30px",
    height: "35px",
    fontSize: "0.8em",
    boxShadow: state.isFocused ? null : null,
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "0.8em",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
  }),
};

const MyProfile = ({ userInfo, userInfoUpdated }) => {
  const [showChangePasswordModal, setshowChangePasswordModal] = useState(false);
  const [submitError, setsubmitError] = useState("");

  const [uploadingPP, setuploadingPP] = useState(false);

  const [profilePic, setprofilePic] = useState("");

  const fileSelector = useRef(null);

  const deleteProfilePic = (e) => {
    e.preventDefault();
    setprofilePic("");
  };

  const openFileSelector = (e) => {
    e.preventDefault();
    if (fileSelector.current) {
      fileSelector.current.click();
    }
  };

  const onProfileImageSelected = (e) => {
    const fileList = e.target.files;
    if (fileList.length) {
      setuploadingPP(true);
      setTimeout(() => {
        setprofilePic(URL.createObjectURL(fileList[0]));
        setuploadingPP(false);
      }, 1000);
    }
  };

  const updateProfile = (values, { setSubmitting }) => {
    setsubmitError("");
    setTimeout(() => {
      API.updateProfile(values.name, values.timeZone)
        .then((response) => {
          if (response.success) {
            userInfoUpdated(values.name, values.timeZone);
          } else {
            setsubmitError(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setSubmitting(false);
        });
    }, 1000);
  };

  return (
    <div className="my-profile setting-sections-wrapper">
      <input
        ref={fileSelector}
        onChange={onProfileImageSelected}
        type="file"
        id="file-selector"
        accept=".jpg, .jpeg, .png"
        hidden
      />

      {showChangePasswordModal && (
        <ChangePasswordModal
          handleClose={() => setshowChangePasswordModal(false)}
        />
      )}
      <InnerHeader>
        <div className="title">
          <BsFillPeopleFill />
          My Account
        </div>
      </InnerHeader>
      <div className="profile-edit-form">
        <div className="profile-edit-basic">
          <Formik
            initialValues={{
              name: userInfo.name,
              email: userInfo.email,
              timeZone: userInfo.timeZone,
            }}
            validationSchema={ProfileSchema}
            onSubmit={updateProfile}
          >
            {({
              errors,
              touched,
              isSubmitting,
              values,
              setValues,
              resetForm,
            }) => (
              <Form>
                <table>
                  <tbody>
                    <tr className="profile-edit-row">
                      <td className="edit-attribute">Name: </td>
                      <td className="edit-value">
                        <Field className="input-text" type="text" name="name" />
                      </td>
                    </tr>
                    {touched.name && errors.name && (
                      <tr className="profile-edit-row form-error-row">
                        <td className="edit-attribute"></td>
                        <td className="edit-value field-msg form-error-msg">
                          {errors.name}
                        </td>
                      </tr>
                    )}
                    <tr className="profile-edit-row">
                      <td className="edit-attribute">Email: </td>
                      <td className="edit-value">
                        <Field
                          className="input-text"
                          type="email"
                          name="email"
                          disabled
                        />
                      </td>
                    </tr>

                    <tr className="profile-edit-row">
                      <td className="edit-attribute">Time Zone:</td>
                      <td className="edit-value">
                        <Select
                          classNamePrefix="select"
                          defaultValue={timeZoneOptions[0]}
                          value={
                            timeZoneOptions.filter(
                              (tz) => tz.value === values.timeZone
                            )[0]
                          }
                          options={timeZoneOptions}
                          styles={customStyles}
                          onChange={(e) => {
                            values.timeZone = e.value;
                            setValues(values);
                          }}
                        />
                        {touched.timeZone && errors.timeZone && (
                          <tr className="profile-edit-row">
                            <td className="edit-attribute"></td>
                            <td className="edit-value field-msg form-error-msg">
                              {errors.timeZone}
                            </td>
                          </tr>
                        )}
                      </td>
                    </tr>
                    <tr className="profile-edit-row">
                      <td className="edit-attribute">Passwrod</td>
                      <td className="edit-value">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setshowChangePasswordModal(true);
                          }}
                        >
                          Change Password
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {submitError && (
                  <div className="field-msg form-error-msg">{submitError}</div>
                )}

                <div className="action-zone">
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      resetForm();
                      setsubmitError("");
                    }}
                  >
                    Reset
                  </Button>
                  <ButtonWithLoader
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save Changes
                  </ButtonWithLoader>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="profile-edit-pp">
          <div className="profile-pic-preview">
            {profilePic && (
              <img className="avatar profile-edit-pic" src={profilePic} />
            )}
            {uploadingPP && <ClipLoader />}
          </div>

          <div className="pic-actions">
            <a href="#" onClick={openFileSelector}>
              Change
            </a>
            <a href="#" onClick={deleteProfilePic}>
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { userInfo } = state.basicState;
  return { userInfo };
};

const mapDispatchToProps = (dispatch) => ({
  userInfoUpdated: (name, timeZone) => {
    dispatch(userDataChanged(name, timeZone));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

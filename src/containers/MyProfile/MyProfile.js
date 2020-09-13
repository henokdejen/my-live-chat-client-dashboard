import React, { useState, useRef } from "react";
import "./myProfile.scss";
import { InnerHeader } from "../../components/controls/innerHeader/InnerHeader";
import { BsFillPeopleFill } from "react-icons/bs";
import Button from "../../components/controls/buttons/Button";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import * as API from "../../API/base";
import { ChangePasswordModal } from "../../components/modals/changePasswordModal/ChangePasswordModal";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { userDataChanged } from "../../store/actions";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("* Required")
    .test("name", "Name should contain first name and last name", (name) => {
      return name && name.trim().split(" ").length === 2;
    }),

  timeZone: Yup.string().required("* Required"),
});

const MyProfile = ({ userInfo, userInfoUpdated }) => {
  const [showChangePasswordModal, setshowChangePasswordModal] = useState(false);
  const [submitError, setsubmitError] = useState("");

  const [profilePic, setprofilePic] = useState("");

  const fileSelector = useRef(null);

  const deleteProfilePic = (e) => {
    e.preventDefault();
    alert("henok");
  };

  const openFileSelector = () => {
    if (fileSelector.current) {
      fileSelector.current.click();
    }
  };

  const onProfileImageSelected = (e) => {
    const fileList = e.target.files;
    console.log(fileList);
    setprofilePic(URL.createObjectURL(fileList[0]));
  };

  const updateProfile = (values, { setSubmitting }) => {
    setSubmitting("");
    setTimeout(() => {
      API.updateProfile(values.name, values.timeZone)
        .then((response) => {
          console.log(response);
          if (response.success) {
            console.log("Password chaged!");
            userInfoUpdated(values.name, values.timeZone);
          } else {
            setsubmitError(response.message);
            setSubmitting("");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          console.log("Finally hre");
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
            {({ errors, touched, isSubmitting, resetForm }) => (
              <Form>
                <table>
                  <tbody>
                    <tr className="profile-edit-row">
                      <td className="edit-attribute">Name: </td>
                      <td className="edit-value">
                        <Field className="input-text" type="text" name="name" />
                        {touched.name && errors.name && (
                          <div className="field-msg form-error-msg">
                            {errors.name}
                          </div>
                        )}
                      </td>
                    </tr>
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
                        <Field
                          className="input-text"
                          type="text"
                          name="timeZone"
                        />
                        {touched.timeZone && errors.timeZone && (
                          <div className="field-msg form-error-msg">
                            {errors.timeZone}
                          </div>
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
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? <ClipLoader /> : "Save Agents"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="profile-edit-pp">
          <div className="profile-pic-preview">
            <img
              className="avatar profile-edit-pic"
              src={
                profilePic
                  ? profilePic
                  : "https://s3.eu-west-1.amazonaws.com/avatars.tidiochat.com/810ec96a5b34737441be61fdafbda3d1.png"
              }
            ></img>
            <ClipLoader />
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

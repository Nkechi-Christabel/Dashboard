import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/actions/userActions";
import { useState } from "react";
import { nanoid } from "nanoid";
// import toast, { Toaster } from "react-hot-toast";

// form validation
const reviewSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required().max(14),
  email: yup.string().required().email(),
  city: yup.string().required(),
});

const AddNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const { error } = useSelector((state) => state.allUsers);

  //Initial value before form is submitted
  const initialValues = {
    id: nanoid(),
    name: "",
    username: "",
    email: "",
    city: "",
  };

  //This is invoked when the form is submitted
  const handleSubmit = ({ id, name, username, email, city }) => {
    setStatus("loading");
    //Payload Schema
    const newUser = {
      id,
      name,
      username,
      email,
      address: {
        street: null,
        suite: null,
        city,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
    };

    dispatch(createUser(newUser));

    //Push back to the Homepage
    navigate("/");

    // setTimeout(() => {
    //   setStatus("success");
    //   toast.success("User successfully created!");

    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // }, 1000);
  };

  //Changes the text in the submit button depending on the status
  const renderSubmitText = () => {
    if (status === "idle" || status === "error") {
      return "Submit";
    } else if (status === "success") {
      return "Submitted!";
    } else if (status === "loading") {
      return "Submitting...";
    }
  };

  return (
    <div>
      {error ? (
        <div className="h-96 pt-52 flex justify-center items-center text-xl text-red-500 font-mono">
          {error}
        </div>
      ) : (
        <>
          {/* <Toaster position="top-right" /> */}
          <Formik
            initialValues={initialValues}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              handleSubmit(values);
            }}
          >
            {({ isSubmitting }) => (
              <div className="mt-14 shadow-md md:w-11/12">
                <p className="font-semibold text-lg p-6 ">Form</p>
                <hr />
                <Form className="p-7">
                  <div className="mb-7 md:ml-16">
                    <div className="flex justify-between">
                      <label htmlFor="name" className="font-semibold lg:ml-3">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="border border-gray-300 rounded py-1 pl-3 w-10/12"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="py-3 flex justify-center text-red-500"
                    />
                  </div>
                  <div className="mb-7 md:ml-16">
                    <div className="flex justify-between">
                      <label htmlFor="email" className="font-semibold lg:ml-3">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="off"
                        className="border border-gray-300 rounded py-1 pl-3 w-10/12"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="py-3 pl-16 flex justify-center text-red-500"
                    />
                  </div>
                  <div className="mb-7 md:ml-16">
                    <div className="flex justify-between">
                      <label htmlFor="city" className="font-semibold lg:ml-3">
                        City
                      </label>
                      <Field
                        type="text"
                        name="city"
                        className="border border-gray-300 rounded py-1 pl-3 w-10/12"
                      />
                    </div>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="py-3 flex justify-center text-red-500 w-full"
                    />
                  </div>
                  <div className="mb-7 md:ml-16">
                    <div className="flex justify-between">
                      <label
                        htmlFor="username"
                        className="font-semibold lg:ml-3"
                      >
                        User name
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="border border-gray-300 rounded py-1 pl-3 w-10/12"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="py-3 flex justify-center text-red-500"
                    />
                  </div>
                  <div className="flex justify-end mt-10 mb-3">
                    <button
                      type=""
                      className="py-1 px-7 mr-3 my-2 rounded border border-red-500 text-red-500 block"
                      disabled={isSubmitting}
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`py-1 px-7 my-2 rounded bg-green-500 text-white block ${
                        status === "loading" && "bg-opacity-70"
                      }`}
                      disabled={status === "loading"}
                    >
                      {renderSubmitText()}
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default AddNewUser;

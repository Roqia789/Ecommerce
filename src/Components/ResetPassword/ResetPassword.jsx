import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
// import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

//   let { userLogin, setUserLogin } = useContext(UserContext);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "newPassword should be between 6 and 10 characters"
      )
      .required("newPassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleResetPassword,
  });

  function handleResetPassword() {
    setIsLoading(true);
    return axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: formik.values.email,
        newPassword: formik.values.newPassword,
      })
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        // setUserLogin(res.data.token);
        navigate("/");
        setIsLoading(false);
        return res;
      })
      .catch((res) => {
        setIsLoading(false);
        return res;
      });
  }

  return (
    <>
      <div className="my-5 p-5">
        <h2 className="font-bold text-2xl text-emerald-600  text-center mb-8">
          reset your account password
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-center text-red-600"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              name="newPassword"
              type="password"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              newPassword
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-center text-red-600"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 items-center">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
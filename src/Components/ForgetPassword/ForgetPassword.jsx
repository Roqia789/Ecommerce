import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleForgetPass,
  });

  async function handleForgetPass(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setIsLoading(false);
        navigate("/verify-code");
        return res;
    } catch (res) {
        setApiError(res.response.data.message);
        setIsLoading(false);
      }    
  }

  return (
    <>
      {apiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3">
          {apiError}
        </div>
      ) : null}

      <div className="my-5 p-5">
        <h2 className="font-bold text-2xl text-emerald-600  text-center mb-8">
          please enter your verification code
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
              Enter Your Email
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
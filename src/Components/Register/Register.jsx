import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Regestier = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerUser(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      
      toast.success(res.data.message);

      setIsLoading(false);
      navigate("/Login");
      
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be min 3 chars")
      .max(15, "Name must be max 15 chars"),
    email: Yup.string()
      .required("Email is Required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must be start uppercase"),
    rePassword: Yup.string()
      .required("RePassword is Required")
      .oneOf([Yup.ref("password")], "RePassword not match with Password")
      . min(8,'too Short!')
      .max(16,'too Long!'),
    phone: Yup.string()
    .required("Phone is Required")
    .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation,
  });

  return (
    <>
      <div className="py-5">
        <h1 className="mb-8 text-green-700 text-5xl font-bold text-center">
          Registeration Form
        </h1>
        <div className="md:w-[60%] mx-auto md:p-0 p-5">
          
          <form onSubmit={formik.handleSubmit}>
            {/* input name */}
            <div className="relative z-0 w-full mb-6 group ">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name:
              </label>
            </div>
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span>
                {formik.errors.name}
              </div>
            ) : (
              ""
            )}

            {/* input e-mail */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email:
              </label>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span>
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}

            {/* input password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span>
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}

            {/* input re-password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="Password"
                name="rePassword"
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span>
                {formik.errors.rePassword}
                
              </div>
            ) : (
              " "
            )}

            {/* input phone */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone:
              </label>
            </div>
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span>
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading == true ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Regestier;

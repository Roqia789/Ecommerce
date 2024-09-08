import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
// import { UserContext } from "../../Context/UserContext";



const Login = () => {
  
  // let { userLogin, setUserLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const {setToken} = useContext(AuthContext)

  const user = {
    email: "",
    password: "",
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must be start uppercase"),
  });

  async function loginUser(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
        
      );
      toast.success(res.data.message);
      navigation("/"); 
      setToken(res.data.token);
      localStorage.setItem("tkn" , res.data.token);
      // setUserLogin(res.data.token);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation,
  });

  return (
    <>
      <div className="py-1">
        <div className="md:w-[60%] mx-auto md:p-0 p-5">

          <h1 className="mb-8 mt-32 text-3xl">
          login now
        </h1>

          <form onSubmit={formik.handleSubmit}>
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
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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

            <div className="w-full relative">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-[16px] px-5 py-2 text-center me-2 mb-2 absolute top-0 end-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading == true ? (
                <i className="fa-solid fa-spinner fa-spin text-white"></i>
              ) : (
                "login now"
              )}
            </button>
            <Link to="/forget-password">
              <span className="text-blue-500 underline">Forget Password?</span>
            </Link>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";



export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const checkMail = await axios.get(
        `http://localhost:5001/users?email=${values.email}`
      );
      if (checkMail.data.length > 0) {
        toast.error("⚠️ Email already registered. Try logging in.");
        return;
      }
      const newUser = {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        password: values.password,
        status: "active",  
      deleted: false,     
      role: "user"       
      };
      await axios.post("http://localhost:5001/users", newUser);
      login(newUser);

      toast.success("Account created successfully!");
      resetForm();
      navigate("/login"); 
    } catch (error) {
      console.log("fetch failed", error.message);
     toast.error("Registration failed, try again!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            password: "",
            repassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mt-6 space-y-4 bg-black p-6 rounded-lg shadow-lg">
              <div className="text-center h-40">
                <img src="shoeVerse.png" alt="Logo" className="h-50 mx-auto" />
              </div>
              <h2 className="text-center text-2xl font-bold text-white">
                Create your account
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullname"
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Phone
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="repassword"
                  placeholder="Re-enter password"
                  className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="repassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500"
                />
                <span className="ml-2">
                  I agree to the{" "}
                  <a href="#" className="text-green-400 hover:text-green-300">
                    Terms & Conditions
                  </a>
                </span>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 py-2 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Register
              </button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?
                <a href="/login" className="text-green-400 hover:text-green-300">
                  Sign in
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

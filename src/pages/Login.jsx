import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState(false);

  const form = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const ok = await login({
        username: values.username,  // treated as email
        password: values.password,
        isAdmin: isAdminMode,
      });

      if (ok) {
        if (isAdminMode) {
          window.location.href = "/AdminHome";
        } else {
          window.location.href = "/Dashboard";
        }
      } else {
        alert("Login failed. Check your email and password.");
      }
    },
  });

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
  };

  return (
    <div
      style={{
        width: 402,
        height: 874,
        position: "relative",
        background: "#FAFAFA",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {/* FORM */}
      <form onSubmit={form.handleSubmit}>
        {/* EMAIL INPUT */}
        <input
          name="username"
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          placeholder="username"
          style={{
            width: 284.75,
            height: 63.37,
            left: 59,
            top: 444,
            position: "absolute",
            outline: "4px #B8ED44 solid",
            outlineOffset: "-2px",
            border: "none",
            background: "transparent",
            textAlign: "center",
            textTransform: "none",
            color: "#42554F",
            fontSize: 20,
            fontFamily: "Roboto",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        />
        {form.touched.username && form.errors.username && (
          <small
            style={{
              position: "absolute",
              left: 59,
              top: 512,
              color: "crimson",
              fontSize: 12,
            }}
          >
            {form.errors.username}
          </small>
        )}

        {/* PASSWORD INPUT */}
        <input
          type="password"
          name="password"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          placeholder="password"
          style={{
            width: 284.75,
            height: 63.37,
            left: 59,
            top: 537,
            position: "absolute",
            outline: "4px #B8ED44 solid",
            outlineOffset: "-2px",
            border: "none",
            background: "transparent",
            textAlign: "center",
            textTransform: "none",
            color: "#42554F",
            fontSize: 20,
            fontFamily: "Roboto",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        />
        {form.touched.password && form.errors.password && (
          <small
            style={{
              position: "absolute",
              left: 59,
              top: 605,
              color: "crimson",
              fontSize: 12,
            }}
          >
            {form.errors.password}
          </small>
        )}

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          style={{
            width: 284.75,
            height: 63.37,
            left: 60,
            top: 630,
            position: "absolute",
            background: "#B8ED44",
            outline: "4px #B8ED44 solid",
            outlineOffset: "-2px",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: "#42554F",
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            SIGN IN
          </span>
        </button>
      </form>

      {/* WELCOME TEXT */}
      <div
        style={{
          left: 121,
          top: 374,
          position: "absolute",
          textAlign: "center",
          color: "#42554F",
          fontSize: 33,
          fontFamily: "Roboto",
          fontWeight: 700,
          lineHeight: "40px",
        }}
      >
        {isAdminMode ? "ADMIN LOGIN" : "WELCOME"}
      </div>

      {/* "Are you a gym admin?" */}
      <div
        style={{
          width: 402,
          height: 200,
          left: 0,
          top: 756,
          position: "absolute",
          background: "#CCCCCC",
          borderRadius: 10,
        }}
      />

      <div
        style={{
          width: 264,
          height: 34,
          left: 72,
          top: 777,
          position: "absolute",
          textAlign: "center",
          color: "#42554F",
          fontSize: 25,
          fontFamily: "Roboto",
          fontWeight: 500,
        }}
      >
        Are you a gym admin?
      </div>

      {/* Admin toggle box */}
      <button
        type="button"
        onClick={toggleAdminMode}
        style={{
          width: 35,
          height: 35,
          left: 184,
          top: 822,
          position: "absolute",
          background: isAdminMode ? "#42554F" : "transparent",
          border: "4px solid #42554F",
          cursor: "pointer",
        }}
      />

      {/* HERO SECTION — unchanged */}
      <div
        style={{
          width: 402,
          height: 301.24,
          left: 0,
          top: 0,
          position: "absolute",
          background: "#C1E973",
        }}
      />
      <div
        style={{
          width: 266.88,
          height: 170.41,
          left: 0,
          top: 130.76,
          position: "absolute",
          background: "#42554F",
          padding: "16px 18px",
          borderTopRightRadius: 32,
          color: "#FFFFFF",
        }}
      />
      <div
        style={{
          left: 10,
          top: 227,
          position: "absolute",
          color: "white",
          fontSize: 15,
          fontFamily: "Roboto",
          fontWeight: 400,
        }}
      >
        One App. Every gym <br />
        Train anywhere, anytime. <br />
        Your way.
      </div>
      <div
        style={{
          left: 10,
          top: 175,
          position: "absolute",
          color: "white",
          fontSize: 33,
          fontFamily: "Roboto",
          fontWeight: 700,
          lineHeight: "40px",
        }}
      >
        All You Can Gym
      </div>
    </div>
  );
}

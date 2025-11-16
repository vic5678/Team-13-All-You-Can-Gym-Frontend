import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

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
    <div>
        <Header
        title="All You Can Gym"
        subtitle={<>One App. Every gym<br />Train anywhere, anytime. <br />Your way.</>}
        userIcon={false}
      />
      {/* WELCOME TEXT */}
      <div
        style={{
          margin: "3rem 0",
          textAlign: "center",
          color: "var(--global-accent-color)",
          fontSize: 33,
          fontFamily: "Roboto",
          fontWeight: 700,
          lineHeight: "40px",
        }}
      >
        {isAdminMode ? "ADMIN LOGIN" : "WELCOME"}
      </div>
      
      {/* FORM */}
      <form 
        onSubmit={form.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto',
        }}
      >
        {/* EMAIL INPUT WRAPPER */}
        <div>
          <input
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="username"
            style={{
              width: '100%',
              height: 63.37,
              outline: "4px var(--global-accent-color-secondary) solid",
              outlineOffset: "-2px",
              border: "none",
              background: "transparent",
              textAlign: "center",
              textTransform: "none",
              color: "var(--global-text-color)",
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: 800,
              letterSpacing: 1,
            }}
          />
          {form.touched.username && form.errors.username && (
            <small
              style={{
                display: 'block',
                marginTop: '4px',
                color: "crimson",
                fontSize: 12,
              }}
            >
              {form.errors.username}
            </small>
          )}
        </div>

        {/* PASSWORD INPUT WRAPPER */}
        <div>
          <input
            type="password"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="password"
            style={{
              width: '100%',
              height: 63.37,
              outline: "4px var(--global-accent-color-secondary) solid",
              outlineOffset: "-2px",
              border: "none",
              background: "transparent",
              textAlign: "center",
              textTransform: "none",
              color: "var(--global-text-color)",
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: 800,
              letterSpacing: 1,
            }}
          />
          {form.touched.password && form.errors.password && (
            <small
              style={{
                display: 'block',
                marginTop: '4px',
                color: "crimson",
                fontSize: 12,
              }}
            >
              {form.errors.password}
            </small>
          )}
        </div>

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          style={{
            width: '100%',
            height: 63.37,
            marginTop: '1rem', // Add some space above the button
            background: "var(--global-accent-color-secondary)",
            outline: "4px var(--global-accent-color-secondary) solid",
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
              color: "var(--global-accent-color)",
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



      {/* "Are you a gym admin?" */}
      <div
        style={{
          width: "100%",
          height: "auto",
          padding: '1.5rem 0',
          left: 0,
          bottom: 0,
          position: "absolute",
          background: "#CCCCCC",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div
          style={{
        textAlign: "center",
        color: "var(--global-accent-color)",
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
          background: isAdminMode ? "var(--global-accent-color-secondary)" : "transparent",
          border: "4px solid var(--global-accent-color)",
          cursor: "pointer",
        }}
      />
    </div>
</div>

  );
}

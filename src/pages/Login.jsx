import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const form = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const ok = await login(values);
      if (ok) window.location.href = "/Dashboard";
    },
  });

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
      {/* FORM (username / password / sign in) */}
      <form onSubmit={form.handleSubmit}>
        {/* USERNAME INPUT */}
        <input
          name="username"
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          placeholder="USERNAME"
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
            textTransform: "uppercase",
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
          placeholder="PASSWORD"
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
            textTransform: "uppercase",
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
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "#42554F",
          fontSize: 33,
          fontFamily: "Roboto",
          fontWeight: 700,
          lineHeight: "40px",
          letterSpacing: 0.15,
          wordWrap: "break-word",
        }}
      >
        WELCOME
      </div>

      {/* "Don't have an account" + underline */}
      <div
        style={{
          left: 123,
          top: 723,
          position: "absolute",
          justifyContent: "flex-end",
          display: "flex",
          flexDirection: "column",
          color: "#374C17",
          fontSize: 15,
          fontFamily: "Roboto",
          fontWeight: 400,
          wordWrap: "break-word",
        }}
      >
        Don’t have an account?
      </div>
      <div
        style={{
          width: 170,
          height: 0,
          left: 116,
          top: 743,
          position: "absolute",
          outline: "1px #374C17 solid",
          outlineOffset: "-0.5px",
        }}
      />

      {/* Demo note */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 760,
          fontSize: 12,
          color: "#555",
        }}
      >
        Any non-empty credentials work for demo.
      </div>

      {/* Bottom grey admin area */}
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
        data-size="48"
        style={{
          width: 42.83,
          height: 33.5,
          left: 183,
          top: 822.61,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        
      </div>
      <div
  style={{
    width: 264,
    height: 34,
    left: 72,
    top: 777,
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: "#42554F",
    fontSize: 25,
    fontFamily: "Roboto",
    fontWeight: 500,
  }}
>
  Are you a gym admin?
</div>

{/* CLICKABLE SQUARE BOX */}
<button
  onClick={() => (window.location.href = "/AdminHome")}
  style={{
    width: 35,
    height: 35,
    left: 184,
    top: 822,
    position: "absolute",
    background: "transparent",
    border: "4px solid #42554F",
    outlineOffset: "-2px",
    cursor: "pointer",
  }}
>
</button>

      {/* Top hero section */}
      <div
        style={{
          width: 402,
          height: 301.24,
          left: 0,
          top: 0,
          position: "absolute",
          background: "black",
        }}
      />
      <div
        style={{
          width: 450.17,
          height: 346.92,
          left: 0,
          top: -45.68,
          position: "absolute",
          background: "black",
        }}
      />
      <div
        style={{
          width: 450.17,
          height: 346.92,
          left: 0,
          top: -45.68,
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
          wordWrap: "break-word",
        }}
      >
        One App. Every gym
        <br />
        Train anywhere, anytime.
        <br />
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
          letterSpacing: 0.15,
          wordWrap: "break-word",
        }}
      >
        All You Can Gym
      </div>
      <div
        style={{
          width: 619.77,
          height: 523.67,
          left: -68.65,
          top: -123.86,
          position: "absolute",
          background: "rgba(255, 255, 255, 0.05)",
        }}
      />
      <div
        style={{
          width: 96.03,
          height: 91.77,
          left: 299,
          top: 7,
          position: "absolute",
          background: "#42554F",
        }}
      />
      <div
        style={{
          width: 55.14,
          height: 33.95,
          left: 304.66,
          top: 56.55,
          position: "absolute",
          background: "#C1E973",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) inset",
        }}
      />
      <div
        style={{
          width: 43.43,
          height: 31.02,
          left: 341.64,
          top: 30.23,
          position: "absolute",
          background: "#C1E973",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) inset",
        }}
      />
      <div
        style={{
          width: 6.76,
          height: 11.02,
          left: 371.24,
          top: 37.04,
          position: "absolute",
          background: "#C1E973",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) inset",
        }}
      />
    </div>
  );
}

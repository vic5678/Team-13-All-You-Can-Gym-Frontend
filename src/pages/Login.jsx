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
      if (ok) window.location.href = "/packages";
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={form.handleSubmit} className="card" style={{ maxWidth: 420 }}>
        <div>
          <label>Username</label>
          <input className="input" name="username" onChange={form.handleChange} value={form.values.username} />
          {form.touched.username && form.errors.username && <small style={{color: "crimson"}}>{form.errors.username}</small>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" className="input" name="password" onChange={form.handleChange} value={form.values.password} />
          {form.touched.password && form.errors.password && <small style={{color: "crimson"}}>{form.errors.password}</small>}
        </div>
        <button className="btn" type="submit" style={{ marginTop: ".5rem" }}>Sign in</button>
      </form>
      <small className="muted">Any non-empty credentials work for demo.</small>
    </div>
  );
}

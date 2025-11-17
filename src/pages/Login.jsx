import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function Login() {
  const { login } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const form = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const ok = await login({
        username: values.username,
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
        alert("Login failed. Check your username and password.");
      }
    },
  });

  const toggleAdminMode = () => setIsAdminMode((v) => !v);

  return (
    <div>
      <Header
        title="All You Can Gym"
        subtitle={<>One App. Every gym<br />Train anywhere, anytime. <br />Your way.</>}
        userIcon={false}
      />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* White rounded card */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>

            {/* WELCOME / ADMIN TITLE */}
            <div style={{ textAlign: 'center', color: 'var(--global-accent-color)', marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'inherit', textTransform: 'none' }}>
                {isAdminMode ? 'Admin Login' : 'Welcome'}
              </div>
            </div>

            <form onSubmit={form.handleSubmit}>
              {/* Username row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
                <div style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 10,
                  border: '2px solid #B8ED44',
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#FAFAFA',
                  position: 'relative',
                }}>
                  {!form.values.username && !usernameFocused && (
                    <label 
                      onClick={() => {
                        setUsernameFocused(true);
                        usernameInputRef.current?.focus();
                      }}
                      style={{ 
                        fontSize: 14, 
                        color: '#42554F', 
                        fontFamily: 'inherit', 
                        fontWeight: 200, 
                        whiteSpace: 'nowrap',
                        cursor: 'text',
                      }}>
                      Username
                    </label>
                  )}
                  <input
                    ref={usernameInputRef}
                    name="username"
                    value={form.values.username}
                    onChange={form.handleChange}
                    onFocus={() => setUsernameFocused(true)}
                    onBlur={(e) => {
                      form.handleBlur(e);
                      setUsernameFocused(false);
                    }}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      fontSize: 16,
                      fontFamily: 'inherit',
                      outline: 'none',
                      color: '#42554F',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => form.setFieldValue('username', '')}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 18,
                      cursor: 'pointer',
                      color: '#B8ED44',
                      padding: 0,
                      display: form.values.username ? 'block' : 'none',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              {form.touched.username && form.errors.username && (
                <small style={{ display: 'block', marginBottom: 8, color: 'crimson', fontSize: 12 }}>{form.errors.username}</small>
              )}

              {/* Password row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
                <div style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 10,
                  border: '2px solid #B8ED44',
                  padding: '0 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#FAFAFA',
                }}>
                  {!form.values.password && !passwordFocused && (
                    <label 
                      onClick={() => {
                        setPasswordFocused(true);
                        passwordInputRef.current?.focus();
                      }}
                      style={{ 
                        fontSize: 14, 
                        color: '#42554F', 
                        fontFamily: 'inherit', 
                        fontWeight: 200, 
                        whiteSpace: 'nowrap',
                        cursor: 'text',
                      }}>
                      Password
                    </label>
                  )}
                  <input
                    ref={passwordInputRef}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={(e) => {
                      form.handleBlur(e);
                      setPasswordFocused(false);
                    }}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      fontSize: 16,
                      fontFamily: 'inherit',
                      outline: 'none',
                      color: '#42554F',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7V5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5V7M3 7H13C13.5523 7 14 7.44772 14 8V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V8C2 7.44772 2.44772 7 3 7Z" 
                        stroke={showPassword ? '#42554F' : '#B8ED44'} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      {showPassword && (
                        <line x1="4" y1="5" x2="12" y2="5" stroke={showPassword ? '#42554F' : '#B8ED44'} strokeWidth="1.5" strokeLinecap="round" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              {form.touched.password && form.errors.password && (
                <small style={{ display: 'block', marginBottom: 8, color: 'crimson', fontSize: 12 }}>{form.errors.password}</small>
              )}

              {/* Sign in button */}
              <button type="submit" style={{ width: '100%', height: 52, marginTop: 8, background: 'var(--global-accent-color-secondary)', borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--global-accent-color)', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', textTransform: 'capitalize' }}>
                  Sign In
                </span>
              </button>

              {/* Admin checkbox (placed below sign in, aligned with inputs) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 16 }}>
                <label htmlFor="isAdmin" style={{ fontSize: 14, color: '#42554F', fontFamily: 'inherit', flex: 1 }}>Are you a gym admin?</label>
                <input id="isAdmin" type="checkbox" checked={isAdminMode} onChange={toggleAdminMode} style={{ width: 20, height: 20, accentColor: '#B8ED44', cursor: 'pointer' }} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


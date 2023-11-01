import "./global.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./_root/pages";
import SigninForm from "./_auth/forms/SigninForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/pages/RootLayout";
import { SignupForm } from "./_auth/forms/SignupForm";
const App = () => {
  return (
    <main className="flex h-screen">
      {/*  public routes */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/*  private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;

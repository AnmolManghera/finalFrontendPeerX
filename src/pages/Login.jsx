import React, { useState,useContext } from "react";
import ImageUpload from "../components/registration/ImageUpload";
import ChipSelector from "../components/registration/ChipSelect";
import axios from "axios";
import { AuthContext } from "../App";
import { loginAction, logoutAction } from "../authActions";
const url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [field, setField] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [finalEmail, setFinalEmail] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  const setYearAndEmail = (e) => {
    setEmail(e.target.value);
    const finale = e.target.value + "@nitj.ac.in";
    setFinalEmail(finale);
  };
  const fieldTags = [
    "Web Development",
    "App Development",
    "Machine Learning",
    "Cloud & Devops",
  ];
  const techTags = ["ReactJS", "NextJS", "Flutter", "Python", "Rust"];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url}/user/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(function ({ data }) {
        // console.log(response);
        dispatch(loginAction(data.user));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(logoutAction())
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url}/user/register`,
        {
          username,
          name,
          password,
          field,
          technologies,
          year,
          finalEmail,
          imageUrl,
        },
        { withCredentials: true }
      )
      .then(function ({ data }) {
        // console.log(data.user);
        dispatch(loginAction(data.user));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(logoutAction());
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      handleNextStep();
    } else if (step === 2) {
      // Handle form submission for step 2
      handleNextStep();
    } else if (step === 3) {
      // Handle form submission for step 3
      handleNextStep();
    } else if (step === 4) {
      // Handle form submission for step 4
      handleRegister(e);
    }
  };
  
  return isLogin ? (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-8xl font-bold leading-9 tracking-tight text-gray-900">PeerX</h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#0f172a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </form>

        <button onClick={()=>(setIsLogin(false))}>Register</button>
      </div>

    </div>
    
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="mt-10 text-center text-8xl font-bold leading-9 tracking-tight text-gray-900">PeerX</h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {step === 1
            ? "Step 1: Personal Information"
            : step === 2
            ? "Step 2: Additional Information"
            : step === 3
            ? "Step 3: Customization"
            : "Step 4: Upload Photo"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>

                <div className="relative">
                  <input
                    id="email"
                    // type="email"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-16"
                    value={email}
                    onChange={setYearAndEmail}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-200 text-gray-900">
                    @nitj.ac.in
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label
                  htmlFor="field"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Field
                </label>
                <ChipSelector
                  tags={fieldTags}
                  selected={field}
                  setSelected={setField}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label
                  htmlFor="tech"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Field
                </label>
                <ChipSelector
                  tags={techTags}
                  selected={technologies}
                  setSelected={setTechnologies}
                />
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <ImageUpload url={imageUrl} setUrl={setImageUrl} />
            </>
          )}
          <div className="absolute bottom-[20vh]">
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="flex w-1/2 justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700"
                >
                  Previous
                </button>
              )}

              <button
                type="submit"
                className={`flex w-${
                  step === 1 ? "full" : "1/2"
                } justify-center rounded-md bg-[#0f172a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
              >
                {step === 1
                  ? "Next"
                  : step === 2
                  ? "Next"
                  : step === 3
                  ? "Next"
                  : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

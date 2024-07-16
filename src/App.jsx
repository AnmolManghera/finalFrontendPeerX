import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useReducer, createContext } from "react";
import Loader from "./components/Loader.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import axios from "axios";
import { SocketProvider } from "./socket.jsx";
import Navbar from "./components/Navbar.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import MyMeetings from "./components/interview/MyMeetings.jsx";
import UpdateSchedule from "./components/interview/UpdateSchedule.jsx";
import RequestInterview from "./components/interview/RequestInterview.jsx";
import Layout from "./components/interview/Layout.jsx";
import authReducer from "./authReducer";
import { loginAction, logoutAction } from "./authActions";
const Home = lazy(() => import("./pages/Home.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chats = lazy(() => import("./pages/Chats.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const Interviews = lazy(() => import("./pages/Interviews.jsx"));
const url = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Simulate checking if user is already logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginAction(user));
    } 
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(loginAction(data.user)))
      .catch((err) => dispatch(logoutAction()));
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.isAuthenticated, state.user]);


  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <Navbar />
                  <ProtectedRoutes user={state.isAuthenticated} />
                </SocketProvider>
              }
            >
              <Route path="/:query?" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route element={<Layout />}>
                <Route path="/interviews" element={<MyMeetings />} />
                <Route path="/interviews/updateschedule" element={<UpdateSchedule />} />
                <Route path="/interviews/requestinterview" element={<RequestInterview />} />
                <Route path="/interviews/:id" element={<VideoCall />} />
              </Route>
            </Route>

            <Route
              path="/login"
              element={
                <ProtectedRoutes user={!state.isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../redux/authSlice.js";
import { SocketProvider } from "./socket.jsx";
import Navbar from "./components/Navbar.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import Interview, { Sidebar } from "./pages/Interview.jsx";
import MyMeetings from "./components/interview/MyMeetings.jsx";
import UpdateSchedule from "./components/interview/UpdateSchedule.jsx";
import RequestInterview from "./components/interview/RequestInterview.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chats = lazy(() => import("./pages/Chats.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const Interviews = lazy(() => import("./pages/Interviews.jsx"));
const url = import.meta.env.VITE_BACKEND_URL;
function App() {
  const dispatch = useDispatch();

  console.log("hello world" + url);
  useEffect(() => {
    axios
      .get(`${url}/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(setCredentials(data.user)))
      .catch((err) => dispatch(logout()));
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  // const user = true

  return (
    // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <Navbar />
                <ProtectedRoutes user={user} />
              </SocketProvider>
            }
          >
            <Route path="/users/:query?" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/myinterviews" element={<MyMeetings />} />
            <Route path="/updateschedule" element={<UpdateSchedule />} />
            <Route path="/requestinterview" element={<RequestInterview />} />
            <Route path="/interviews/:id" element={<VideoCall />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoutes user={!user} redirect="/login">
                <Login />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
    // </QueryClientProvider>
  );
}

export default App;

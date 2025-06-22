
import { Routes, Route, Navigate} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import NotificationPage from './pages/NotificationPage';
import { toast , Toaster } from 'react-hot-toast';
import useAuthUser from './hooks/useAuthUser.js';
import PageLoader from './components/PageLoader.jsx';
import OnBoardingPage from './pages/OnBoardingPage.jsx';

const App = () => {

  const {isLoading, authUser} = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnBoarded;

  if(isLoading){
    return <PageLoader/>
  }

  return (
    <div className="text-2xl h-screen " data-theme="light">
      <Routes>
        <Route path="/" element={ 
        isAuthenticated && isOnboarded ? (<HomePage/>) : 
        (<Navigate to={!isAuthenticated ? "/login" : "/onboarding" }/>) }></Route>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to={"/"}/>}></Route>
        <Route path="/signup" element={!isAuthenticated ?<SignUp/>: <Navigate to={"/onboarding"}/>}></Route>
        <Route path="/chat" element={isAuthenticated ? <ChatPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/call" element={isAuthenticated ? <CallPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/notification" element={isAuthenticated ? <NotificationPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/onboarding" element={isAuthenticated ? (
          isOnboarded ? (<Navigate to={"/"}/>) : (<OnBoardingPage />)
        ): <Navigate to={"/login"}/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;

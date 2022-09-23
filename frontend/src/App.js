import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import LoginForm from "./components/LoginFormModal/LoginForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { GroupList } from "./components/GroupList";
import { EventList } from "./components/EventList";
import MainPageNav from "./components/MainPageNav";
import { GroupDetails } from "./components/GroupDetails";
import EventDetails from "./components/EventDetails";
import SignupForm from "./components/SignupForm/SignupForm";
import CreateGroupForm from "./components/CreateGroupForm/CreateGroupForm";
import SplashPage from "./components/SplashPage/SplashPage";
import LoginFormModal from "./components/LoginFormModal";
import EditGroupForm from "./components/EditGroupForm/EditGroupForm";
import CreateEventForm from "./components/CreateEvent/CreateEvent";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />

            {isLoaded && (
                <Switch>
                    <Route path="/" exact>
                        <SplashPage />
                    </Route>
                    <Route path="/signup">
                        <SignupForm />
                    </Route>
                    <Route path="/login">
                        <LoginFormModal />
                    </Route>
                    <Route path="/groups" exact>
                        <MainPageNav />
                        <GroupList />
                    </Route>
                    <Route path="/groups/edit/:groupId" exact>
                        <MainPageNav />
                        <EditGroupForm />
                    </Route>
                    <Route path="/events" exact>
                        <MainPageNav />
                        <EventList />
                    </Route>
                    <Route path="/groups/:groupId/event" exact>
                        <MainPageNav />
                        <CreateEventForm />
                    </Route>
                    <Route path="/groups/:groupId">
                    <MainPageNav />
                        <GroupDetails />
                    </Route>
                    <Route path="/events/:eventId">
                        <EventDetails />
                    </Route>
                    <Route path="/group/create">
                        <CreateGroupForm />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;

import "./splashpage.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";

const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [user, setUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    if (sessionUser && Object.keys(sessionUser).length !== 0) {
        setUser(true);
    }
    return (
        <>
            <div className="master-wrapper">
                <div className="banner-wrapper">
                    <div className="banner-text-div">
                        <h1 className="header">
                            Celebrating 20 years of real connections on Meetup
                        </h1>
                        <p>
                            Whatever you’re looking to do this year, Meetup can
                            help. For 20 years, people have turned to Meetup to
                            meet people, make friends, find support, grow a
                            business, and explore their interests. Thousands of
                            events are happening every day—join the fun.
                        </p>
                    </div>
                    <div className="banner-img-div"></div>
                </div>
                <div className="outer-action-wrapper">
                    <div className="image-wrapper">
                        <div className="splash-img-div group"></div>
                        <div className="splash-img-div event"></div>
                        <div className="splash-img-div start-group"></div>
                    </div>
                    <div className="action-wrapper">
                        <div className="action-text">
                            {user && (
                                <NavLink to="/groups">Join a Group</NavLink>
                            )}
                            {!user && (
                                <div onClick={() => setShowModal(true)}>
                                    Join a Group
                                </div>
                            )}
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <LoginForm setShowModal={setShowModal} />
                                </Modal>
                            )}
                        </div>
                        <div className="action-text">
                            {user && <NavLink to="/events">Find an Event</NavLink>}
                            {!user && (
                                <div onClick={() => setShowModal(true)}>
                                    Find an Event
                                </div>
                            )}
                        </div>
                        <div className="action-text">
                            {user && <NavLink to="/group/create">Start a Group</NavLink>}
                            {!user && (<div onClick={() => setShowModal(true)}>
                                    Start a Group
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SplashPage;

{
    /* <img src="https://i.ibb.co/7ydCdbx/meetup-splash-logo.png" alt="meetup-splash-logo" border="0" /></a> */
}

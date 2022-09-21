import "./splashpage.css";
import { NavLink } from "react-router-dom";

const SplashPage = () => {
    return (
        <>
            <div className="banner-wrapper">
                <div className="banner-text-div">
                    <h1 className="header">
                        Celebrating 20 years of real connections on Meetup
                    </h1>
                    <p>
                        Whatever you’re looking to do this year, Meetup can
                        help. For 20 years, people have turned to Meetup to meet
                        people, make friends, find support, grow a business, and
                        explore their interests. Thousands of events are
                        happening every day—join the fun.
                    </p>
                </div>
                <div className="banner-img-div">banner img</div>
            </div>
            <div className="image-wrapper">
                <div className="splash-img-div group"></div>
                <div className="splash-img-div event"></div>
                <div className="splash-img-div start-group"></div>
                <div className="action-text"><NavLink>Join a Group</NavLink>
                <div className="action-text"><NavLink>Find an Event</NavLink>
                <div className="action-text"><NavLink>Start a Group</NavLink>
            </div>
        </>
    );
};

export default SplashPage;

<img
    src="https://i.ibb.co/KhLHVf6/splash-peeps.png"
    alt="splash-peeps"
    border="0"
/>;

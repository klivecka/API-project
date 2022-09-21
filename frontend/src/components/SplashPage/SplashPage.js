import "./splashpage.css";

const SplashPage = () => {
    return (
        <>
            <div className="banner-wrapper">
                <div className="banner-text-div">
                    <h1 className="header">Celebrating 20 years of real connections on Meetup</h1>
                    <p>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</p>
                </div>
                <div className="banner-img-div">banner img</div>
            </div>
            <div className="image-wrapper">
                <div className="splash-img-div"><img src="https://i.ibb.co/fG1JW9s/spalsh-highfive.png" alt="spalsh-highfive" border="0" /></div>
                <div className="splash-img-div">image</div>
                <div className="splash-img-div">image</div>
            </div>
        </>
    );
};

export default SplashPage;

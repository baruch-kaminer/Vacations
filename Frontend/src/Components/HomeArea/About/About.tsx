import "./About.css";


function About(): JSX.Element {

    return (
        <div className="About">
            <h1>My Vacations</h1>
            <h3>An app to track your favorite vacations</h3>
            <div className="space"></div>
            <div className="connect">
                <p>Hello, my name is Baruch Kaminer and I am an experienced Fullstack developer.</p>
                <p>I created this app using react js and node js.</p>
                <p>I invite you to see more of my works on my github page <a href="https://github.com/baruch-kaminer" target="blank">here</a>.</p>
                <p>You can contact me by email: <a href="mailto:baruchkaminer@gmail.com">baruchkaminer@gmail.com</a></p>
            </div>
        </div>
    );
}

export default About;

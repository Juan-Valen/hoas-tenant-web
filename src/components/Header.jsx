import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function Header() {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    return (
        <header className="header">
            <Link to="/">
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.23 119.65">
                    <defs>
                        <style
                            dangerouslySetInnerHTML={{
                                __html: ".cls-1{fill-rule:evenodd;}"
                            }}
                        />
                    </defs>
                    <g data-name="Layer 2">
                        <g data-name="Layer 1">
                            <path
                                className="cls-1"
                                d="M151.56,71.79h15.95l3,8h9l-15-39.89h-10l-15,39.89h9Zm8-20.94,5,13h-10Z"
                            />
                            <path
                                className="cls-1"
                                d="M111.54,81.6c11.48,0,21.26-8.18,21.26-20.81s-9.75-20.86-21.24-20.86S90.27,48.11,90.27,60.79,100,81.6,111.54,81.6Zm0-32.74c6.1,0,12.13,4,12.13,11.87s-6.08,11.94-12.13,11.94-12.18-4-12.18-11.94S105.46,48.86,111.56,48.86Z"
                            />
                            <polygon
                                className="cls-1"
                                points="51.68 64.73 69.91 64.73 69.91 80.6 79.02 80.6 79.02 40.92 69.91 40.92 69.91 55.8 51.68 55.8 51.68 40.92 42.57 40.92 42.57 80.6 51.68 80.6 51.68 64.73"
                            />
                            <path
                                className="cls-1"
                                d="M204.09,73.66c-7.13,0-9.16-3-10.17-6.94l-9.12,2c1,6,6.08,12.9,19.25,12.9,11.14,0,17.21-5.35,17.21-11.91,0-6-4.06-10.89-14.18-12.89l-5.06-1c-4.05-1-5.07-2-5.06-4s2-4,6.07-4c5.66,0,6.92,2.58,7.89,4.53l.21.43,9.12-2c-1-6.94-8.1-10.91-17.22-10.91s-16.2,5-16.2,12.9c0,4,2,9.92,14.18,11.9l5.06,1c4.05,1,5.06,2,5.06,4C211.14,72.67,208.18,73.66,204.09,73.66Z"
                            />
                            <path
                                className="cls-1"
                                d="M0,0V119.65H264.23V0ZM252.66,108.07H11.57V11.58H252.66Z"
                            />
                        </g>
                    </g>
                </svg>
            </Link>

            <nav>
                <Link to='/announcements'>Announcements</Link>
                <Link to='/messages'>Messages</Link>
                <Link to='/forms'>Forms</Link>
                <Link to='/booking'>Booking</Link>

                {isAuthenticated && (
                    <button onClick={() => {
                        localStorage.removeItem("user");
                        setIsAuthenticated(false);
                    }}>Logout</button>
                )}
            </nav>
        </header>
    );
}

export default Header;

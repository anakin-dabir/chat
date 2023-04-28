

const NavBar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [top, setTop] = useState(true);
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos === 0) {
            setTop(true);
        }
        else {
            setTop(false);
        }
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className={`fixed w-full z-50 ${top ? 'bg-base-300' : 'backdrop-blur-md bg-base-300 bg-opacity-10 transition duration-300 ease-in-out'}  shadow-md   ${visible ? "top-0" : "-top-full"}`}>
            <div className="navbar px-3 container mx-auto lg:max-w-screen-xl">
                <div className="navbar-start">

                </div>



                <div className="navbar-end">
                    <ul className="menu menu-horizontal gap-1 rounded-box">
                        <li className='hover-bordered'><NavLink to='/' activeclassname='active'>Home</NavLink></li>
                        <li className='hover-bordered'><NavLink to='/products' activeclassname='active'>Products</NavLink></li>
                        <li className='hover-bordered'><NavLink to='/about' activeclassname='active'>About</NavLink></li>

                        {/* <div className="dropdown ml-3">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar avatar-online">
                <div className="w-12 bg-primary rounded-full avatar-online">
                </div>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow-lg bg-primary-content text-base-content rounded-box w-52">
                <li>
                  <a >
                    Profile
                  </a>
                </li>
                <li><a>Logout</a></li>
              </ul>
            </div> */}


                    </ul>
                </div>
            </div>
        </div>
    )



}
import "./navbar.css";

const Navbar = ({id}) => {

  return (
    <nav className="navbar" id={id}>
      <div className="navbar-right">
        <a href="https://drive.google.com/drive/u/0/folders/1rgLQWcYpr2sDJSlRT-3fKMaFb_xABLtu/view?usp=sharing" className="navbar-connect" target="blank_">
          <span className="connect-border">Resume</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

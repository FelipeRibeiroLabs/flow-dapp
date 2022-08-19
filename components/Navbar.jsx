import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logIn, logOut, user, flow } = useAuth();

  return (
    <nav>
      <div className="logo">
        <img src="https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/logo.png" alt="orbiesLogo" />
        <h2>ORBIES</h2>
      </div>
      {user.addr ? (
        <div className="logged">
          <span>{flow && flow.slice(0,6)} FLOW | {`0x...${user.addr.slice(14)}`}</span>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <div className="notLogged">
          <button onClick={logIn}>LOG IN / SIGN UP</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3-23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setmatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, matchPwd, pwd]);

  return (
    <>
      <Header />
      <div className="container main">
        <div className="row" style={{ backgroundColor: "#ffffff66" }}>
          <div className="col-lg-12">
            <h3 className="text-center">Regisztráció</h3>
            <form>
              <div
                className="alert alert-warning"
                role="alert"
                ref={errRef}
                aria-live="assertive"
                style={{ visibility: errMsg ? "hidden" : "visible" }}
              >
                {errMsg}
              </div>
              <label htmlFor="username" className="form-label">Felhasználónév:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnode"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <div id="uidnode" className="invalid-feedback">
                    4-24 karakter lehet.<br />
                    Kell lennie nagybetünek<br />
                    Betük, számok, aláhuzás, kötőjelek tartalamahat.
                </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login(props) {
  const [username, setUserName] = useState('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
      props.history.push({
          pathname: '/home',
      state: { username: username }
      });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" autoComplete="new-password" onChange={(e) => {
                    setUserName(e.target.value)
                } }/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;

import React, { useState } from "react";
import firebase from "../../firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isloading, setLoading] = useState(false);

  //! function to handle form submit
  const handleSbmit = e => {
    e.preventDefault();
    // ! check if user is having login email in database
    setErrors("");
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(signedUser => {
        console.log(signedUser);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setErrors(err.message);
        setLoading(false);
      });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" /> Login to DevChat
        </Header>
        <Form size="large" onSubmit={handleSbmit}>
          <Segment stacked>
            <Form.Input
              value={email}
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
            <Form.Input
              value={password}
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
            />

            {/* loading */}
            <Button
              disabled={isloading}
              className={`${isloading && "loading"}`}
              color="violet"
              fluid
              size="large"
            >
              submit
            </Button>
          </Segment>
        </Form>

        {/* !  masseges to dissplay is there is */}
        {errors && (
          <Message error>
            <h3>Error</h3>
            <p>{errors}</p>
          </Message>
        )}
        <Message>
          Don't have an account?<Link to="/register"> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Login;

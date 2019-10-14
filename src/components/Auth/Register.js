import React, { useState } from "react";
// import the firebase to add the new user
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
// md5 used to hash masseges
import md5 from "md5";

function Register() {
  // state for the input form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");
  const [isloading, setLoading] = useState(false);

  // ! this state is to hold user in database
  const userRef = firebase.database().ref("users");
  // save new user in database function after create database in fierbase
  // here we only need to save user id, name, image
  const saveUser = createdUser => {
    return userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };
  //! function to handle form submit
  const handleSbmit = e => {
    e.preventDefault();
    // check the password if they match
    if (password !== PasswordConfirmation) {
      setErrors("password are not the same try again");
      return;
    }
    //! add the user to firebase data
    setLoading(true);
    setErrors("");
    firebase
      .auth() // call auth to use its tools
      .createUserWithEmailAndPassword(email, password) // here add user email and password
      .then(createdUser => {
        // here the user is created
        console.log(createdUser);
        // update the profile of    user and and random image
        // displayName is come from state
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            // add created user in database by calling saveUser function
            saveUser(createdUser).then(() => {
              console.log("user saved");
              setLoading(false);
              setUsername("");
              setEmail("");
              setPassword("");
              setPasswordConfirmation("");
            });
          })
          .catch(err => {
            setErrors(err.message);
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        setErrors(err.message);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" /> Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSbmit}>
          <Segment stacked>
            <Form.Input
              value={username}
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
              type="text"
              required
            />
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
            <Form.Input
              value={PasswordConfirmation}
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={e => setPasswordConfirmation(e.target.value)}
              type="password"
              required
            />
            {/* loading */}
            <Button
              disabled={isloading}
              className={`${isloading && "loading"}`}
              color="orange"
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
          Already a user?<Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
export default Register;

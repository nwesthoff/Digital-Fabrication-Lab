import * as React from "react";
import {
  Card,
  Input,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  CardHeader
} from "@material-ui/core";
import userSessionStore from "stores/userSessionStore";
import { observer } from "mobx-react";

interface Props {
  path?: String;
  default?: Boolean;
}

@observer
export default class Auth extends React.Component<Props> {
  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      userSessionStore.isLoggedIn = true;
    }
  }

  handleLoginClick = () => {
    userSessionStore.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
  };

  render() {
    return (
      <Grid container justify="center" alignContent="center" spacing={16}>
        <Grid item>
          <Card>
            <CardHeader title="Sign In" />

            <form>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleLoginClick}
              >
                Sign in
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

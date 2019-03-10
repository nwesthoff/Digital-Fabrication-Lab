import * as React from "react";
import {
  Typography,
  Card,
  Input,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from "@material-ui/core";

export default class Auth extends React.Component {
  render() {
    return (
      <Grid container justify="center" alignContent="center" spacing={16}>
        <Grid item>
          <Card>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
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

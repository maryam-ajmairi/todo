import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import './config/config';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class App extends Component {

    constructor() {
        super();
        this.state = {
            Task: []
        };
        this.ref = firebase.database().ref();
    }

        handleChange = event => {
            this.setState({ [event.target.id]: event.target.value });
        };

        saveData = () => {
             this.ref.child('tasks').push(this.state)
        };


            getData = () => {
                this.ref.child('tasks').on('value', snapshot => {
                    const obj = snapshot.val();
                    const data = [];
                    for (let key in obj) {
                        data.push(obj[key]);
                    }
                    this.setState({ Task : data });
                });
            };


    render() {
        const { classes } = this.props;
        return (
          <div>
          <Card className={classes.card}>
          <CardContent>
            <TextField
              id="Tasks"
              label="Task"
              fullWidth
              onChange={this.handleChange}
            />
            <br />         
          </CardContent>
          <CardActions>
            <Button
              variant="extendedFab"
              fullWidth
              color="primary"
              onClick={this.saveData}
            >
              Add Task
            </Button>
          </CardActions>
        </Card>
        <ul>
          {this.state.Task.map((value, index) => {
              return (
                <li key={index}>
                {value.Task}
              </li>
            );
        })}
        </ul>
      </div>

     
    );
  }
}
App.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = {
    card: {
        minWidth: 300,
        maxWidth: 500
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
};
export default withStyles(styles)(App);
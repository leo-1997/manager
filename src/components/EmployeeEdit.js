import React, {Component} from 'react';
import {connect} from 'react-redux';
import {employeeUpdate, employeeSave, employeeDelete} from '../actions';
import EmployeeForm from './EmployeeForm';
import {Button, Card, CardSection, Confirm} from './common';
import _ from 'lodash';
import Communications from 'react-native-communications';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({prop, value});
    });
  }

  onButtonPress() {
    const {name, phone, shift} = this.props;
    this.props.employeeSave({name, phone, shift, uid: this.props.employee.uid});
  }

  onTextPress() {
    const {phone, shift} = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    console.log(this.props.employee.uid);
    const {uid} = this.props.employee.uid;
    console.log('uid is ', uid);
    this.props.employeeDelete({uid: this.props.employee.uid});
  }

  onDecline() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>
        <CardSection>
          <Button
            onPress={() => this.setState({showModal: !this.state.showModal})}>
            Fire Employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}>
          Are you sure you wan to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.employeeForm.name,
    phone: state.employeeForm.phone,
    shift: state.employeeForm.shift,
  };
};

export default connect(
  mapStateToProps,
  {employeeUpdate, employeeSave, employeeDelete},
)(EmployeeEdit);

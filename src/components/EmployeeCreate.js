import React, {Component} from 'react';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate, initialiseCreate} from '../actions';
import EmployeeForm from './EmployeeForm';
import {Button, Card, CardSection} from './common';

class EmployeeCreate extends Component {
  componentDidMount() {
    this.props.initialiseCreate();
  }
  onButtonPress() {
    const {name, phone, shift} = this.props;
    this.props.employeeCreate({name, phone, shift: shift || 'Monday'});
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
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
  {employeeUpdate, employeeCreate, initialiseCreate},
)(EmployeeCreate);

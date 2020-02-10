import React, {Component} from 'react';
import {CardSection, Input} from './common';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions';
import {Text, Picker, View} from 'react-native';

class EmployeeForm extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={text =>
              this.props.employeeUpdate({prop: 'name', value: text})
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-555-555"
            value={this.props.phone}
            onChangeText={text =>
              this.props.employeeUpdate({prop: 'phone', value: text})
            }
          />
        </CardSection>

        <CardSection>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={day =>
              this.props.employeeUpdate({prop: 'shift', value: day})
            }
            style={{flex: 1}}>
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Satur day" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
};

const mapStateToProps = state => {
  return {
    name: state.employeeForm.name,
    phone: state.employeeForm.phone,
    shift: state.employeeForm.shift,
  };
};

export default connect(
  mapStateToProps,
  {employeeUpdate, employeeCreate},
)(EmployeeForm);

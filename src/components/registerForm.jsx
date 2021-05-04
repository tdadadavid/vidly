import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import * as userServices from '../services/userServices'

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  }

  doSubmit = async () => {
    try {
      const response = await userServices.register(this.state.data)
      localStorage.setItem('token', response.headers['x-auth-token'])
      window.location = '/'
    } catch (erorr) {
      if (erorr.response && erorr.response.status === 400) {
        const newErrorArray = { ...this.state.errors }
        newErrorArray.username = erorr.response.data
        this.setState({ errors: newErrorArray })
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default RegisterForm

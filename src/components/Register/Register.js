import React, { useState } from 'react';
import './Register.css';

const Register = ({ loadUser, onRouteChange }) => {
  const [state, setState] = useState({});
  const onEmailChange = (event) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, registerEmail: value }));
  };
  const onPasswordChange = (event) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, registerPassword: value }));
  };

  const onNameChange = (event) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, registerName: value }));
  };

  const onSubmitSignin = () => {
    fetch('http://localhost:4000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.registerEmail,
        name: state.registerName,
        password: state.registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          sessionStorage.setItem('id', JSON.stringify(user.id));
          loadUser(user);
          onRouteChange('home');
        }
      });
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0 center ttu tracked'>
              Register
            </legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f5 pb2' htmlFor='name'>
                Name
              </label>
              <input
                className='pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='text'
                name='name'
                id='name'
                onChange={onNameChange}
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f5 pb2' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email-address'
                id='email-address'
                onChange={onEmailChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f5 pb2' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                id='password'
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={onSubmitSignin}
              className='b ph3 br2 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
              type='submit'
              value='Register'
            />
          </div>
          <div className='lh-copy mt3'>
            <p
              onClick={() => onRouteChange('signin')}
              className='f4 link dim black db pointer'
            >
              Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;

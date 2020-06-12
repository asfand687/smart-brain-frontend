import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ loadUser, onRouteChange }) => {
  const [state, setState] = useState({
    signInEmail: '',
    signInPassword: '',
  });
  const onEmailChange = (event) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, signInEmail: value }));
  };
  const onPasswordChange = (event) => {
    const { value } = event.target;
    setState((prev) => ({ ...prev, signInPassword: value }));
  };

  const onSubmitSignin = () => {
    fetch('http://localhost:4000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.signInEmail,
        password: state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
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
              Sign In
            </legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f5 pb2' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email-address'
                id='email-address'
                onChange={(e) => onEmailChange(e)}
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
                onChange={(e) => onPasswordChange(e)}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={onSubmitSignin}
              className='b ph3 br2 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
              type='submit'
              value='Sign in'
            />
          </div>
          <div className='lh-copy mt3'>
            <p
              onClick={() => onRouteChange('register')}
              className='f4 link dim black db pointer'
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;

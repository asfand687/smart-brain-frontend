import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

const app = new Clarifai.App({
  apiKey: '156d221cb5bd4c2b89e7ba592cd1225f',
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};
const App = () => {
  const [state, setState] = useState({
    input: '',
    imageUrl: '',
    box: [],
    route: sessionStorage.id ? 'home' : 'signin',
    isSignedIn: sessionStorage.id ? true : false,
    hasError: false,
  });

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (value) => {
    setState((prev) => ({
      ...prev,
      input: value,
    }));
  };

  const onButtonSubmit = async () => {
    setState((prev) => ({ ...prev, imageUrl: state.input }));
    try {
      /* const response = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        state.input
      ); */

      const response = await fetch('http://localhost:4000/imageUrl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: state.input,
        }),
      });
      if (response.status !== 400) {
        const backendCall = await fetch('http://localhost:4000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        const count = await backendCall.json();
        setUser((prev) => ({
          ...prev,
          entries: count,
        }));
        setState((prev) => ({
          ...prev,
          hasError: false,
        }));
      }
      const parsedRes = await response.json();
      // console.log(parsedRes);

      displayFaceBox(calculateFaceLocation(parsedRes));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        hasError: true,
      }));
      err ? console.log(err) : console.log('kewl');
    }
  };

  /*onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch('http://localhost:4000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log("Malformed Request"));
  };*/

  const calculateFaceLocation = (data) => {
    // const clarifaiFace =
    //   data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log();
    const image = document.querySelector('#inputimage');
    // const regions = data.outputs[0].data.regions;
    let result = [];
    if (Array.isArray(data)) {
      data.forEach((item) => {
        result.push(item.region_info.bounding_box);
      });
    } else {
      setState((prev) => ({
        ...prev,
        hasError: true,
      }));
    }
    let box = [];
    const width = Number(image.width);
    const height = Number(image.height);
    result.forEach((item) => {
      box.push({
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - item.right_col * width,
        bottomRow: height - item.bottom_row * height,
      });
    });
    console.log(width, height);
    return box;
  };

  const displayFaceBox = (box) => {
    setState((prev) => ({ ...prev, box: box }));
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setState((prev) => ({ ...prev, isSignedIn: false }));
      sessionStorage.clear();
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      });
      setState({
        input: '',
        imageUrl: '',
        box: [],
        route: 'signin',
        isSignedIn: false,
      });
    } else if (route === 'home') {
      setState((prev) => ({ ...prev, isSignedIn: true }));
    }
    setState((prev) => ({ ...prev, route: route }));
  };

  const checkAuth = () => {
    if (sessionStorage.id) {
      const id = JSON.parse(sessionStorage.id);
      fetch(`http://localhost:4000/profile/${id}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((user) => {
          loadUser(user);
        });
    } else {
      console.log('no');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const { isSignedIn, imageUrl, route, box } = state;
  return (
    <div className='App'>
      <Particles className='particle' params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <Fragment>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            box={box}
            imageUrl={imageUrl}
            error={state.hasError}
          />
        </Fragment>
      ) : route === 'signin' ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;

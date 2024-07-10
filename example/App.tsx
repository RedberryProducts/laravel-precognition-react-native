import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SomeForm from './src/components/SomeForm';
import Reactotron from 'reactotron-react-native';
import PrecognitionWrapper, {Precognition} from './src/PrecognitionContext';

Precognition.init({
  url: '',
  headers: {
    'app-locale': 'en',
  },
});

Reactotron.configure({
  name: 'laravel precognition RN',
})
  .useReactNative({
    networking: {
      ignoreContentTypes: /^(image)\/.*$/i,
      ignoreUrls: /\/(logs|symbolicate|clients3.google.com)$/,
    },
    editor: false,
    errors: {veto: () => false},
    overlay: false,
  })
  .connect();

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <PrecognitionWrapper>
        <SomeForm />
      </PrecognitionWrapper>
    </SafeAreaView>
  );
}

export default App;

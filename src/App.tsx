import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Navigation} from './layouts';
import {theme} from './lib/theme';
import {CurrentUserProvider} from './providers';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <Navigation />
        </CurrentUserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

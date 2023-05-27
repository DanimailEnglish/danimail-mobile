import "react-native-get-random-values";

import { ThemeProvider } from "@rneui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Navigation } from "./src/layouts";
import { theme } from "./src/lib/theme";
import { CurrentUserProvider, UploadsProvider } from "./src/providers";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <UploadsProvider>
          <CurrentUserProvider>
            <Navigation />
          </CurrentUserProvider>
        </UploadsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

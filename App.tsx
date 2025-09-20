import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNav } from './src/navigation/MainNav';
import { theme } from './src/utils/helper';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          animated
          barStyle={'light-content'}
          backgroundColor={theme.color.background}
        />
        <MainNav />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { NavigationInterpolator } from '@lib/navigation';

import { Splash, SignUp, Login, Welcom, Interests, Main, DealsDetail,
    ChangeAccountInfo, ChangePassword, MemberShip, MyReword, Settings,
    QRCodeCameraScanner, BookMarks, History
} from '../scenes';

import { routeConfigs, routeNames, routeKeys } from './routes';
import { Navigators } from './navigators';

function createRoute(Scene, path, options) {
  return {
    screen: Scene,
    path,
    navigationOptions: options,
  }
}

function mapRouteNames(config: Object, prefix: String = '') {
  const names = {};
  Object.keys(config).forEach((key) => {
    names[key] = `${prefix}${key}`;
  });
  return names;
}

const app = {
  splash: createRoute(Splash),
  signup: createRoute(SignUp),
  login: createRoute(Login),
  welcome: createRoute(Welcom),
  interests: createRoute(Interests),
  main: createRoute(Main),
  dealsdetail: createRoute(DealsDetail),
  changeaccount: createRoute(ChangeAccountInfo),
  changepassword: createRoute(ChangePassword),
  membership: createRoute(MemberShip),
  settings: createRoute(Settings),
  myreword: createRoute(MyReword),
  qrcodescanner: createRoute(QRCodeCameraScanner),
  bookmarks: createRoute(BookMarks),
  history: createRoute(History)
};

const appTransition = () => ({
  screenInterpolator: (screenProps) => {
    return CardStackStyleInterpolator.forHorizontal(screenProps);
  },
});

Navigators.App = StackNavigator(app, {
  headerMode: 'none',
  transitionConfig: appTransition,
});

routeConfigs.app = app;
routeNames.app = mapRouteNames(app);
routeKeys.app = mapRouteNames(app, 'app.');

export default {
  app,
};

# Expo Features

## Minor expo features

# Apploading

`<AppLoading />` is loading screen what user can make

```js
import { AppLoading } from "expo";
return <AppLoading />;
```

## Preloading

you must preload Font or ApolloClient or the files what is from Api (logo, images, etc..)

```js
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

const [loaded, setLoaded] = useState(false);
const preLoad = async () => {
  ttry {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync([require("./assets/logo.jpg")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      setClient(client);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
};
useEffect(() => {
  preLoad();
}, []);
```

# Apollo

## Setup

To use apollo, We must wrap App with `<ApolloProvicer client={client}></ApolloProvicer>`

`apollo.js`

```js
const options = {
  uri: "http://localhost:4000/graphql",
};

export default options;
```

`App.js`

```js
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import { ApolloProvider } from "react-apollo-hooks";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
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
  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Start !</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
```


## Send request with authorization

### Using header function

header function is execute only when the app is mount

```js
  // ~~ 
  // Same code with setup code

  const token = await AsyncStorage.getItem("jwt");
  const client = new ApolloClient({
          cache,
          header: { Authorization: `Bearer ${token}` },
          ...apolloClientOptions,
        });

  // ~~
```

### Using request function

request is execute whenever the app send query.

By setting context of operation, header function with authorization is added to every query. (`operation.setContext({})`)

```js
  // ~~ 
  // Same code with setup code

  const client = new ApolloClient({
          cache,
          request: async (operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            header: { Authorization: `Bearer ${token}` },
            });
          },
          ...apolloClientOptions,
        });

  // ~~
```
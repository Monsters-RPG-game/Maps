# Tests - Test mode docs

> [!TIP]
> This mode might be incorrect or not represent proper responses. This is intended to use only in tests. In addition to that, not all possible responses included.

> [!TIP]
> This mode is still in early WIP in this application. Its only job is to fake database collections. 

This application includes test mode. This mode is used to control returned values from external modules / services, allowing developers to manipulate responses. This is intended to be used while testing.

You can write responses that you want your application to return in `/__tests__/utils/fakeData/`. These files already include pre-generated responses used in tests. Make sure to NOT commit changes in this file with real data, unless its for writing tests or data is not critical ( real keys, passwords etc ). In addition to that, make sure to rerun tests, after making changes to double check, that you did not break anything.

Application will start the same was as by default, but instead of connecting to real mongoDB, it will create fake one. RabbitMQ connections will still work. 

## Getting Started

1. `npm i`
2. `npm run build && npm start`
3. [http://localhost:3000/cars](http://localhost:3000/cars)

# Overivew

Hi guys! Here is a coding challenge.

I'm using a Next.js of version 12, with /pages directory (tried the new Next.js 13 first, and it seems like it's not ready to serve production purposes yet; however, the stable build might have made my life easier...).

So the idea is we have a Car Rental service. The main page is /cars, which is basically a list of available vehicles, supporting pagination, search, and 3 filters. /cars is made as an SSR page, so every state of it should be accessible via the direct link (e.g http://localhost:3000/cars?search=&priceRange=200%2C550&brand=Tesla%2CKia%2CToyota%2CRange+Rover&bodyType=Sedan%2CSUV). The same goes to simple GET /cars/:id which just displays the car, also SSR. From the /cars you may also create a new car.

One more thing: I like cars, but the info that's in the DB now might be imprecise or confusing to someone who's into cars - remember it's just test data. I love your car, just in case :)

# UI Lib

Since I didn't have much time for component routine, I chose Material UI as a UI lib. Pretty simple to use.

# State Management

No Redux and no Context - just a common React state. I would say the main state management tool here is the query string I've posted as an example above. After every modular state interaction (e.g., the filter is applied), since we want to have SSR and make this state sharable, we would update the URL with the related query param - after all query string becomes a global state. I like Redux, but for real SSR, usually, it's not the best choice IMO.

# Typescript

Yep, I've decided to do the thing using TypeScript - frankly speaking, it has become more like a habit. Sometimes quite a painful one...

# API

I'm a big fan of the Fireship YouTube channel; in one of the recent videos, he recommended trying out a cool DB for the pet projects - Pocketbase (https://pocketbase.io/). This DB combines the power of SQLite with some extra "API" layer to simplify some common things, like file uploads and auth. Also, it has its own Admin Dashboard from the start. It's not supporting any data import/export (at least officially), so I've just deployed it using their "hosting" to save you time. It uses shared storage, so I would ask you to test the app with the open Network tab - 521 may occur, which means the server is done. It lasts no more than 10 sec, just in case. So, I've decided to give it a shot. However, as you may already understand, Pocketbase is still in the deep beta, so a lot of the stuff we have all used to is not in place. Anyway, this app's API is powered by Next.js Api Routes and Pocketbase DB. Here is the Pocketbase dashboard in case you are interested https://breezy-manchester.pockethost.io/_/?#/collections?collectionId=eknhrvvg5fhl2ny&filter=&sort=-created (I don't care about this acc, so just leaving creds here tantsurm@gmail.com:W83BKnCB3Q4Ukpk)

# File Structure

It's pretty simple, I think no further explanation is required here: src/components, src/services, and src/utils are serving for src/pages.

# Form management

I used Formik with Zod validation for the AddCar modal; I just personally like Formik - it seems like the simplest lib to me. However, I didn't use the Field and didn't create an abstraction on top of MaterialUI components - I just passed the right props (recommended way by Formik https://formik.org/docs/examples/with-material-ui; however, I don't like it much and usually prefer abstraction layer). There is no validation for the filters since the form is optional and consists of selects and range input, where the user won't be able to pick something that is not in the list.

# Hooks

There would be only one custom hook `useCarList` - it's used to "eject" the logic from the view so it's more readable. Since I don't use state management library components may quickly become messy, so I just decided to sort this out a bit.

# Some thoughts

It would be great to add some loading state between the SSR page transitions, for example when navigating from the /cars to the specific car /cars/:id and vice versa, I believe this could be done by subscribing to router transitions inside the \_app.tsx - just didn't have time for that. Sorting by price also would be great - again, unfortunately no time left.

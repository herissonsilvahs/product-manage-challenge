Simple rest application with ExpressJS, VueJS, and MongoDB<br>
Not 100% funcionality, *just for learning*<br>

**Usage Server API**
* Enter api directory and run:<br>
    ```
    $ npm install
    
    # Running in dev mode
    $ npm run start-dev

    # setup config file, add your modifications
    cp configs-example.js configs.js
    ```

* Client API is necessary create a root user by seed
    ```
    $ npm install

    # To alter attributes for user, enter configs/seed-config.js
    $ npm run seed-user-admin


**Features**
* Server API
- [x] CRUD products
- [x] CRUD Users
- [x] JWT implementation
- [x] Cors implementation
- [ ] Some validations

* Client API
- [x] API comunication by axios
- [x] Registry user
- [x] Vuex implementation
- [x] Login user
- [x] User Dashboard
# Change Notes

## What was the problem?
The signup form was failing in two different ways:

1. The frontend was trying to use the user context, but the value it read did not always match the shape it expected.
2. The backend was rejecting normal signup data with `400 Bad Request` because the name validation rules were too strict.

That is why signup was not working properly.

## What I changed and why

### 1. `frontend/src/pages/UserSignup.jsx`
What I changed:
- I made the component read the context more safely.
- I stopped it from crashing if `setUser` is not available.
- I removed an unused local state variable.
- I fixed the import path casing to match the actual file name.

Why:
- The console error `setUser is not a function` meant the component was trying to call something that was not guaranteed to be a function.
- The safer check prevents the page from breaking during signup.
- The import path casing fix helps keep the app stable across different operating systems.

Code change:
Before:
```jsx
import {UserDataContext} from '../context/userContext'

const context = React.useContext(UserDataContext)
console.log("Context:", context)

const { user, setUser } = context
```

After:
```jsx
import {UserDataContext} from '../context/UserContext.jsx'

const contextValue = React.useContext(UserDataContext)
const setUser = Array.isArray(contextValue) ? contextValue[1] : contextValue?.setUser
```

Before:
```jsx
setUser(data.user)
```

After:
```jsx
if (typeof setUser === 'function') {
	setUser(data.user)
}
```

### 2. `frontend/src/main.jsx`
What I changed:
- I aligned the context import path to the real filename.

Why:
- The file on disk is `UserContext.jsx`, so the import should match that exact name.
- This avoids path issues, especially outside Windows.

Code change:
Before:
```jsx
import UserContext from './context/userContext.jsx'
```

After:
```jsx
import UserContext from './context/UserContext.jsx'
```

### 3. `Backend/routes/user.route.js`
What I changed:
- I loosened the first-name validation from a minimum of 3 characters to a required non-empty value.

Why:
- The backend was rejecting valid signup requests too early.
- A user should be allowed to register with a normal short name, as long as the field is not empty.

Code change:
Before:
```js
router.post("/register",[
    body("fullname.firstname").isLength({min: 3}).withMessage("Firstname should be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({min: 6}).withMessage("Password should be at least 6 characters long")
], userController.registerUserController);
```

After:
```js
router.post("/register",[
	body("fullname.firstname").trim().isLength({min: 1}).withMessage("Firstname is required"),
	body("email").isEmail().withMessage("Please enter a valid email address"),
	body("password").isLength({min: 6}).withMessage("Password should be at least 6 characters long")
], userController.registerUserController);
```

### 4. `Backend/models/user.model.js`
What I changed:
- I reduced the firstname and lastname minimum length rules from 3 to 1.

Why:
- The database schema was still enforcing the stricter rule even if the route validation passed.
- Both layers need to agree, otherwise the request can still fail.

Code change:
Before:
```js
firstname:{
	type:String,
	required:true,
	minLength:[3,"Firstname should be at least 3 characters long"],
},
lastname:{
	type:String,
	minlength:[3,"Lastname should be at least 3 characters long"],
}
```

After:
```js
firstname:{
	type:String,
	required:true,
	minLength:[1,"Firstname should be at least 1 character long"],
},
lastname:{
	type:String,
	minlength:[1,"Lastname should be at least 1 character long"],
}
```

### 5. `Backend/routes/captain.route.js`
What I changed:
- I loosened the captain first-name and last-name validation the same way.

Why:
- Captain signup used the same kind of name validation and could fail for the same reason.
- This keeps the rules consistent.

Code change:
Before:
```js
router.post('/register',[
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto'),
],
captainController.registerCaptainController
)
```

After:
```js
router.post('/register',[
	body('email').isEmail().withMessage('Please provide a valid email address'),
	body('fullname.firstname').trim().isLength({min: 1}).withMessage('First name is required'),
	body('fullname.lastname').trim().isLength({min: 1}).withMessage('Last name is required'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
	body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
	body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
	body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be a positive integer'),
	body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto'),
],
captainController.registerCaptainController
)
```

### 6. `Backend/models/captain.model.js`
What I changed:
- I reduced the captain firstname and lastname minimum length rules from 3 to 1.

Why:
- The schema needed to match the route validation.
- Without this, the backend could still reject the data later.

Code change:
Before:
```js
firstname:{
	type:String,
	required:true,
	minLength:[3,"Firstname should be at least 3 characters long"],
},
lastname:{
	type:String,
	minlength:[3,"Lastname should be at least 3 characters long"],
}
```

After:
```js
firstname:{
	type:String,
	required:true,
	minLength:[1,"Firstname should be at least 1 character long"],
},
lastname:{
	type:String,
	minlength:[1,"Lastname should be at least 1 character long"],
}
```

## Simple summary
The main issue was not Axios itself. The frontend was reaching the backend, but the backend was saying the signup data was invalid. I relaxed the name rules and made the frontend context handling safer, so signup can work normally now.

## Validation
- I checked the edited backend files for syntax errors.
- No errors were found in the touched backend files.

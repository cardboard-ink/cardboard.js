# cardboard.js
JS/TS Wrapper for the CardBoard API

# Examples
## Initial Setup
```typescript
import {config} from "dotenv"

import { Cardboard } from "cardboard.js"

config()

const clientSecret = process.env.CLIENT_SECRET
const clientId = process.env.CLIENT_ID

if (!clientSecret) {
    throw new Error("Missing client secret")
}

if (!clientId) {
    throw new Error("Missing client id")
}

const cb = new Cardboard(clientId, clientSecret)
```
## Usage
```typescript
import express from "express"

const app = express()

app.use(express.json())

// single user mock db, you would have something way more complicated here for multiple users and your app's own data
let at=""

// route setup in redirect uri on cardboard.ink
app.get("/login", async (req, res) => {
    const code = req.query.code as string

    // initializes long term session on cardboard's end (30 days)
    const loginData = await cb.exchangeInitialToken(code)

    // your logic to set session in your app
    at = loginData.access_token
    res.send(loginData)
    return
})

app.get("/logout", async (req, res) => {

  // remove session on cardboard's end 
  const logout = await cb.revokeToken(at)

  // your logic to remove session in your app 
  at = ""
  res.send(logout)
  return
})

app.get("/user", async (req, res) => {
    if (at === "") {
        res.send(`<h1>Not logged in</h1> <a href='https://cardboard.ink/auth?client_id=${clientId}'>Login</a>`)
        return
    }
    const user = await cb.getUserInfo(at)
    res.json(user)
    return
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```
# Self-Assessment

### Example 1: Improving security

Initially, our user updating endpoint simply compares a plaintext password:  

```javascript
// PUT /users/:userId
if (user.password !== password) {
    return res.status(401).json({ message: "invalid login credentials" })
}

const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.updated_password,
        status: req.body.status,
    },
    { new: true }
);
```
This is a major security flaw.
To address this security flaw, we will implement hashed passwords, salting and the JSON Web Token:  

### Example 2: Connecting schemas

Right now our schema for the market postings stores the posters _ID as a string:  

```javascript
const marketSchema = new Schema(
    {
        owner_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
```
This can be cumbersome for to work with in the front-end

We plan to replace it with 
```javascript
type: mongoose.Schema.Types.ObjectId
```
Instead

**Lessons Learned:**

1. Communication with front-end is important to avoid extra work.

2. API services like the google gemini API can be suprisingly easy to implement

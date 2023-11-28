import * as dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users= await dao.findAllUsers();
    res.json(users)
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
   };
   const findUserByUsername = async (req, res)=> {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user)
   }
   const createUser = async (req,res) => {
    const {username, password, email, role} = req.params;
    const user = await dao.createUser({
        username,
        password,
        email,
        role
    });
    res.json(user);
   }
  const updateUser= async(req,res)=>{
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateUser(id, newUser);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(status);
  }

  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id, {firstName: newFirstName});
    res.json(status);
   };

   const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id)
    res.json(status)
   }

  const signup = async (req, res) => {

  };

  const signin = async (req, res) => {
    const {username, password} = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
        const currentUser = user;
        req.session["currentUser"] = currentUser;
        res.json(user);
    } else {
        res.sendStatus(403);
    }
   };

  const signout = (req, res) => { 
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };

  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(403);
    } else {
        res.json(currentUser);
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findUserByUsername)
  
  app.get("/api/users/:username/:password/:email/:role", createUser);
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
  app.delete("/api/users/:id", deleteUser);
  app.put("/api/users/:id", updateUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;


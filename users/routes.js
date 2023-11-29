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
   const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const updateUser= async(req,res)=>{
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateUser(id, newUser);
    const currentUser = await dao.findUserById(id);
    req.session["currentUser"] = currentUser;
    res.json(status);
  }
  const findUsersByRole = async (req, res) => {
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };
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
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.username) {
        res.status(400).json({ message: "Username already taken" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
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
        const updatedUser = await dao.findUserById(currentUser._id);
        req.session["currentUser"] = updatedUser;
        res.json(updatedUser);
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findUserByUsername)
  app.get("/api/users/role/:role", findUsersByRole);

  app.post("/api/users", createUser); 
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
  app.delete("/api/users/:id", deleteUser);
  app.put("/api/users/:id", updateUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  
}
export default UserRoutes;


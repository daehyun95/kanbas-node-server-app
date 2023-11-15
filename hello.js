function HelloRoutes(app) {
    app.get("/a5/welcome", (req, res)=> {
        res.send("Welcome to Web Dev!");
    });
    app.get("/hello", (req, res)=> {
        res.send("Life is good!");
    });
}
export default HelloRoutes;
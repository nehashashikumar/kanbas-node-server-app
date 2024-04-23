import db from "../Database/index.js";
function AssignmentRoutesApp(app) {
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
          .filter((a) => a.course === cid);
        res.send(assignments);
      });

      app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignments = db.assignments.filter((a) => a._id === aid);
        res.send(assignments);
      });

      app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });

      app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        if (!aid) {
            res.status(404).send("Assignment not found");
            return;
          }
        res.sendStatus(200);
      });

      app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const aIndex = db.assignments.findIndex(
          (a) => a._id === aid);
        db.assignments[aIndex] = {
          ...db.assignments[aIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
}

export default AssignmentRoutesApp;
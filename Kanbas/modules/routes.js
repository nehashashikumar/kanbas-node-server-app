import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    req.body.course = req.params.cid;
    req.body.id = new Date().getTime().toString();
    const module = await dao.createModule(req.body);
    res.json(module);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };
  const updateModule = async (req, res) => {
    const status = await dao.updateModule(req.params.mid, req.body);
    res.json(status);
  };
  const findCourseById = async (req, res) => {
    const { cid } = req.params;
    const module = await dao.findModulesByCourse(cid);
    if (!module) {
      res.status(404).send("Module not found");
      return;
    }
    res.json(module);
  };
  app.put("/api/modules/:mid", updateModule);
  app.post("/api/courses/:cid/modules", createModule);
  app.delete("/api/modules/:mid", deleteModule);
  app.get("/api/courses/:cid/modules", findCourseById);
}
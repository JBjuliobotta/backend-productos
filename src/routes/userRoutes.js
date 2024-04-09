const UserController=require('../controllers/userController');
const Auth=require('../utils/AuthMiddlewares');

const UserRoutes=(base, app)=>{

    const controller=new UserController();
    app.post(`${base}/create-admin`, async(req, res)=>{
        try {
            const {email, password}=req.body;
            await controller.CreateNewAdmin(email, password);
            return res.status(201).json({message: "{éxito al crear el usuario"});
        } catch (error) {
            console.log("error al crear nuevo usuario--", error);
            return res.status(500).json({message: "ocurrió un error al intentar guardar los cambios"});

        }
    })

    app.post(`${base}`,Auth.isAuth, Auth.isAdmin, async(req, res)=>{
        try {
            const {email, password}=req.body;
            await controller.CreateNewUser(email, password);
            return res.status(201).json({message: "{éxito al crear el usuario"});
        } catch (error) {
            console.log("error al crear nuevo usuario--", error);
            return res.status(500).json({message: "ocurrió un error al intentar guardar los cambios"});

        }
    })

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id=req.params.id;
            const response=await controller.DeleteUserById(id);
            console.log("USUARIO ELIMINADO-->", JSON.stringify(response));
            return res.status(200).json({message: "exito al eliminar el usuario"});
        } catch (error) {
            console.error("error al eliminar un usuarioi-->", error);
            return res.status(500).json({message: "ocurrio un error al intentar eliminar un usuario"});
        }
    })

    app.post(`${base}/login`, async(req, res, next)=>{
        try {
            const response = await controller.Login(req, res);
            return response;
        } catch (error) {
            next(error);
        }
    })

};

module.exports=UserRoutes;
import {Router} from "express";
import {AuthController} from "./controllers";
import {AuthDataSourceImpl, AuthRepositoryImpl} from "../../infrastructure";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        router.post('/login', controller.loginUser);

        router.post('/register', controller.registerUser);

        return router;
    }
}
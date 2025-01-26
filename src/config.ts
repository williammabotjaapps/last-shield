interface AccessRoutes {
    [role: string]: string[];
}

export interface RouteConfig {
    publicRoutes: string[];
    privateRoutes: string[];
    hybridRoutes: string[];
    loginRoute: string;
    registerRoute: string;
    forgotRoute: string;
    otpRoute: string;
    accessRoutes: AccessRoutes;
    isAuthenticated: boolean;
}
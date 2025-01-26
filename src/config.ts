interface AccessRoutes {
    [role: string]: string[] | null;
}

export interface RouteConfig {
    publicRoutes?: string[] | null;
    privateRoutes?: string[] | null; 
    hybridRoutes: string[] | null;
    loginRoute: string | null; 
    registerRoute: string | null; 
    forgotRoute: string | null;
    otpRoute: string | null;
    accessRoutes: AccessRoutes | null; 
    isAuthenticated: boolean | null; 
}
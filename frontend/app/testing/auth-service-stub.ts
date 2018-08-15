import { AuthService } from '../auth/auth.service';

let authServiceStub: Partial<AuthService>;
authServiceStub = {
    loggedIn: false,
    userProfile: { },
};

authServiceStub.setLoggedIn = (loggedInStatus) => {
    authServiceStub.loggedIn = loggedInStatus;
};

authServiceStub.logout = () => {
    authServiceStub.loggedIn = false;
};

export { authServiceStub };

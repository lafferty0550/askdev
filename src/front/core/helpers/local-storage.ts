export class LocalStorage {
    static get JWT(): string {
        return localStorage.getItem('token') || '';
    }

    static set JWT(token: string) {
        localStorage.setItem('token', token);
    }

    static get refreshJWT(): string {
        return localStorage.getItem('refreshToken') || '';
    }

    static set refreshJWT(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    static cleanup = () => {
        LocalStorage.JWT = '';
        LocalStorage.refreshJWT = '';
    }
}
import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigurationCache } from './configuration/configurationCache';
import { UserService } from './user/userService';
import { LoginService } from './auth/loginService';

const container = new Container({ defaultScope: 'Request' });

container.bind(ConfigurationCache).toSelf().inSingletonScope();

const newScope = () => {
    const requestContainer = new Container({ defaultScope: 'Request', parent: container });

    requestContainer.bind(UserService).toSelf().inSingletonScope();
    requestContainer.bind(LoginService).toSelf().inSingletonScope();

    return requestContainer;
}

const useScope = (): Container => {
    const event = useEvent();

    if (!event.context.di) {
        event.context.di = newScope();
    }

    return event.context.di;
}

export { useScope, container };

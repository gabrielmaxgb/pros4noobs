import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigurationCache } from './configuration/configurationCache';
import { UserService } from './user/userService';
import { LoginService } from './auth/loginService';

const container = new Container({ defaultScope: 'Request' });

container.bind(ConfigurationCache).toSelf().inRequestScope();
container.bind(UserService).toSelf().inRequestScope();
container.bind(LoginService).toSelf().inRequestScope();

export default container;

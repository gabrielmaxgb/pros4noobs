export const TOP_NAVBAR_HEIGHT = '60px';

export interface INavigationOption {
  label: string;
  icon: string;
  to: string;
  disabled?: boolean;
}
export const navigationOptions: INavigationOption[] = [
  {
    label: 'Inicio',
    icon: 'fe:beginner',
    to: '/',
  },
  {
    label: 'Sobre',
    icon: 'ix:about',
    to: '/about',
  },
  {
    label: 'Cadastre-se',
    icon: 'mingcute:hand-2-fill',
    to: '/onboarding',
    disabled: true,
  },
  {
    label: 'Entrar',
    icon: 'mingcute:login-2-fill',
    to: '/login',
    disabled: true,
  },
];

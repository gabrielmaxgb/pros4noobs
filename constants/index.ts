export const TOP_NAVBAR_HEIGHT = "60px";

export interface INavigationOption {
	label: string;
	icon: string;
	to: string;
	disabled?: boolean;
}
export const navigationOptions: INavigationOption[] = [
	{
		label: "Inicio",
		icon: "fe:beginner",
		to: "/",
	},
	{
		label: "Sobre",
		icon: "ix:about",
		to: "/about",
	},
	{
		label: "Faça Parte",
		icon: "mingcute:bug-fill",
		to: "/onboarding",
	},
	// {
	//   label: "Seja um Pro",
	//   icon: "mingcute:brackets-angle-fill",
	//   to: "/pro-register",
	// },
];

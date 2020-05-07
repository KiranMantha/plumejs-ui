interface HTMLElement {
	trigger: (eventName: string, isBubbling?: boolean) => void;
	update: () => void;
	getModel: () => { [key: string]: any };
}

interface String {
	translate: (...args: any) => string;
}

declare module '*.scss' {
	const content: any;
	// using style-loader will result in an object which is incompatible
	// hence use only css-loader and sass-loader which result in proper compiled css array 
	// calling toString on compiled css array will result in proper css string 
	// which will feed to component decorator
  	export default content.toString();
}
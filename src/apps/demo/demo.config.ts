import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('demo.config');

export interface IAppConfig {
	sldsAssets: string;
}

export const CONFIG: IAppConfig = {
	sldsAssets: (<any>window).sldsAssets
};
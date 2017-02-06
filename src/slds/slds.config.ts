import { OpaqueToken } from '@angular/core';

export let SLDS_CONFIG = new OpaqueToken('slds.config');

export interface ISldsConfig {
	sldsAssets: string;
}

export const CONFIG: ISldsConfig = {
	sldsAssets: (<any>window).sldsAssets
};
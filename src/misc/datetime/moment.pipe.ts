import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
	transform(value: string, format: string = 'L', showTime: boolean = false) {
		if (showTime) {
			format += ' LT';
		}
		let output = moment(value).format(format);
		return output;
	}
}
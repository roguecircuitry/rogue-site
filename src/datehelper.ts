
export interface DateHelperInfo {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  millis?: number;
}



export class DateHelper {
  static MS_TO_S: number;
  static MS_TO_M: number;
  static MS_TO_H: number;
  static MS_TO_D: number;
  static MS_TO_W: number;
  static MS_TO_MON: number;
  static MS_TO_Y: number;

  static enlapsed(fromMillis: number, toMillis: number, infoOut: DateHelperInfo = undefined): DateHelperInfo {
    if (!infoOut) infoOut = {};
    let diffMillis = toMillis - fromMillis;

    infoOut.years = Math.floor(diffMillis / DateHelper.MS_TO_Y);
    diffMillis -= infoOut.years * DateHelper.MS_TO_Y;

    infoOut.months = Math.floor(diffMillis / DateHelper.MS_TO_MON);
    diffMillis -= infoOut.months * DateHelper.MS_TO_MON;

    infoOut.weeks = Math.floor(diffMillis / DateHelper.MS_TO_W);
    diffMillis -= infoOut.weeks * DateHelper.MS_TO_W;

    infoOut.days = Math.floor(diffMillis / DateHelper.MS_TO_D);
    diffMillis -= infoOut.days * DateHelper.MS_TO_D;

    infoOut.hours = Math.floor(diffMillis / DateHelper.MS_TO_H);
    diffMillis -= infoOut.hours * DateHelper.MS_TO_H;

    infoOut.minutes = Math.floor(diffMillis / DateHelper.MS_TO_M);
    diffMillis -= infoOut.minutes * DateHelper.MS_TO_M;

    infoOut.seconds = Math.floor(diffMillis / DateHelper.MS_TO_S);
    diffMillis -= infoOut.seconds * DateHelper.MS_TO_S;

    infoOut.millis = Math.floor(diffMillis);

    return infoOut;
  }
  static format(info: DateHelperInfo, y: boolean = true, mon: boolean = true, w: boolean = true, d: boolean = true, h: boolean = true, min: boolean = true, s: boolean = true): string {
    let result = "";
    if (y) result += `${info.years}y `;
    if (mon) result += `${info.months}mon `;
    if (d) result += `${info.days}d `;
    if (h) result += `${info.hours}h `;
    if (min) result += `${info.minutes}min `;
    if (s) result += `${info.seconds}s`;
    return result;
  }
}
DateHelper.MS_TO_S = 1000;
DateHelper.MS_TO_M = 60 * DateHelper.MS_TO_S;
DateHelper.MS_TO_H = 60 * DateHelper.MS_TO_M;
DateHelper.MS_TO_D = 24 * DateHelper.MS_TO_H;
DateHelper.MS_TO_W = 7 * DateHelper.MS_TO_D;
DateHelper.MS_TO_MON = 4 * DateHelper.MS_TO_W;
DateHelper.MS_TO_Y = 12 * DateHelper.MS_TO_MON;

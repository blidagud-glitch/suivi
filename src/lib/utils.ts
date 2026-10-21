import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const OLC_CHARSET = '23456789CFGHJMPQRVWX';
export function encodePlusCode(latitude: number, longitude: number): string {
  let lat = Math.min(90, Math.max(-90, latitude)) + 90;
  let lng = ((longitude + 180) % 360 + 360) % 360;
  let code = '';
  let latVal = lat;
  let lngVal = lng;
  const resolutions = [20, 1, 0.05, 0.0025];
  for (const res of resolutions) {
    const latDigit = Math.floor(latVal / res);
    const lngDigit = Math.floor(lngVal / res);
    code += OLC_CHARSET[latDigit] + OLC_CHARSET[lngDigit];
    latVal -= latDigit * res;
    lngVal -= lngDigit * res;
  }
  code += '+';
  const latDigit = Math.floor(latVal / 0.000125);
  const lngDigit = Math.floor(lngVal / 0.000125);
  code += OLC_CHARSET[latDigit] + OLC_CHARSET[lngDigit];
  return code;
}

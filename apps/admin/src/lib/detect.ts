export const isKakaoInApp = () => /KAKAOTALK/i.test(navigator.userAgent);
export const isAndroid = () => /Android/i.test(navigator.userAgent);
export const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

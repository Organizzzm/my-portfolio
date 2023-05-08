export type IconsId =
  | "Img_box_fill"
  | "Img_duotone_line"
  | "Img_fill"
  | "Img_out-box_duotone_line"
  | "Img_out-box_Fill"
  | "User_cicrle"
  | "xxx";

export type IconsKey =
  | "ImgBoxFill"
  | "ImgDuotoneLine"
  | "ImgFill"
  | "ImgOutBoxDuotoneLine"
  | "ImgOutBoxFill"
  | "UserCicrle"
  | "Xxx";

export enum Icons {
  ImgBoxFill = "Img_box_fill",
  ImgDuotoneLine = "Img_duotone_line",
  ImgFill = "Img_fill",
  ImgOutBoxDuotoneLine = "Img_out-box_duotone_line",
  ImgOutBoxFill = "Img_out-box_Fill",
  UserCicrle = "User_cicrle",
  Xxx = "xxx",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.ImgBoxFill]: "61697",
  [Icons.ImgDuotoneLine]: "61698",
  [Icons.ImgFill]: "61699",
  [Icons.ImgOutBoxDuotoneLine]: "61700",
  [Icons.ImgOutBoxFill]: "61701",
  [Icons.UserCicrle]: "61702",
  [Icons.Xxx]: "61703",
};

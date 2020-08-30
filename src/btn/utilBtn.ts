import { IdBtnColor } from "./IdBtnColor";


class UtilBtn {
    public getColorClass = (color?: IdBtnColor, solid?: boolean): string => {
        let classNames = 'btn ';

        switch(color) {
            case IdBtnColor.BLUE:
                return classNames += solid ? 'btnBlue': 'btnBlueLine';
            case IdBtnColor.GREEN:
                return classNames += solid ? 'btnGreen': 'btnGreenLine';
            case IdBtnColor.ORANGE:
                return classNames += solid ? 'btnOrange': 'btnOrangeLine';
            case IdBtnColor.RED:
                return classNames += solid ? 'btnRed' : 'btnRedLine';
            default:
                return classNames += solid ? 'btnDefault' : 'btnDefaultLine';
        }
    }
}

export const utilBtn = new UtilBtn();
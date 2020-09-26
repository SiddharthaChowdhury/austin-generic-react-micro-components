import React from "react";
import "./timePicker.scss"

interface ITimePickerProps {
    show?: string[], /* 
        in format [ 
            hh<02>, // string 
            mm<15> | null,  //  string | null
            ss<43> | null,  //  string | null
            am | pm | null  //  string | null
        ]

        - null - that unit will not be shown
        - Note hh cannot be null, 
    */
    onChange?: (newTime: string) => void;
    ampm?: boolean; // default<false>: 24 hr clock 
    showLabels?: boolean; // default<false>
    optionCloseText?: string;
}

class TimePicker extends React.Component<ITimePickerProps> {

    readonly state: {
        timeArr: Array<string | null> | undefined,
        choose: {
            'hh': boolean,
            'mm': boolean,
            'ss': boolean,
            'ampm': boolean
        }
    } = {
        timeArr : undefined, 
        choose: {
            'hh': false,
            'mm': false,
            'ss': false,
            'ampm': false
        }
    }

    private readonly hrPmAm = {
        '01'    : ['01', 'am'],
        '02'    : ['02', 'am'],
        '03'    : ['03', 'am'],
        '04'    : ['04', 'am'],
        '05'    : ['05', 'am'], 
        '06'    : ['06', 'am'],
        '07'    : ['07', 'am'],
        '08'    : ['08', 'am'],
        '09'    : ['09', 'am'],
        '10'    : ['10', 'am'],
        '11'    : ['11', 'am'],
        '12'    : ['12', 'am'],
        '13'    : ['01', 'pm'],
        '14'    : ['02', 'pm'],
        '15'    : ['03', 'pm'],
        '16'    : ['04', 'pm'],
        '17'    : ['05', 'pm'],
        '18'    : ['06', 'pm'],
        '19'    : ['07', 'pm'],
        '20'    : ['08', 'pm'],
        '21'    : ['09', 'pm'],
        '22'    : ['10', 'pm'],
        '23'    : ['11', 'pm'],
        '24'    : ['12', 'pm']
    }

    private getTimeNow = (): Array<string | null> => {
        const d = new Date();
        const {ampm, show} = this.props;
        
        const timeUnits: Array<string | null> = [
            ("0" + d.getHours()).slice(-2)   + '',
            ("0" + d.getMinutes()).slice(-2)   + '',
            ("0" + d.getSeconds()).slice(-2)   + '',
            null
        ];

        if(ampm) {
            const [hr, AmPm] = this.hrPmAm[timeUnits[0]!];
            timeUnits[0] = hr;
            timeUnits[3] = AmPm;
        }

        if(show) {
            const [sHH, sMM, sSS] = show;

            if(sHH && ampm) {
                const [hr, AmPm] = this.hrPmAm[sHH];
                timeUnits[0] = hr;
                timeUnits[3] = (show[3] && (show[3] === "am" || show[3] === "pm")) ? show[3] : AmPm;
            }
            if(sHH && !ampm) {
                timeUnits[0] = sHH;
            }

            if(sMM === null || sMM === undefined) { timeUnits[1] = null}
            else { timeUnits[1] = sMM }

            if(sSS === null || sSS === undefined) { timeUnits[2] = null}
            else { timeUnits[2] = sSS }
        }

        return timeUnits;
    }

    render() {
        const {showLabels} = this.props;
        const {timeArr, choose} = this.state;
        
        if(!timeArr) return null;
        const [hh, mm, ss, AmPm] = timeArr;

        return(
            <div className={'timePicker'}>
                <div className={'timePicker__group timePicker__hh'} onClick={() => this.toggleChoose('hh')}>
                    {showLabels && <div className={'timePicker__group--label'}>HH</div>}
                    {choose.hh 
                        ? this.getChooseHHMMSS('hh') 
                        : <div className={'timePicker__group--disp'}>{hh}</div>
                    }
                    
                </div>

                {mm &&
                    <>
                        <span className={'timePicker__divider'}/>
                        <div className={'timePicker__group timePicker__mm'} onClick={() => this.toggleChoose('mm')}>
                            {showLabels && <div className={'timePicker__group--label'}>MM</div>}
                            {choose.mm
                                ? this.getChooseHHMMSS('mm')
                                : <div className={'timePicker__group--disp'}>{mm}</div>
                            }           
                        </div>
                    </>
                }
                {ss &&
                    <>
                        <span className={'timePicker__divider'}/>
                        <div className={'timePicker__group timePicker__ss'} onClick={() => this.toggleChoose('ss')}>
                            {showLabels && <div className={'timePicker__group--label'}>SS</div>}
                            {choose.ss
                                ? this.getChooseHHMMSS('ss')
                                : <div className={'timePicker__group--disp'}>{ss}</div>
                            }
                        </div>
                    </>
                }
                {AmPm &&
                    <div className={'timePicker__group timePicker__ampm'} onClick={() => this.toggleChoose('ampm')}>
                        {choose.ampm
                            ? this.getChooseAMPM()
                            : <div className={'timePicker__group--disp'}>{AmPm}</div> 
                        }
                    </div>
                }
            </div>        
        );
    };

    componentDidMount() {
        this.setState({timeArr: this.getTimeNow()})
    }

    private toggleChoose(index: string) {
        const choose = {...this.state.choose};
        
        Object.keys(choose).forEach((ind: string) => {
            choose[ind] = ind === index ? !choose[ind] : false
        })

        this.setState({choose})
    }

    private getChooseHHMMSS = (unit: string) => {
        const {ampm, optionCloseText} = this.props;
        const sss = [];
        const size = unit === 'hh' ? ampm ? 12 : 24 : 60;

        for(let i = 1; i <= size ; i++) {
            const formattedNumber = ("0" + i).slice(-2);
            sss.push(
                <li
                    key={i}
                    className={'timePicker__group--choose--ul-option'}
                    onClick={() => {
                        const timeArr = [...(this.state.timeArr || [])];
                        if(unit === 'hh')
                            timeArr[0] = formattedNumber;
                        if(unit === 'mm')
                            timeArr[1] = formattedNumber;
                        if(unit === 'ss')
                            timeArr[2] = formattedNumber;

                        this.setState({timeArr: [...timeArr]})
                        this.toggleChoose(unit)
                    }}
                >{formattedNumber}</li>
            )
        }
        return(
            <div className={'timePicker__group--choose'}>
                <span className={'timePicker__group--choose--close'} onClick={() => this.toggleChoose('')}>
                    {optionCloseText || 'X'}
                </span>
                <ul className={`timePicker__group--choose--ul timePicker__group--choose--${unit}`}>
                    {sss}
                </ul>
            </div>
        )
    }

    private getChooseAMPM = () => {
        const handleClick = (val: string) => {
            const timeArr = [...(this.state.timeArr || [])];
                timeArr[3] = val;

            this.setState({timeArr: [...timeArr]})
            this.toggleChoose('ampm')
        }

        return (
            <div className={'timePicker__group--choose'}>
                <span className={'timePicker__group--choose--close'} onClick={() => this.toggleChoose('')}>
                    {this.props.optionCloseText || 'X'}
                </span>
                <ul className={`timePicker__group--choose--ul timePicker__group--choose--ampm`}>
                    <li className={'timePicker__group--choose--ul-option'} onClick={() => handleClick('am')}>AM</li>
                    <li className={'timePicker__group--choose--ul-option'} onClick={() => handleClick('pm')}>PM</li>
                </ul>
            </div>
        );
    }
}

export default TimePicker;
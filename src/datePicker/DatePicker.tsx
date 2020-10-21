import React from "react";
import DatePicker from "react-datepicker";
import "./datepicker.scss";

interface IDatePickerProps {
    selectedDate?: Date | null;
    onChange: (dates: [Date, Date] | Date | null) => any;
    [index: string]: any;
}

class DatePicker2 extends React.PureComponent<IDatePickerProps> {

    render() {
        const {children, onChange, selectedDate, ...rest} = this.props;
        return (
            <DatePicker 
                selected={selectedDate}
                onChange={onChange}
                dateFormat="MMMM d, yyyy h:mm aa"
                {...rest}
            />
        );
    }
}

export default DatePicker2;
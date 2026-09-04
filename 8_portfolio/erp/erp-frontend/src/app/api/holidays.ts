import {Holiday} from "../types/holiday";

export const fetchHolidays = 
async (year:number, month:number) : Promise<Holiday[]> => {
    if (month === 9) {
        return[
            {date:24, name:'추석 연휴'},
            {date:25, name:'추석'},
            {date:26, name:'추석 연휴'},
        ];
    }
    if (month === 12) {
        return[{date:25, name:'성탄절'},];
    }
    return [];
}
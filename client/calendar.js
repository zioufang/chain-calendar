window.onload = () => {
    const { calendarHeader, tableCurrentMonthCalendar } = getMonthCalendar();
    document.getElementById('month-year-header').innerHTML = calendarHeader;
    document.getElementById('calendar-body').appendChild(tableCurrentMonthCalendar);
};

const toggleDateBackground = date_id => {
    let toggled_classname = 'date-background-highlighted';
    let date_td = document.getElementById(date_id);
    let td_class = date_td.className;
    let td_class_array = td_class.split(' ');
    let toggled_idx = td_class_array.indexOf(toggled_classname);
    if (toggled_idx >= 0) {
        td_class_array.splice(toggled_idx, 1);
    } else {
        td_class_array.push(toggled_classname);
    }
    td_class = td_class_array.join(' ');
    date_td.setAttribute('class', td_class);
    console.log(date_td.className);
};
/* -------------------------------------------
POPULATE Month Calendar as a table
- create calendarHeader as MONTH_NAMES YEAR
- add Days of Week header and tag <td> class=dow-header
- add the first few td's from the previous months in the first row
- do the current month
- tag <td> class=other-month if not current month
- tag <td> with id=yyyy-(m)m-dd
- do the rest of the row with the last few td from the next months
------------------------------------------- */
const getMonthCalendar = (date = new Date()) => {
    let MONTH_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let calendarHeader = MONTH_NAMES[currentMonth] + ' ' + currentYear;

    let tableCurrentMonthCalendar = document.createElement('table');
    let tr = document.createElement('tr');

    // SMTWTFS row
    [...'SMTWTFS'].forEach(dow => {
        let td = document.createElement('td');
        td.setAttribute('class', 'dow-header');
        td.innerHTML = dow;
        tr.appendChild(td);
    });
    tableCurrentMonthCalendar.appendChild(tr);

    // rest of the calendar
    let calDay = 1;
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let currentMonthFirstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    let prevMonthLastDate = new Date(currentYear, currentMonth, 0);
    let prevMonthLastDay = prevMonthLastDate.getDate();
    let prevMonth = prevMonthLastDate.getMonth();
    let prevMonthYear = prevMonthLastDate.getFullYear();

    let nextMonthCalDay = 1;
    let nextMonth = new Date(currentYear, currentMonth + 1, 1).getMonth();
    let nextMonthYear = new Date(currentYear, currentMonth + 1, 1).getFullYear();

    for (let r = 0; r < 6; r++) {
        tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            let td = document.createElement('td');
            td.setAttribute('onclick', 'toggleDateBackground(this.id)');

            if (r == 0 && i < currentMonthFirstDayOfWeek) {
                // first row and last few dates in the previous month
                td.setAttribute('class', 'other-month');
                day = prevMonthLastDay - currentMonthFirstDayOfWeek + i + 1;
                td.innerHTML = day;
                td.setAttribute('id', prevMonthYear + '-' + (prevMonth + 1) + '-' + day);
            } else if (calDay <= daysInMonth) {
                // current month
                td.setAttribute('class', 'current-month');
                if (calDay == currentDay) {
                    td.setAttribute('class', 'today current-month');
                }
                td.innerHTML = calDay;
                td.setAttribute('id', currentYear + '-' + (currentMonth + 1) + '-' + calDay);
                calDay += 1;
            } else {
                // first few dates in the next month
                td.setAttribute('class', 'other-month');
                td.innerHTML = nextMonthCalDay;
                td.setAttribute(
                    'id',
                    nextMonthYear + '-' + (nextMonth + 1) + '-' + nextMonthCalDay
                );
                nextMonthCalDay += 1;
            }
            tr.appendChild(td);
        }
        tableCurrentMonthCalendar.appendChild(tr);
    }
    console.log(tableCurrentMonthCalendar);

    return {
        calendarHeader,
        tableCurrentMonthCalendar
    };
};

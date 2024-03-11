import React, { useContext } from 'react';

// 引入classnames库，用于动态添加类名
import cs from 'classnames';
// 引入dayjs库，用于处理日期和时间
import { Dayjs } from 'dayjs';

// 导入CalendarProps和LocaleContext上下文
import { CalendarProps, LocaleContext } from '..';
// 导入所有本地化语言配置
import allLocales from '../language';

// 定义CalendarBodyProps接口，描述CalendarBody组件的props
interface CalendarBodyProps extends CalendarProps {
  value: Dayjs; // 当前选择的日期
  selectHandler?: (date: Dayjs) => void; // 日期选择事件处理函数
}

// 定义DateListProps接口，描述日期列表项的props
interface DateListProps {
  date: Dayjs; // 日期
  curMonth: boolean; // 是否是当前月份
}

// 定义CalendarBody组件
const Body: React.FC<CalendarBodyProps> = props => {
  // 从props中解构需要用到的属性
  const { value, dateRender, dateInnerContent, selectHandler } = props;

  // 使用useContext hook获取当前的本地化上下文
  const localeContext = useContext(LocaleContext);

  // 获取本地化语言配置
  const CalendarLocale = allLocales[localeContext.locale];

  // 定义一周的名称列表
  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // 获取当前月份的所有日期列表
  const allDays = getAllDays(value);

  // 获取当前月份的所有日期列表
  function getAllDays(date: Dayjs) {
    const dateList: Array<DateListProps> = new Array(6 * 7);
    const startDay = date.startOf('month');
    const startDayOfWeek = startDay.day();

    // 添加上个月的日期
    for (let i = 0; i < startDayOfWeek; i++) {
      dateList[i] = {
        date: startDay.subtract(startDayOfWeek - i, 'day'),
        curMonth: false,
      };
    }

    // 添加当前月份的日期
    for (let i = startDayOfWeek; i < dateList.length; i++) {
      const calcDate = startDay.add(i - startDayOfWeek, 'day');
      dateList[i] = {
        date: calcDate,
        curMonth: date.month() === calcDate.month(),
      };
    }
    return dateList;
  }

  // 渲染日期列表
  const renderDate = (dateList: Array<DateListProps>) => {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = dateList[i * 7 + j];
        row[j] = (
          <div
            className={cs('calendar-body-date-row-cell', item.curMonth && 'calendar-body-date-row-cell-current')}
            key={`${i}_${j}`}
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className='calendar-body-date-row-cell-date'>
                <div
                  className={cs(
                    'calendar-body-date-row-cell-date-value',
                    value.format('YYYY MM DD') === item.date.format('YYYY MM DD') &&
                      'calendar-body-date-row-cell-date-selected', // 当前时间
                  )}
                >
                  {item.date.date()}
                </div>
                {/* 渲染日期内部内容 */}
                <div className='calendar-body-date-row-cell-date-content'>{dateInnerContent?.(item.date)}</div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row, index) => (
      <div key={index} className='calendar-body-date-row'>
        {row}
      </div>
    ));
  };

  // 返回CalendarBody组件的JSX
  return (
    <div className='calendar-body'>
      {/* 渲染星期列表 */}
      <div className='calendar-body-weeks'>
        {weekList.map(week => (
          <div key={week} className='calendar-body-weeks-item'>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      {/* 渲染日期列表 */}
      <div className='calendar-body-date'>{renderDate(allDays)}</div>
    </div>
  );
};

export default Body; // 导出CalendarBody组件

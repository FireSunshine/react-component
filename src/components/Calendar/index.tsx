import React, { createContext, CSSProperties, ReactNode, useEffect, useState } from 'react';

// 引入classnames库，用于动态添加类名
import cs from 'classnames';
// 引入dayjs库，用于处理日期和时间
import dayjs, { Dayjs } from 'dayjs';

// 引入日历组件的子组件
import Body from './component/Body';
import Header from './component/Header';

// 引入样式文件
import './index.scss';

// 定义CalendarProps接口，描述Calendar组件的props
export interface CalendarProps {
  defaultValue?: Dayjs; // 日历的默认值
  value?: Dayjs; // 日历当前选择的值
  style?: CSSProperties; // 自定义样式
  className?: string | string[]; // 自定义类名
  dateRender?: (date: Dayjs) => ReactNode; // 自定义日期渲染函数
  dateInnerContent?: (date: Dayjs) => ReactNode; // 自定义日期内部内容函数
  locale?: 'en-US' | 'zh-CN'; // 本地化语言
  onChange?: (date: Dayjs) => void; // 日期变更事件处理函数
}

// 定义LocaleContextType接口，描述LocaleContext的上下文类型
interface LocaleContextType {
  locale: string; // 本地化语言
}

// 创建LocaleContext，用于向子组件传递本地化信息
export const LocaleContext = createContext<LocaleContextType>({ locale: 'zh-CN' });

// 定义Calendar组件
const Calendar: React.FC<CalendarProps> = props => {
  // 从props中解构需要用到的属性
  const { defaultValue, value, style, className, locale, onChange } = props;

  // 动态生成类名
  const classNames = cs('calendar', className);

  // 使用useState hook创建状态date，用于跟踪日历的当前日期
  const [date, setDate] = useState<Dayjs>(value || dayjs(defaultValue) || dayjs(Date.now()));

  // useEffect hook，当value发生变化时更新date状态
  useEffect(() => {
    value && setDate(value);
  }, [value]);

  // 改变日期的函数，用于处理日期变更事件
  const changeDate = (date: Dayjs) => {
    if (value && !onChange) return; // 如果value已存在且没有onChange函数，则不执行
    setDate(date); // 更新日期状态
    onChange?.(date); // 调用onChange事件处理函数
  };

  // 处理日期选择事件
  const selectHandler = (date: Dayjs) => {
    changeDate(date); // 调用changeDate函数
  };

  // 处理上个月按钮点击事件
  const preMonthHandler = () => {
    if (value && !onChange) return; // 如果value已存在且没有onChange函数，则不执行
    setDate(date.subtract(1, 'month')); // 更新日期状态为上个月
  };

  // 处理下个月按钮点击事件
  const nextMonthHandler = () => {
    if (value && !onChange) return; // 如果value已存在且没有onChange函数，则不执行
    setDate(date.add(1, 'month')); // 更新日期状态为下个月
  };

  // 处理今天按钮点击事件
  const todayHandler = () => {
    const date = dayjs(Date.now()); // 获取当前日期
    changeDate(date); // 更新日期状态为今天
  };

  // 返回Calendar组件的JSX
  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        {/* 渲染Header子组件 */}
        <Header
          value={date}
          preMonthHandler={preMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        {/* 渲染Body子组件，并传递相关props */}
        <Body {...props} value={date} selectHandler={selectHandler} />
      </div>
    </LocaleContext.Provider>
  );
};

export default Calendar; // 导出Calendar组件

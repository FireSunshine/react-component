import React, { forwardRef, useImperativeHandle, useState } from 'react'; // 导入 React 库中的 React 和 useState 模块

import './index.scss'; // 导入样式文件

// 定义 CalendarProps 接口，表示 Calendar 组件的 props
interface CalendarProps {
  value?: Date; // value 属性可选，类型为 Date
  onChange?: (date: Date) => void; // onChange 属性可选，类型为接收 Date 参数并且不返回任何内容的函数
}

export interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

// 定义 Calendar 组件，类型为 React.FC<CalendarProps>
const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { value = new Date(), onChange } = props; // 从 props 中解构出 value 和 onChange，若未提供则使用默认值

  const [date, setDate] = useState(value); // 使用 useState 定义 date 状态及其更新函数 setDate，初始值为 props 中的 value

  useImperativeHandle(ref, () => ({
    getDate() {
      return date;
    },
    setDate(date: Date) {
      setDate(date);
    },
  }));

  // 处理前一个月按钮点击事件
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)); // 更新 date 状态为上一个月的日期
  };

  // 处理下一个月按钮点击事件
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)); // 更新 date 状态为下一个月的日期
  };

  // 定义月份的名称数组
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  // 获取指定年月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 使用 Date 对象获取指定日期的星期几（0 表示星期日）
  };

  // 获取指定年月的天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate(); // 使用 Date 对象获取指定月份的天数
  };

  // 渲染日期格子的函数组件
  const RenderDays = () => {
    const days = []; // 创建一个空数组用于存储日期格子

    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth()); // 获取当前月份的第一天是星期几
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth()); // 获取当前月份的天数

    const lastMonthOfLastDay = daysOfMonth(date.getFullYear(), date.getMonth() - 1);

    // 添加空白格子，补齐本月第一天之前的格子
    for (let i = 0; i < firstDay; i++) {
      days.unshift(
        <div key={`empty-${lastMonthOfLastDay - i}`} className='empty'>
          {lastMonthOfLastDay - i}
        </div>,
      );
    }

    // 添加日期格子
    for (let i = 1; i <= daysCount; i++) {
      const handleClick = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i)); // 创建处理点击事件的函数

      // 根据日期是否与当前选中日期相同来渲染不同样式的格子
      if (i === date.getDate()) {
        days.push(
          <div key={i} className='day selected' onClick={handleClick}>
            {i}
          </div>,
        );
      } else {
        days.push(
          <div key={i} className='day' onClick={handleClick}>
            {i}
          </div>,
        );
      }
    }

    for (let i = 1; i <= 42 - firstDay - daysCount; i++) {
      const nextDays = new Date(date.getFullYear(), date.getMonth(), i).getDate();
      days.push(
        <div key={`empty-${nextDays}`} className='empty'>
          {nextDays}
        </div>,
      );
    }
    return days; // 返回日期格子数组
  };

  return (
    <div className='calendar'>
      {/* 日历容器 */}
      <div className='header'>
        {/* 日历头部 */}
        <button onClick={handlePrevMonth}>&lt;</button> {/* 前一个月按钮 */}
        <div>
          {date.getFullYear()} 年 {months[date.getMonth()]} {/* 显示当前年份和月份 */}
        </div>
        <button onClick={handleNextMonth}>&gt;</button> {/* 后一个月按钮 */}
      </div>
      <div className='days'>
        {/* 日历日期格子容器 */}
        <div className='day'>日</div> {/* 日历星期标题栏 */}
        <div className='day'>一</div>
        <div className='day'>二</div>
        <div className='day'>三</div>
        <div className='day'>四</div>
        <div className='day'>五</div>
        <div className='day'>六</div>
        {RenderDays()} {/* 渲染日期格子 */}
      </div>
    </div>
  );
};

const MiniCalendar = forwardRef(InternalCalendar);

export default MiniCalendar; // 导出 Calendar 组件

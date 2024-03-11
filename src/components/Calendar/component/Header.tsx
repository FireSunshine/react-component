import React, { useContext } from 'react';

// 导入dayjs库，用于处理日期和时间
import { Dayjs } from 'dayjs';

// 导入LocaleContext上下文
import { LocaleContext } from '../index';
// 导入所有本地化语言配置
import allLocales from '../language';

// 定义HeaderProps接口，描述Header组件的props
interface HeaderProps {
  value: Dayjs; // 当前选择的日期
  preMonthHandler: () => void; // 上个月按钮点击事件处理函数
  nextMonthHandler: () => void; // 下个月按钮点击事件处理函数
  todayHandler: () => void; // 今天按钮点击事件处理函数
}

// 定义Header组件
const Header: React.FC<HeaderProps> = props => {
  // 从props中解构需要用到的属性
  const { value, preMonthHandler, nextMonthHandler, todayHandler } = props;

  // 使用useContext hook获取当前的本地化上下文
  const localeContext = useContext(LocaleContext);

  // 获取本地化语言配置
  const CalendarContext = allLocales[localeContext.locale];

  // 返回Header组件的JSX
  return (
    <div className='calendar-header'>
      <div className='calendar-header-left'>
        {/* 渲染上个月按钮 */}
        <div className='calendar-header-icon' onClick={preMonthHandler}>
          &lt;
        </div>
        {/* 渲染当前月份值 */}
        <div className='calendar-header-value'>{value.format(CalendarContext.formatMonth)}</div>
        {/* 渲染下个月按钮 */}
        <div className='calendar-header-icon' onClick={nextMonthHandler}>
          &gt;
        </div>
        {/* 渲染今天按钮 */}
        <div className='calendar-header-btn' onClick={todayHandler}>
          {CalendarContext.today}
        </div>
      </div>
    </div>
  );
};

export default Header; // 导出Header组件

import Calendar from '@/components/Calendar';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

describe('Calendar Component', () => {
  it('Test renders Calendar', () => {
    render(<Calendar />);
  });

  // 测试 props defaultValue
  it('Test props of defaultValue', () => {
    const { container } = render(<Calendar defaultValue={dayjs('2024-1-1')} />);
    const element = container.querySelector('.calendar-body-date-row-cell-date-selected');
    expect(element).toHaveTextContent('1');
  });

  // 测试 props vaule
  it('Test props of value', () => {
    const { getByText } = render(<Calendar value={dayjs('2024-1-20')} defaultValue={dayjs('2024-1-1')} />);
    const element = getByText('20'); // 假设20号格子对应渲染的文本内容
    expect(element).toHaveClass('calendar-body-date-row-cell-date-selected'); // 假设高亮样式类名为'calendar-body-date-row-cell-date-selected'
  });

  // 测试 props dateRender
  it('Test props of dateRender', () => {
    const date = dayjs('2024/10/10');
    render(<Calendar value={date} dateRender={d => <p>{dayjs(d).format('YYYY-MM-DD')}</p>} />);
    const valueElement = screen.getByText(dayjs(date).format('YYYY-MM-DD'));
    expect(valueElement).toBeInTheDocument();
  });

  // 测试 props dateInnerContent
  it('Test props of dateInnerContent', () => {
    const date = dayjs('2024/10/10');
    render(<Calendar value={date} dateInnerContent={d => <p>{dayjs(d).format('YYYY年MM月DD日')}</p>} />);
    const valueElement = screen.getByText(dayjs(date).format('YYYY年MM月DD日'));
    expect(valueElement).toBeInTheDocument();
  });

  // 测试 点击 事件
  it('Test click event', async () => {
    const { container } = render(<Calendar defaultValue={dayjs('2024/1/20')} />);
    const element = document.getElementsByClassName('calendar-body-date-row-cell')[0];
    fireEvent.click(element);
    const curElement = container.querySelector('.calendar-body-date-row-cell-date-selected');
    expect(curElement?.textContent).toBe('31');
  });

  // 测试 上一个月，下一个月，今天 按钮
  it('Test button in header', () => {
    const dateNow = dayjs(Date.now());
    const { container } = render(<Calendar locale='en-US' />);

    const preMonth = document.getElementsByClassName('calendar-header-icon')[0];
    fireEvent.click(preMonth);
    let curMonth = container.querySelector('.calendar-header-value');
    expect(curMonth?.textContent).toEqual(dayjs(dateNow.subtract(1, 'month')).format('MMM YYYY'));

    const todayBtn = document.getElementsByClassName('calendar-header-btn')[0];
    fireEvent.click(todayBtn);
    curMonth = container.querySelector('.calendar-header-value');
    expect(curMonth?.textContent).toEqual(dayjs(dateNow).format('MMM YYYY'));

    const nextMonth = document.getElementsByClassName('calendar-header-icon')[1];
    fireEvent.click(nextMonth);
    curMonth = container.querySelector('.calendar-header-value');
    expect(curMonth?.textContent).toEqual(dayjs(dateNow.add(1, 'month')).format('MMM YYYY'));
  });
});

import Space, { ConfigProvider } from '@/components/Space';
import { render } from '@testing-library/react';

describe('Space component', () => {
  it('render Space component with children', () => {
    const { getByText } = render(
      <Space>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>,
    );
    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  it('render Space component with className', () => {
    const { container } = render(
      <Space className='custom-class' align='start' direction='vertical'>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>,
    );
    const element = container.querySelector('.space');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('space-vertical');
    expect(element).toHaveClass('space-align-start');
  });

  it('render Space component with style', () => {
    const { container } = render(
      <Space style={{ color: 'red' }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>,
    );
    const element = container.querySelector('.space');
    expect(element).toHaveStyle('color: red');
  });

  it('render Space component with split', () => {
    const { getByText } = render(
      <Space split={<p>split</p>}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>,
    );
    expect(getByText('split')).toBeInTheDocument();
  });

  it('render Space component with provider', () => {
    const { container } = render(
      <ConfigProvider space={{ size: [20, 30] }}>
        <Space direction='horizontal'>
          <div>Child 1</div>
          <div>Child 2</div>
        </Space>
      </ConfigProvider>,
    );
    const element = container.querySelector('.space-horizontal');
    expect(element).toHaveStyle('column-gap: 20px');
    expect(element).toHaveStyle('row-gap: 30px');
  });

  it('render Space component with wrap', () => {
    const { container } = render(
      <Space direction='horizontal' wrap>
        <div>Child 1</div>
        <div>Child 2</div>
      </Space>,
    );
    const element = container.querySelector('.space-horizontal');
    expect(element).toHaveStyle('flex-wrap: wrap');
  });
});

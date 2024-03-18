import CreateFrontIconfont from '@/components/Icon/CreateFrontIconfont';
import CreateIcon from '@/components/Icon/CreateIcon';
import { render } from '@testing-library/react';

const IconAdd = CreateIcon({
  content: (
    <path d='M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z' />
  ),
});

const IconFont = CreateFrontIconfont('//at.alicdn.com/t/c/font_4468846_s68mrpvdf4g.js');

describe('Icon Component', () => {
  test('Render with the current content, class name, and style', () => {
    const { container } = render(<IconAdd className='test-class' style={{ color: 'red' }} />);
    const iconElement = container.querySelector('svg');
    const pahtElement = container.querySelector('path');
    expect(iconElement).toHaveClass('icon test-class');
    expect(iconElement).toHaveStyle('color: red');
    expect(pahtElement).toBeInTheDocument();
  });

  test('renders with spin animation when spin prop is true', () => {
    const { container } = render(<IconAdd spin />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveClass('icon-spin');
  });

  test('sets width and height attributes correctly based on size prop', () => {
    const { container: container1 } = render(<IconAdd size={['20px', '30px']} />);
    const iconElement = container1.querySelector('svg');
    expect(iconElement).toHaveAttribute('width', '20px');
    expect(iconElement).toHaveAttribute('height', '30px');

    const { container: container2 } = render(<IconAdd size={'40px'} />);
    const iconElement1 = container2.querySelector('svg');
    expect(iconElement1).toHaveAttribute('width', '40px');
    expect(iconElement1).toHaveAttribute('height', '40px');
  });

  test('Render the iconfont component', () => {
    const { container } = render(<IconFont type='icon-huoguo' size='200px' />);
    const useElement = container.querySelector('use');
    const iconElement = container.querySelector('svg');
    expect(useElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('xlink:href', '#icon-huoguo');
    expect(iconElement).toHaveAttribute('width', '200px');
    expect(iconElement).toHaveAttribute('height', '200px');
  });
});

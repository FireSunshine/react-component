import React, { Children, createContext, PropsWithChildren, useContext, useMemo } from 'react';

import cs from 'classnames';

import './index.scss';

// 定义空间大小的类型
type SizeType = 'small' | 'middle' | 'large' | number | undefined;

// 定义配置上下文的类型
interface ConfigContextType {
  space?: {
    size?: SizeType | [SizeType, SizeType];
  };
}

// 创建上下文
const ConfigContext = createContext<ConfigContextType>({});

// ConfigProvider组件用于提供配置上下文
export function ConfigProvider(props: PropsWithChildren<ConfigContextType>) {
  const { children, space } = props;

  // 返回提供了配置上下文的组件
  return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>;
}

// Space组件的props类型定义
interface SpaceProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string; // 可选的类名
  style?: React.CSSProperties; // 可选的样式
  size?: SizeType | [SizeType, SizeType]; // 空间大小，可以是单个大小或者水平和垂直大小的数组
  direction?: 'horizontal' | 'vertical'; // 空间的方向，默认为水平方向
  align?: 'start' | 'end' | 'center' | 'baseline'; // 对齐方式，默认为居中对齐
  split?: React.ReactNode; // 分隔元素，用于分隔子元素
  wrap?: boolean; // 是否启用flex wrap，默认为false
}

// Space组件用于在元素之间创建空间
const Space: React.FC<SpaceProps> = props => {
  // 从上下文中获取空间配置
  const { space } = useContext(ConfigContext);

  // 解构props
  const {
    children,
    className,
    style,
    size = space?.size || 'small',
    direction = 'horizontal',
    align = 'center',
    split,
    wrap = false,
    ...rest
  } = props;

  // 使用classnames库创建类名
  const classNames = cs('space', `space-${direction}`, { [`space-align-${align}`]: align }, className);

  // 创建水平和垂直空间的样式
  const otherStyles: React.CSSProperties = {};

  // 定义small、middle和large的大小
  const spaceSize = { small: 8, middle: 16, large: 24 };

  // 获取数字大小的函数
  const getNumberSize = (size: SizeType) => {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
  };

  // 计算水平和垂直大小
  const [horizontalSize, verticalSize] = useMemo(() => {
    // 将size转换为数组形式
    let sizeArr: [SizeType, SizeType];
    if (Array.isArray(size)) {
      sizeArr = size;
    } else {
      sizeArr = [size, size];
    }
    // 返回大小数组
    return sizeArr.map(item => getNumberSize(item));
  }, [size]);

  // 应用水平和垂直空间的样式
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  // 如果启用了wrap，则应用flex wrap样式
  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  // 将children转换为节点数组
  const childNodes = Children.toArray(children);

  // 映射子节点并在它们之间插入分隔元素
  const nodes = Children.map(childNodes, (child, i) => {
    return (
      <>
        <div className='space-item'>{child}</div>
        {i < childNodes.length - 1 && split}
      </>
    );
  });

  // 返回带有计算样式和子节点的Space组件
  return (
    <div className={classNames} style={{ ...style, ...otherStyles }} {...rest}>
      {nodes}
    </div>
  );
};

export default Space;

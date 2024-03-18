import React, { forwardRef, PropsWithChildren } from 'react';

import cs from 'classnames'; // 导入一个用于条件性地连接类名的实用工具。

import './index.scss'; // 导入样式。

// 定义图标 props 的基本类型。
type BaseIconProps = {
  className?: string; // 图标的可选类名。
  style?: React.CSSProperties; // 图标的内联样式对象。
  size?: string | string[]; // 图标的尺寸，可以是字符串或字符串数组。
  spin?: boolean; // 用于确定图标是否旋转的布尔标志。
};

// 将基本图标 props 与 SVG 属性组合，同时排除冲突的 props。
export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

// 根据提供的图标大小计算尺寸的函数。
export function getSize(size: IconProps['size']) {
  if (Array.isArray(size) && size.length === 2) {
    return size; // 如果尺寸是包含两个值的数组，则直接返回。
  }

  const width = (size as string) || '1em'; // 如果未提供或尺寸无效，则默认宽度为 '1em'。
  const height = (size as string) || '1em'; // 如果未提供或尺寸无效，则默认高度为 '1em'。

  return [width, height]; // 返回宽度和高度的数组。
}

// 使用 forwardRef 创建 Icon 组件，以便将 ref 传递给底层的 SVG 元素。
const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const { style, className, spin, size = '1em', children, ...rest } = props; // 解构 props。
  const classnames = cs('icon', { 'icon-spin': spin }, className); // 使用 'cs' 实用工具构造类名。
  const [width, height] = getSize(size); // 根据提供的尺寸计算宽度和高度。
  return (
    <svg className={classnames} style={style} width={width} height={height} fill='currentColor' ref={ref} {...rest}>
      {children} {/* 在 SVG 中渲染任何子组件。 */}
    </svg>
  );
});

export default Icon; // 默认导出 Icon 组件。

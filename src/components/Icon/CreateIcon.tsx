import React, { forwardRef } from 'react';

import Icon, { IconProps } from '.'; // 导入 Icon 组件和 IconProps 类型。

// 定义 CreateIconOptions 接口，用于创建图标的选项。
interface CreateIconOptions {
  content: React.ReactNode; // 图标内容，可以是任意 React 节点。
  iconProps?: IconProps; // 图标的 props，类型为 IconProps。
  viewBox?: string; // SVG 视图框，字符串格式。
}

// 创建 CreateIcon 函数，用于生成图标组件。
function CreateIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options; // 解构选项对象，设置默认 viewBox。

  // 使用 forwardRef 创建图标组件，并将 ref 传递给 Icon 组件。
  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {' '}
        {/* 渲染 Icon 组件，并传递相应 props 和 content */}
        {content} {/* 渲染图标内容 */}
      </Icon>
    );
  });
}

export default CreateIcon; // 默认导出 CreateIcon 函数。

import React from 'react';

import Icon, { IconProps } from '.';

// 用于跟踪已加载图标字体脚本的集合。
const loadedSet = new Set<string>();

// 创建一个自定义图标字体组件的函数。
function CreateFrontIconfont(scriptUrl: string) {
  // 检查 scriptUrl 是否为非空字符串且未加载过。
  if (typeof scriptUrl === 'string' && scriptUrl.length && !loadedSet.has(scriptUrl)) {
    // 如果条件符合，动态创建一个脚本元素并将其附加到 body 中。
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);
    loadedSet.add(scriptUrl); // 将脚本 URL 添加到已加载集合中，避免重复加载。
  }

  // 使用 React.forwardRef 创建 Iconfont 组件。
  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props; // 解构 props 以获取图标类型。

    // 使用额外的 props 渲染 Icon 组件，如果提供了类型，则渲染 'use' 元素。
    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });

  return Iconfont; // 返回创建的 Iconfont 组件。
}

export default CreateFrontIconfont; // 导出 CreateFrontIconfont 函数。

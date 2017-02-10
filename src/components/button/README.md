# Button 组件说明
## 作者
储奎
## 组件记录

- 2017/01/17 建立组件文件

- 2017/01/17 完成组件初版本

  - 添加 sass样式表

## 组件API说明

| 属性       | 说明                                       | 类型       | 默认值     |
| -------- | ---------------------------------------- | -------- | ------- |
| type     | 设置按钮类型，可选值为 `primary` `default` `link` 或者不设 | string   | default |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string   | button  |
| icon     | 设置按钮的图标类型                                | string   | -       |
| shape    | 设置按钮形状，可选值为 `circle` 或者不设                | string   | -       |
| size     | 设置按钮大小，可选值为 `small` `large` 或者不设         | string   | default |
| loading  | 设置按钮载入状态                                 | boolean  | false   |
| onClick  | `click` 事件的 handler                      | function | -       |

## 示例

```react
         <Button type='primary' size='large' onClick={() => { window.alert('btn') }}>
              按钮
              </Button>
```
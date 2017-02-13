# 模态框组件说明 Modal

## 作者

储奎

## 组件记录

- 2017/02/06 创建Modal组件
- 2017/02/08 第一次提交
- 2017/02/13 添加ModalFrame组件默认footer

## 组件API说明

### 基础模态框 ModalFrame

| 属性       | 说明                            | 类型            | 默认值   |
| -------- | ----------------------------- | ------------- | ----- |
| title    | 标题                            | string        | -     |
| visible  | 是否隐藏模态框                       | bool          | false |
| closable | 是否含有右上角关闭按钮,若有则需要onCancel处理函数 | bool          | false |
| footer   | 模态框底部按钮区域                     | React.Element | null  |
| onOk     | 确定事件处理函数                      | function      | -     |
| onCancel | 关闭/取消事件处理函数                   | function      | -     |

### 对话框 Dialog

由基础模态框ModalFrame包裹，ModalFrame基础属性基本支持。

| 属性       | 说明                                       | 类型       | 默认值  |
| -------- | ---------------------------------------- | -------- | ---- |
| type     | 类型，可选值有`confirm`,`success`,`info`,`warning`,`error` | string   | info |
| title    | 对话标题                                     | string   | -    |
| content  | 对话内容                                     | string   | -    |
| onOk     | 确定处理函数                                   | function | -    |
| onCancel | 取消处理函数,只有`type`为`confirm`才可用             | function | -    |

**注意**

基础模态框

- 采用`css` `display:none`隐藏

对话框

- 采用销毁`DOM`来隐藏
- 只有`type`为`confirm`才有双按钮，即确定和取消按钮，其他一律只有一个确定按钮
- 两者调用方式不同，建议采用示例代码风格来调用

都支持异步处理。

## 示例

基础模态框：

``` react
<ModalFrame title='this is md-modal' visible={this.state.showModal} closable onCancel={() => { this.setState({ showModal: false }) }}>
          <p>this is p tag</p>
        </ModalFrame>
```

对话框：

``` react
<Button onClick={() => {
          Dialog({
            onOk: () => {
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              }).catch(() => console.log('Oops errors!'))
            },
            type: 'error',
            title: 'error',
            content: 'this is error content'})
        }}>
          异步
          </Button>
```


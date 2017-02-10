# 模态框Modal

## 模态框类型 type

1. 基本模态框 Modal

   > 提供基本浮动层，用来提供用户处理事务

   由ModalFrame提供框架，基本模态框内容放在props.children中。

2. 对话框 Dialog

   由ModalFrame提供框架，对话内容由各子组件提供暴露点（title、conten...）等，各类型的对话框最终由属性type决定。

   1. 确认框 confirm

      > 提示用户进行确认操作，可进行取消 / 确定操作。

   2. 弹出提示框 alert

      弹出式模态框应该只有确定按钮，用户只有唯一操作。

      1. 成功 success

         > 成功提示信息

      2. 警告 warning

         > 警告提示信息

      3. 错误 error

         > 错误提示信息

      4. 信息提示 info

         > 普通提示信息


## 模态框基本组件 ModalFrame

应该提供模态框基本框架，基础要素有

1. 关闭功能（销毁、隐藏）close

2. 确定按钮 ok

3. 取消按钮 cancel

4. 内容体 content

5. 标题 title

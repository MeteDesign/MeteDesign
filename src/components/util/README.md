shallowequal.js
用途：对象的浅对比
pureRenderMixin.js
用途：如果你的React组件渲染函数是“pure”，
当给它提供相同的state和porps时，它将不会重新渲染，从而提升性能。
例子：
```
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}
```
注意:
https://facebook.github.io/react/docs/pure-render-mixin.html
This only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only mix into components which have simple props and state, or use forceUpdate() when you know deep data structures have changed. Or, consider using immutable objects to facilitate fast comparisons of nested data.
Furthermore, shouldComponentUpdate skips updates for the whole component subtree. Make sure all the children components are also "pure".
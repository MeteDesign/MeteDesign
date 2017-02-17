import React from 'react';
import { PropTypes } from 'react';
import classNames from 'classnames';
import createDOMForm from './createDOMForm';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import omit from 'lodash/omit';
// import assign from 'object-assign';
import warning from 'warning';
import FormItem from './formItem.jsx';

import { FIELD_META_PROP } from './constants';
import './style/'

export default class Form extends React.Component {
    static defaultProps = {
        prefixCls: 'md-form',
        hideRequiredMark: false,
        onSubmit(e) {
            e.preventDefault();
        }
    }
    static propTypes = {
        prefixCls: React.PropTypes.string,
        vertical: React.PropTypes.bool,
        horizontal: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        children: React.PropTypes.any,
        onSubmit: React.PropTypes.func,
        hideRequiredMark: React.PropTypes.bool,
    };

    static childContextTypes = {
        vertical: PropTypes.bool,
    };

    static Item = FormItem;

    static create = (options) => {
        const formWrapper = createDOMForm(Object.assign({
            fieldNameProp: 'id',
        }, options, {
                fieldMetaProp: FIELD_META_PROP,
            }));

        /* eslint-disable react/prefer-es6-class */
        return (Component) => formWrapper(class HOC extends React.Component {
            static propTypes = {
                form: PropTypes.object.isRequired,
            }
            static childContextTypes = {
                form: PropTypes.object.isRequired,
            }
            getChildContext() {
                return {
                    form: this.props.form,
                };
            }
            componentWillMount() {
                this.__getFieldProps = this.props.form.getFieldProps;
            }
            deprecatedGetFieldProps(name, option) {
                warning(
                    false,
                    '`getFieldProps` is not recommended, please use `getFieldDecorator` instead, ' +
                    'see: http://u.ant.design/get-field-decorator'
                );
                return this.__getFieldProps(name, option);
            }
            render() {
                this.props.form.getFieldProps = this.deprecatedGetFieldProps;

                const withRef = {};
                if (options && options.withRef) {
                    withRef.ref = 'formWrappedComponent';
                }
                return <Component {...this.props} {...withRef} />;
            }
        }
        )
    }

    constructor(props) {
        super(props)

        warning(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
    }

    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }

    getChildContext() {
        return {
            vertical: this.props.vertical,
        };
    }

    render() {
        const { prefixCls, hideRequiredMark, className = '', inline, horizontal, vertical } = this.props;
        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: horizontal,
            [`${prefixCls}-vertical`]: vertical,
            [`${prefixCls}-inline`]: inline,
            [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
        }, className);

        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'inline',
            'horizontal',
            'vertical',
            'form',
            'hideRequiredMark',
        ]);

        return <form {...formProps} className={formClassName} />;
    }
}

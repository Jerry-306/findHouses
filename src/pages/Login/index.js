import React, { Component } from 'react'

import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'
// 引入withFormik高阶组件，用于表单校验
import { withFormik, Form, Field, ErrorMessage } from 'formik'
// 导入yup
import * as yup from 'yup'

import API from '../../utils/api'
import MyNavBar from '../../components/MyNavBar'

import styles from './index.module.css'

// 校验规则
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;
class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <div className={styles.root}>
                <MyNavBar className={styles.navHeader} >
                    账号登录
                </MyNavBar>
                <WhiteSpace size="x1" />

                {/* 登录表单 */}
                {/* 左右留白 */}
                <WingBlank>
                    <Form className={styles.form} >
                        <div className={styles.formItem}>
                            <Field 
                                className={styles.input} 
                                name="username" 
                                placeholder="请输入账号" 
                            ></Field>
                        </div>
                        <ErrorMessage className={styles.error} name="username" component="div"></ErrorMessage>
                        <div className={styles.formItem}>
                            <Field 
                                className={styles.input} 
                                name="password" 
                                type="password"
                                placeholder="请输入密码" 
                            ></Field>
                        </div>
                        <ErrorMessage className={styles.error} name="password" component="div"></ErrorMessage>
                        <div className={styles.formSubmit}>
                            <button
                                className={styles.submit}
                                type="submit"
                            >登  录</button>
                        </div>
                    </Form>
                    <Flex className={styles.backHome}>
                        <Flex.Item>
                            <Link to="/register">没有账号？去注册</Link>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        )
    }
}


Login = withFormik({
    // 为Login组件提供状态
    mapPropsToValues:() => ({ username: '', password: '' }),
    // 添加校验规则
    validationSchema: yup.object().shape({
        username: yup.string().required('账号必填').matches(REG_UNAME, '账号长度为5~8位，只能由数字、字母、下划线组成'),
        password: yup.string().required('密码必填').matches(REG_PWD, '密码长度为5~12位，只能由数字、字母、下划线组成'),
    }),
    // 为Login提供表单提交方法
    handleSubmit: async ( values, { props } ) => {
        // 获取账号、密码
        const { username, password } = values;
        const res = await API.post('/user/login', {
            username,
            password
        });

        // 获取返回数据
        const { status, body, description } = res.data;
        if ( status === 200 ) {
            // 登录成功
            // 将tolen存储到本地
            localStorage.setItem('zfy_token', body.token);
            props.history.goBack();
        } else {
            // 登录失败
            Toast.info(description, 2, null, false);
        }
    }
})(Login);
export default Login
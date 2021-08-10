import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import { isAuth } from '../../utils/auth'

const alert = Modal.alert;
export default function AuthRoute({component: Component, ...rest }) {
    return <Route
            {...rest}
            render={  props => {
                const isLogin = isAuth();

                if (isLogin) {
                    // 已登录
                    return <Component {...props} />
                } else {
                    // 未登录
                    return <Redirect 
                        to={{
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }} />
                }
            }}
            ></Route>
}

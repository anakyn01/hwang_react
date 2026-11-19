'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import * as S from '../DashBoard.styled';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { RENDER_API_URL } from '@/config/api';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('이메일과 비밀번호를 모두 입력해 주세요');
            return;
        }

        try {
            const response = await axios.post(`${RENDER_API_URL}/api/admin/login`, {
                email, password
            }, { withCredentials: true });

            alert(`${response.data.name}님, ${response.data.message}`);

            localStorage.setItem('userName', response.data.name);
            router.push('/admin');

        } catch (error: any) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('로그인중 오류가 발생했습니다');
            }
        }
    };

    return (
        <>
            <S.Background>
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={10} lg={12} md={9}>
                            <Card className="o-hidden border-0 shadow-lg my-5">
                                <Card.Body className="p-0">
                                    <Row>
                                        <Col lg={6} className="d-none d-lg-block bg-login-image"></Col>
                                        <Col lg={6}>
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">
                                                        Welcome Back!
                                                    </h1>

                                                    <form className="user" onSubmit={handleSubmit}>
                                                        <div className="form-group mb-3">
                                                            <Form.Control
                                                                type="email"
                                                                className="form-control-user"
                                                                placeholder="Enter Email Address..."
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="form-group mb-3">
                                                            <Form.Control
                                                                type="password"
                                                                className="form-control-user"
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>

                                                        {/* 기억하기 체크박스 및 로그인 버튼들 */}
                                                        <div className="form-group my-3 ">
                                                            <div className="custom-control custom-checkbox small">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input form-check-input mx-2"
                                                                    id="customCheck"
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customCheck"
                                                                >
                                                                    Remember Me
                                                                </label>

                                                                <Button
                                                                    variant="primary"
                                                                    type="submit"
                                                                    className="btn-user btn-block w-100 my-3"
                                                                >
                                                                    Login
                                                                </Button>

                                                                <Button
                                                                    variant="primary"
                                                                    type="submit"
                                                                    className="btn-user btn-google btn-block w-100 mb-2"
                                                                >
                                                                    <FontAwesomeIcon icon={faGoogle} className="fa-fw" />
                                                                    Login with Google
                                                                </Button>

                                                                <Button
                                                                    variant="primary"
                                                                    type="submit"
                                                                    className="btn-user btn-facebook btn-block w-100 mb-2"
                                                                >
                                                                    <FontAwesomeIcon icon={faFacebookF} className="fa-fw" />
                                                                    Login with Facebook
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </S.Background>
        </>
    );
}
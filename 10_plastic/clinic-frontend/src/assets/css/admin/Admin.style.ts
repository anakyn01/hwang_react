import styled from 'styled-components';
import { BoxShadow, FlexCenter, FlexColumn, TransitionAll } from './Common.styles';

export * from '../admin/AdminCommon.style';
export * from '../admin/Admin.style';

// 🎯 SB Admin 시그니처: 블루 그라데이션 전체 화면 배경
export const LoginWrapper = styled.div`
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
  min-height: 100vh;
${FlexCenter}
  padding: 20px;
`;

// 🎯 부드러운 그림자가 들어간 화이트 카드
export const LoginCard = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 0.35rem;
  ${BoxShadow}
  width: 100%;
  max-width: 450px;
  padding: 3rem;
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: #3a3b45;
  margin: 0;
`;

export const LoginForm = styled.form`
${FlexColumn}
  gap: 1rem;
`;

// 🎯 SB Admin 시그니처: 알약(Pill) 형태의 둥근 입력창
export const LoginInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 0.8rem;
  border-radius: 10rem; /* 완전히 둥근 모서리 */
  border: 1px solid #d1d3e2;
  color: #6e707e;
  outline: none;
  ${TransitionAll}

  &:focus {
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;

export const CheckboxGroup = styled.div`
${FlexCenter}
  padding-left: 0.5rem;
`;

export const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #858796;
  cursor: pointer;
`;

// 🎯 알약(Pill) 형태의 메인 블루 버튼
export const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  border-radius: 10rem;
  background-color: #4e73df;
  border: 1px solid #4e73df;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
${TransitionAll}
  margin-top: 10px;

  &:hover {
    background-color: #2e59d9;
    border-color: #2653d4;
  }
`;

export const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #e3e6f0;
`;

export const LinkGroup = styled.div`
${FlexCenter}
  gap: 0.5rem;
`;

export const StyledLink = styled.a`
  font-size: 0.8rem;
  color: #4e73df;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #224abe;
  }
`;






export * from './News.styles';
export * from './Self.styles';
export * from './Event.styles';
export * from './Footer.styles';
export * from './User.styles';
export * from './Board.styles';
export * from './Vlog.styles';
export * from './Safety.styles';

export * from './Dash.styles';
export * from './Consult.styles';
export * from './Tone.styles';
export * from './NavSetting.style';
export * from './Pop.styles';
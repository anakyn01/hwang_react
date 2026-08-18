import styled from 'styled-components';

export const Wrapper = styled.div`
width:100%;
`;

export const StepNav = styled.div``;
export const StepItem = 
styled.div<{ $active?: boolean; $hasBorder?:boolean}>``;
export const Container = styled.div``;
export const Title = styled.h2``;
export const Section = styled.div<{ $marginBottom:string}>`

`;
export const SectionTitle = styled.h3``;
export const TermsBox = styled.div<{ $bg:string}>``;
export const CheckboxLabel = styled.label``;
export const Checkbox = styled.input<{$isLarge?:boolean}>``;
export const TotalAgreeText = styled.span``;
export const AgreeText = styled.span``;
export const ButtonGroup = styled.div``;
export const Button = styled.button<{$variant:'primary' | 'secondary'}>``;

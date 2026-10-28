import styled, {css} from 'styled-components';
import { ColorWhite,Flex,Fw600,Fw700 } from './Common.styles';

interface StatusProps {
  status: string;
}

export const StatusBadge = styled.span<StatusProps>`
  background-color: ${(props) => (props.status === '실종' ? '#ff4d4f' : '#52c41a')};
  ${ColorWhite}${Fw700}
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
`;

export const BadgeGroup = styled.div`
  ${Flex}
  gap: 6px;
  margin-bottom: 6px;
`;

export const Badge = styled.span<{ $type?: 'status'|'female' | 'male' | 'unknown' }>`
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid;
  ${Fw600};
  ${({ $type}) => {
      switch($type){
          case 'status': return 'color: #555; border-color: #ccc; background-color: #fff;';
          case 'female': return 'color: #ff6b6b; border-color: #ff6b6b; background-color: #fff;';  
          case 'male': return 'color: #4a90e2; border-color: #4a90e2; background-color: #fff;';  
          case 'unknown': return 'color: #555; border-color: #ccc; background-color: #fff;';  
          default: return 'color: #555; border-color: #ccc; background-color: #fff;';        
      }
  }}
`;

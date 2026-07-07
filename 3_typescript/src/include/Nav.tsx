import * as S from '../css/Main.styles';

const Nav = () => {
    return(
        <>


      <S.Nav>
        <ul>
          <li><S.StyledLink to="/">home</S.StyledLink></li>
          <li><S.StyledLink to="/basic">1_basic</S.StyledLink></li>
          <li><S.StyledLink to="/array">2_arrays</S.StyledLink></li>
          <li><S.StyledLink to="/tuples">3_tuple</S.StyledLink></li>
          <li><S.StyledLink to="/enum">4_enum</S.StyledLink></li>
          <li><S.StyledLink to="/object">5_objectType</S.StyledLink></li>
          <li><S.StyledLink to="/interface">6_interface</S.StyledLink></li>
          <li><S.StyledLink to="/tensor">7_tensorflow</S.StyledLink></li>
          <li><S.StyledLink to="/class">8_classunion</S.StyledLink></li>
          <li><S.StyledLink to="/last">9_last</S.StyledLink></li>
        </ul>
      </S.Nav>  
        
        
        </>
    )
}
export default Nav;
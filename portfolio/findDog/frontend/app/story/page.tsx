'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchStories, setActiveTab, setSubTab, toggleAlert, setDummyStories } from '../redux/storySlice';

import * as S from '@/assets/css/style.styles';

// MUI 아이콘
import {
  NotificationsNone as NotificationsNoneIcon,
  NotificationsOutlined as NotificationsIcon,
  TuneOutlined as FilterIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Plus, MessageSquare, Share2, Eye } from 'lucide-react';
import Footer from '../components/Footer';

export default function StoryPage(){
  const dispatch = useDispatch<AppDispatch>();

  // Redux Store 상태 조회
  const { activeTab, subTab, isAlertOn, storyList, loading } = useSelector((state: RootState) => state.story);

  useEffect(() => {
    const loadStories = async () => {
      const resultAction = await dispatch(fetchStories());
      if (fetchStories.rejected.match(resultAction)) {
        // API 요청 실패 시 더미 데이터 세팅
        dispatch(setDummyStories([
          {
            id: 1,
            category: '입양후기',
            author: 'Crong',
            timeAgo: '2026.10.02',
            title: '우리집 막내 사랑이💕',
            content: '사랑이와 가족이 된지 100일이 지났어요. 그동안 적응하느라 사랑이도 가족들도 쉽지 않았지만 이제는 사랑...',
            images: ['https://placehold.co/140x140'],
            commentsCount: 0,
            sharesCount: 0,
            viewsCount: 0,
            isPick: true
          },
          {
            id: 2,
            category: '입양후기',
            author: '7번째난쟁이',
            timeAgo: '13분 전',
            title: '애기 데려온지 두달차❤️',
            content: '시간이 이렇게 빠르게 흘러 벌써 두달차된 초보 집사입니다😊 처음 봤을때 손바닥만했는데 이렇게 크다니.. 가면 갈수록 더 이뻐지는게 너무 신기하고 아주 이뻐 죽겠어용...',
            images: [
              'https://placehold.co/120x120',
              'https://placehold.co/120x120',
              'https://placehold.co/120x120'
            ],
            commentsCount: 0,
            sharesCount: 3,
            viewsCount: 12,
            isPick: false
          }
        ]));
      }
    };

    loadStories();
  }, [dispatch]);

  return(
    <S.AppWrapper>
      <S.Container>
        
        {/* 상단 헤더 */}
        <S.Header>
          <S.Logo>어서찾아주개</S.Logo>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <NotificationsNoneIcon fontSize="large" style={{ cursor: 'pointer' }} />
          </div>
        </S.Header>

        {/* 1차 탭 메뉴 */}
        <S.TabContainer>
          {['입양이야기', '입양 / 임보', '봉사', '어서찾아주개 정보'].map((tab) => (
            <S.TabBtn
              key={tab}
              $active={activeTab === tab}
              onClick={() => dispatch(setActiveTab(tab))}
            >
              {tab}
            </S.TabBtn>
          ))}
        </S.TabContainer>

        {/* 2차 서브 탭 메뉴 */}
        <div style={{ display: 'flex', gap: '16px', padding: '12px 16px', backgroundColor: '#fff', fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #f1f3f5' }}>
          {['전체', '입양후기', '일상공유', '고민상담'].map((sub) => (
            <span
              key={sub}
              onClick={() => dispatch(setSubTab(sub))}
              style={{
                cursor: 'pointer',
                color: subTab === sub ? '#ff7a00' : '#888',
                borderBottom: subTab === sub ? '2px solid #ff7a00' : 'none',
                paddingBottom: '4px'
              }}
            >
              {sub}
            </span>
          ))}
        </div>

        {/* 필터 및 정렬 바 */}
        <S.FilterContainer style={{ borderBottom: 'none', paddingBottom: '8px' }}>
          <S.FilterSelect defaultValue="allArea">
            <option value="allArea">모든 지역</option>
          </S.FilterSelect>

          <S.FilterSelect defaultValue="latest">
            <option value="latest">최신순</option>
          </S.FilterSelect>
          
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', color: '#888', cursor: 'pointer' }}>
            <span style={{ fontSize: '18px' }}>🔲</span>
            <span style={{ fontSize: '18px' }}>☰</span>
          </div>
        </S.FilterContainer>

        {/* 실시간 알림 토글배너 */}
        <S.AlertBanner style={{ marginTop: '4px', marginBottom: '8px' }}>
          <S.AlertInfo>
            <div className="icon-circle">
              <NotificationsIcon sx={{}} />
            </div>
            <div className="text-group">
              <strong>이 카테고리 실시간 알림</strong>
              <span>새 글이 올라오면 알려드려요</span>
            </div>
          </S.AlertInfo>
          <S.ToggleBtn
            $isOn={isAlertOn}
            onClick={() => dispatch(toggleAlert())}
          >
            <div className='handle' />
          </S.ToggleBtn>
        </S.AlertBanner>

        <S.Divider />

        {/* 스토리 피드 리스트 */}
        <div style={{ paddingBottom: '30px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              스토리를 불러오는 중입니다...
            </div>
          ) : storyList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              등록된 스토리가 없습니다.
            </div>
          ) : (
            storyList.map((post) => (
              <div key={post.id} style={{ backgroundColor: '#fff', borderBottom: '8px solid #f8f9fa', padding: '16px' }}>
                
                {post.isPick ? (
                  <div style={{ backgroundColor: '#fff5eb', borderRadius: '12px', padding: '12px', border: '1px solid #ffe8d6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ backgroundColor: '#ff7a00', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>
                        어서찾아주개 Pick
                      </span>
                      <span style={{ fontSize: '11px', color: '#888' }}>{post.timeAgo}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img 
                        src={post.images[0]} 
                        alt="Pick" 
                        style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#222', marginBottom: '4px' }}>
                          {post.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.content}
                        </div>
                        <div style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>
                          👤 {post.author}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e4e5e7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#555' }}>
                          👤
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{post.author}</div>
                          <div style={{ fontSize: '10px', color: '#aaa' }}>사지말고 입양하세요.</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#999' }}>{post.timeAgo}</span>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111', marginBottom: '6px' }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.4', marginBottom: '12px' }}>
                      {post.content}
                    </div>

                    {post.images && post.images.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto' }}>
                        {post.images.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt={`img-${idx}`} 
                            style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }} 
                          />
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#888', borderTop: '1px solid #f1f3f5', paddingTop: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={14} /> {post.commentsCount}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Share2 size={14} /> {post.sharesCount}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={14} /> {post.viewsCount}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        {/* 글쓰기 플로팅 버튼 */}
        <S.FloatingWriteButton>
          <Plus size={20} color="#fff" />
          <span>글쓰기</span>
        </S.FloatingWriteButton>

        <Footer />
      </S.Container>
    </S.AppWrapper>        
  );
}
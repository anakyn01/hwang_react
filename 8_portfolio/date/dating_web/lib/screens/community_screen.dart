import 'package:flutter/material.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  // 🎨 테마 색상
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 탭 카테고리 상태 관리
  int _selectedCategoryIndex = 0;
  final List<String> categories = ['전체', '연애 고민', '데이트 코스', '자유'];

  // 📝 커뮤니티 게시글 더미 데이터
  final List<Map<String, dynamic>> posts = [
    {
      'name': '별빛소나타',
      'time': '2분 전',
      'avatar': '🌸',
      'avatarColor': Colors.pink[200],
      'category': '연애 고민',
      'categoryColor': const Color(0xFF5D2A42), // 어두운 핑크 배경
      'categoryTextColor': const Color(0xFFFF6699),
      'content': '첫 데이트 장소 추천해주세요! 홍대 근처에서 조용하고 분위기 좋은 카페 아시는 분 💕',
      'hasImage': true,
      'likes': 24,
      'comments': 8,
    },
    {
      'name': '파란하늘',
      'time': '15분 전',
      'avatar': '🌊',
      'avatarColor': Colors.blue[200],
      'category': '데이트 코스',
      'categoryColor': const Color(0xFF1E3A5F), // 어두운 파랑 배경
      'categoryTextColor': Colors.lightBlueAccent,
      'content': '성수동 데이트 코스 공유해요 🗺️ 카페 → 전시회 → 한강 피크닉 완벽한 하루였어요!',
      'hasImage': false,
      'likes': 47,
      'comments': 12,
    },
    {
      'name': '초록바람',
      'time': '1시간 전',
      'avatar': '🌿',
      'avatarColor': Colors.green[200],
      'category': '자유',
      'categoryColor': const Color(0xFF1E4D2B), // 어두운 초록 배경
      'categoryTextColor': Colors.greenAccent,
      'content': '다들 주말에 보통 뭐하시나요? 날씨가 좋아서 어디든 나가고 싶네요 ☀️',
      'hasImage': false,
      'likes': 15,
      'comments': 3,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        elevation: 0,
        title: const Text(
          '커뮤니티',
          style: TextStyle(
              fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        actions: [
          // ✏️ 글쓰기 버튼
          Container(
            margin: const EdgeInsets.only(right: 20, top: 10, bottom: 10),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [pinkAccent, purpleAccent],
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(20),
                onTap: () {
                  print("글쓰기 클릭됨");
                },
                child: const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 0),
                  child: Center(
                    child: Text(
                      '✏️ 글쓰기',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 14),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          _buildCategoryFilters(),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.separated(
              itemCount: posts.length,
              separatorBuilder: (context, index) => Divider(
                color: cardColor,
                thickness: 1,
                height: 1,
              ),
              itemBuilder: (context, index) {
                return _buildPostItem(posts[index]);
              },
            ),
          ),
        ],
      ),
    );
  }

  // 📌 상단 카테고리 필터 (가로 스크롤)
  Widget _buildCategoryFilters() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Row(
        children: List.generate(categories.length, (index) {
          bool isSelected = _selectedCategoryIndex == index;
          return GestureDetector(
            onTap: () {
              setState(() => _selectedCategoryIndex = index);
            },
            child: Container(
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                gradient: isSelected
                    ? LinearGradient(
                        colors: [pinkAccent, purpleAccent],
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                      )
                    : null,
                color: isSelected ? null : cardColor,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? Colors.transparent : subTextColor.withOpacity(0.2),
                ),
              ),
              child: Text(
                categories[index],
                style: TextStyle(
                  color: isSelected ? Colors.white : subTextColor,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  fontSize: 14,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  // 📝 개별 게시글 리스트 아이템
  Widget _buildPostItem(Map<String, dynamic> post) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. 작성자 정보 및 카테고리 뱃지
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: post['avatarColor'],
                child: Text(post['avatar'], style: const TextStyle(fontSize: 18)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      post['name'],
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      post['time'],
                      style: TextStyle(color: subTextColor, fontSize: 12),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: post['categoryColor'],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  post['category'],
                  style: TextStyle(
                    color: post['categoryTextColor'],
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          // 2. 본문 내용
          Text(
            post['content'],
            style: const TextStyle(color: Colors.white, fontSize: 15, height: 1.4),
          ),
          const SizedBox(height: 16),
          
          // 3. 첨부 이미지 (있을 경우만 렌더링)
          if (post['hasImage'] == true) ...[
            Container(
              width: double.infinity,
              height: 160,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: const LinearGradient(
                  colors: [Color(0xFF6B82FF), Color(0xFF8B62FF)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Center(
                child: Text('☕', style: TextStyle(fontSize: 32)),
              ),
            ),
            const SizedBox(height: 16),
          ],
          
          // 4. 하단 액션 버튼 (좋아요, 댓글, 공유)
          Row(
            children: [
              Icon(Icons.favorite, color: pinkAccent, size: 18),
              const SizedBox(width: 4),
              Text(post['likes'].toString(),
                  style: TextStyle(color: pinkAccent, fontSize: 13)),
              const SizedBox(width: 16),
              
              Icon(Icons.chat_bubble_outline, color: subTextColor, size: 18),
              const SizedBox(width: 4),
              Text(post['comments'].toString(),
                  style: TextStyle(color: subTextColor, fontSize: 13)),
              const SizedBox(width: 16),
              
              Icon(Icons.link, color: subTextColor, size: 18),
              const SizedBox(width: 4),
              Text('공유', style: TextStyle(color: subTextColor, fontSize: 13)),
            ],
          ),
        ],
      ),
    );
  }
}
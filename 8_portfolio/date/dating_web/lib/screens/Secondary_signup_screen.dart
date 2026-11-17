import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';


import 'package:daum_postcode_search/daum_postcode_search.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:kpostal/kpostal.dart';

import '../main.dart';

class SecondarySignupScreen extends StatefulWidget{
  final int userId;
  const SecondarySignupScreen({super.key, required this.userId});
  @override
  State<SecondarySignupScreen> createState() => _SecondarySignupScreenState();

}

class _SecondarySignupScreenState extends State<SecondarySignupScreen>{
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;

  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _jobController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();

String get _apiUrl {
  if (kIsWeb) return 'http://localhost:3000';
  if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000';
  return 'http://localhost:3000';
}

//다음
// 👉 웹과 앱 모두에서 에러 없이 열리는 주소 검색 함수
  Future<void> _searchAddress() async {
    try {
      Kpostal? result = await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => KpostalView(
            // 웹 환경에서 카카오 주소 API가 정상 작동하도록 돕는 옵션
            useLocalServer: false, 
          ),
        ),
      );

      // 검색 후 사용자가 주소를 선택했다면 텍스트창에 채워넣기
      if (result != null) {
        setState(() {
          _addressController.text = result.address;
        });
      }
    } catch (e) {
      print('주소 검색창 호출 에러: $e');
    }
  }

Future<void> _submitData() async {
  if(_phoneController.text.isEmpty || _jobController.text.isEmpty || _addressController.text.isEmpty){
ScaffoldMessenger.of(context).showSnackBar(
const SnackBar(content: Text('모든 정보를 입력해 주세요.')));
    return;
  }
try{
final response = await http.patch(
Uri.parse('$_apiUrl/api/users/${widget.userId}/secondary-signup'),
headers:{'Content-Type':'application/json'},
body:jsonEncode({
'phone_number':_phoneController.text.trim(),
'occupation':_jobController.text.trim(),
'address':_addressController.text.trim(),  
}),
);

final data = jsonDecode(response.body);
if(response.statusCode == 200 && data['success'] == true){
  if(!mounted) return;
  Navigator.pushReplacement(
    context, 
MaterialPageRoute(builder: (context) => const RootScreen()),   
);
}else{
  if(!mounted) return;
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(data['message'] ?? '저장 실패')));
}
}catch(e) {
ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(content: Text('서버 통신 에러가 발생햇습니다')));
}
}

@override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text('추가 정보 입력', style: TextStyle(color: textColor, fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              '관리자 승인이 완료되었습니다!\n원활한 매칭을 위해 추가 정보를 입력해주세요.',
              style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, height: 1.5),
            ),
            const SizedBox(height: 40),

            _buildLabel('휴대폰 번호'),
            _buildTextField(controller: _phoneController, hint: '- 없이 숫자만 입력', icon: Icons.phone_android, isNumber: true),
            const SizedBox(height: 24),

            _buildLabel('직업'),
            _buildTextField(controller: _jobController, hint: '예) 디자이너, 학생, 회사원', icon: Icons.work_outline),
            const SizedBox(height: 24),

            _buildLabel('거주지 (주소)'),
            Row(
              children: [
                Expanded(
                  child: _buildTextField(
                    controller: _addressController,
                    hint: '주소 검색을 눌러주세요',
                    icon: Icons.map_outlined,
                    isReadOnly: true, // 직접 입력 방지
                  ),
                ),
                const SizedBox(width: 12),
                SizedBox(
                  height: 56,
                  child: ElevatedButton(
                    onPressed: _searchAddress,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: cardColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                        side: BorderSide(color: pinkAccent),
                      ),
                    ),
                    child: Text('검색', style: TextStyle(color: pinkAccent, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 64),

            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _submitData,
                style: ElevatedButton.styleFrom(
                  backgroundColor: pinkAccent,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 5,
                  shadowColor: pinkAccent.withOpacity(0.5),
                ),
                child: const Text('입력 완료하고 시작하기', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(text, style: TextStyle(color: textColor, fontSize: 14, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool isNumber = false,
    bool isReadOnly = false,
  }) {
    return TextField(
      controller: controller,
      readOnly: isReadOnly,
      keyboardType: isNumber ? TextInputType.number : TextInputType.text,
      style: TextStyle(color: textColor, fontSize: 16),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(color: Colors.white30),
        prefixIcon: Icon(icon, color: Colors.white54, size: 20),
        filled: true,
        fillColor: cardColor,
        contentPadding: const EdgeInsets.symmetric(vertical: 20),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: pinkAccent, width: 1.5)),
      ),
    );
  }
}



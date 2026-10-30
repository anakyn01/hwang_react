import 'package:audioplayers/audioplayers.dart';

class BgmPlayer {
  static final BgmPlayer _instance = BgmPlayer._internal();
  factory BgmPlayer() => _instance;
  BgmPlayer._internal();

  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;

  Future<void> playBgm() async {
    if (_isPlaying) return;
    try {
      await _audioPlayer.setReleaseMode(ReleaseMode.loop); // 무한 반복
      // 💡 외부 인터넷 주소 대신 로컬 에셋 파일을 직접 재생 (CORS 문제 제로)
      await _audioPlayer.play(AssetSource('audios/bgm.mp3'));
      _isPlaying = true;
      print("BgmPlayer: 로컬 BGM 재생 성공!");
    } catch (e) {
      print("BGM 재생 에러: $e");
    }
  }

  Future<void> stopBgm() async {
    await _audioPlayer.stop();
    _isPlaying = false;
  }
}
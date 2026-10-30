import 'package:flutter/material.dart';

class SparkLogo extends StatelessWidget {
  final Color pinkAccent;
  final Color purpleAccent;

  const SparkLogo({
    super.key,
    required this.pinkAccent,
    required this.purpleAccent,
  });

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) => LinearGradient(
        colors: [pinkAccent, purpleAccent],
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
      ).createShader(bounds),
      child: const Text(
        'SPARK',
        style: TextStyle(
          color: Colors.white,
          fontSize: 48,
          fontWeight: FontWeight.w900,
          letterSpacing: 2.0,
        ),
      ),
    );
  }
}
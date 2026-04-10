import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../config/api_config.dart';

class AuthProvider with ChangeNotifier {
  static const _tokenKey = 'auth_token';
  static const _nameKey = 'user_name';

  bool _isAuthenticated = false;
  String? _token;
  String? _userName;

  bool get isAuthenticated => _isAuthenticated;
  String? get token => _token;
  String? get userName => _userName;

  late final Future<void> ready;

  AuthProvider() {
    ready = _loadSession();
  }

  Future<void> _loadSession() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    _userName = prefs.getString(_nameKey);
    _isAuthenticated = _token != null && _token!.isNotEmpty;
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    final uri = Uri.parse('${apiBaseUrl}/auth/login');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (res.statusCode != 200) {
      final body = jsonDecode(res.body) as Map<String, dynamic>? ?? {};
      throw Exception(body['message'] ?? 'Login failed (${res.statusCode})');
    }

    final data = jsonDecode(res.body) as Map<String, dynamic>;
    _token = data['token'] as String?;
    _userName = data['name'] as String?;
    if (_token == null || _token!.isEmpty) {
      throw Exception('Invalid response: missing token');
    }

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, _token!);
    if (_userName != null) {
      await prefs.setString(_nameKey, _userName!);
    }

    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> logout() async {
    _token = null;
    _userName = null;
    _isAuthenticated = false;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_nameKey);
    notifyListeners();
  }

  Future<Map<String, dynamic>> search(String query) async {
    if (_token == null || _token!.isEmpty) {
      throw Exception('Not signed in');
    }
    final uri = Uri.parse('${apiBaseUrl}/search').replace(queryParameters: {'q': query});
    final res = await http.get(
      uri,
      headers: {'Authorization': 'Bearer $_token', 'Accept': 'application/json'},
    );
    if (res.statusCode == 401) {
      await logout();
      throw Exception('Session expired. Please sign in again.');
    }
    if (res.statusCode != 200) {
      final body = jsonDecode(res.body) as Map<String, dynamic>? ?? {};
      throw Exception(body['message'] ?? 'Search failed');
    }
    return jsonDecode(res.body) as Map<String, dynamic>;
  }
}

import { FlutterFile } from '../types';

export const FLUTTER_CODEBASE: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    title: 'pubspec.yaml (Project Dependencies)',
    category: 'config',
    code: `name: stoota_app
description: "تطبيق ستوتة - منصة ربط أصحاب الستوتات والبائعين المتجولين بطالبي الخدمات"
publish_to: 'none'
version: 3.1.2+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
    
  # State Management & DI
  flutter_riverpod: ^2.4.9
  riverpod_annotation: ^2.3.3

  # Navigation
  go_router: ^13.1.0

  # Maps & Location GPS
  flutter_map: ^6.1.0
  latlong2: ^0.9.0
  geolocator: ^10.1.0

  # Styling & UI
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9
  cupertino_icons: ^1.0.6
  custom_rating_bar: ^2.0.2

  # Networking & Persistence
  dio: ^5.4.0
  shared_preferences: ^2.2.2
  url_launcher: ^6.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/icons/
    - assets/images/
`
  },
  {
    path: 'lib/main.dart',
    title: 'lib/main.dart (Application Entry Point)',
    category: 'core',
    code: `import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: StootaApp(),
    ),
  );
}

class StootaApp extends ConsumerWidget {
  const StootaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'تطبيق ستوتة العراقي',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'IQ'),
      supportedLocales: const [
        Locale('ar', 'IQ'),
        Locale('en', 'US'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: router,
    );
  }
}
`
  },
  {
    path: 'lib/core/services/location_service.dart',
    title: 'lib/core/services/location_service.dart (GPS Location Service)',
    category: 'core',
    code: `import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';

class LocationService {
  /// Request location permissions and fetch real user GPS position
  static Future<LatLng> getCurrentGpsPosition() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Return default Baghdad Karrada position if GPS disabled
      return const LatLng(33.3007, 44.4200);
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return const LatLng(33.3007, 44.4200);
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return const LatLng(33.3007, 44.4200);
    }

    final pos = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    return LatLng(pos.latitude, pos.longitude);
  }
}
`
  },
  {
    path: 'lib/presentation/screens/landing_screen.dart',
    title: 'lib/presentation/screens/landing_screen.dart (Marketing Landing Page)',
    category: 'presentation',
    code: `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              // Hero Icon Header
              Container(
                height: 80,
                width: 80,
                decoration: BoxDecoration(
                  color: Colors.amber.shade600,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.amber.withOpacity(0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    )
                  ],
                ),
                child: const Center(
                  child: Text('🛺', style: TextStyle(fontSize: 40)),
                ),
              ),
              const SizedBox(height: 24),

              const Text(
                'تطبيق ستوتة 🛺',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.black),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'منصة ربط البائعين المتجولين وأصحاب الستوتات بطالبي الخدمات في العراق تتبع مباشر بالـ GPS',
                style: TextStyle(fontSize: 14, color: Colors.grey.shade700, height: 1.5),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),

              // Action Options
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber.shade600,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                icon: const Icon(Icons.two_wheeler_rounded),
                label: const Text('انضم كصاحب ستوتة (صاحب عمل)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                onPressed: () {
                  context.go('/auth?role=driver');
                },
              ),
              const SizedBox(height: 12),

              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                icon: const Icon(Icons.person_pin_circle_rounded),
                label: const Text('تسجيل كطالب خدمة (زبون)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                onPressed: () {
                  context.go('/auth?role=customer');
                },
              ),
              const SizedBox(height: 12),

              TextButton(
                onPressed: () {
                  context.go('/map');
                },
                child: const Text('دخول الخريطة المباشرة فوراً كزائر'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/presentation/screens/auth_screen.dart',
    title: 'lib/presentation/screens/auth_screen.dart (Role Onboarding & Registration)',
    category: 'presentation',
    code: `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AuthScreen extends StatefulWidget {
  final String role;
  const AuthScreen({super.key, required this.role});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController(text: '0770');
  final _areaController = TextEditingController(text: 'بغداد - الكرادة');
  final _facebookController = TextEditingController();
  String _selectedCategory = 'ماء أرو (RO Water)';

  @override
  Widget build(BuildContext context) {
    final isDriver = widget.role == 'driver';

    return Scaffold(
      appBar: AppBar(
        title: Text(isDriver ? 'تسجيل صاحب ستوتة' : 'تسجيل زبون جديد'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'الاسم الكامل *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),

            TextField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: 'رقم الهاتف العراقي *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),

            if (isDriver) ...[
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                decoration: const InputDecoration(
                  labelText: 'نوع البضاعة والخدمة *',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'ماء أرو (RO Water)', child: Text('💧 ماء أرو')),
                  DropdownMenuItem(value: 'قناني غاز', child: Text('🔥 قناني غاز')),
                  DropdownMenuItem(value: 'عتيك بضاعة', child: Text('📦 عتيك بضاعة')),
                  DropdownMenuItem(value: 'مخضر وفاكهة', child: Text('🥦 مخضر وفاكهة')),
                  DropdownMenuItem(value: 'ركي وبطيخ', child: Text('🍉 ركي وبطيخ')),
                  DropdownMenuItem(value: 'دجاج حي', child: Text('🐔 دجاج حي')),
                  DropdownMenuItem(value: 'حلويات وغزل البنات', child: Text('🍬 حلويات وغزل البنات')),
                ],
                onChanged: (val) {
                  if (val != null) setState(() => _selectedCategory = val);
                },
              ),
              const SizedBox(height: 16),

              TextField(
                controller: _areaController,
                decoration: const InputDecoration(
                  labelText: 'منطقة العمل الرئيسية',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: _facebookController,
                decoration: const InputDecoration(
                  labelText: 'رابط صفحة الفيس بوك (اختياري)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 24),
            ],

            ElevatedButton(
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: Colors.amber.shade600,
                foregroundColor: Colors.black,
              ),
              onPressed: () {
                if (isDriver) {
                  context.go('/driver-dashboard');
                } else {
                  context.go('/map');
                }
              },
              child: Text(
                isDriver ? 'إنشاء حساب صاحب عمل وتلقي الطلبات' : 'الانتقال للترشيح المباشر بالخريطة',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
            )
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/presentation/screens/driver_dashboard_screen.dart',
    title: 'lib/presentation/screens/driver_dashboard_screen.dart (Driver Control Mode)',
    category: 'presentation',
    code: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/stoota_provider.dart';

class DriverDashboardScreen extends ConsumerWidget {
  const DriverDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isOnline = ref.watch(driverStatusProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('لوحة سائق الستوتة المباشرة'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Status Toggle Card
            Card(
              color: isOnline ? Colors.green.shade50 : Colors.red.shade50,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Icon(
                      isOnline ? Icons.sensors_outlined : Icons.sensors_off_outlined,
                      size: 48,
                      color: isOnline ? Colors.green.shade700 : Colors.red.shade700,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      isOnline ? 'حالة العمل: متصل أونلاين على الخريطة' : 'حالة العمل: غير متصل',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isOnline ? Colors.green.shade900 : Colors.red.shade900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      isOnline
                          ? 'موقعك يظهر الآن للزبائن القريبين ضمن مدى الجي بي إس'
                          : 'قم بتشغيل وضع العمل عند بدء جولتك بالشارع',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 13, color: Colors.black54),
                    ),
                    const SizedBox(height: 16),
                    SwitchListTile(
                      title: const Text('تفعيل بث الموقع للزبائن (GPS)'),
                      value: isOnline,
                      onChanged: (val) {
                        ref.read(driverStatusProvider.notifier).toggleOnline(val);
                      },
                    )
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/presentation/screens/customer_map_screen.dart',
    title: 'lib/presentation/screens/customer_map_screen.dart (Customer Live Map View)',
    category: 'presentation',
    code: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/stoota_provider.dart';

class CustomerMapScreen extends ConsumerWidget {
  const CustomerMapScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vendors = ref.watch(nearbyVendorsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('خريطة الستوتات المباشرة 📍'),
      ),
      body: Stack(
        children: [
          Container(
            color: Colors.blueGrey.shade100,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.map_outlined, size: 64, color: Colors.blueGrey.shade400),
                  const SizedBox(height: 12),
                  const Text('خريطة الـ GPS المباشرة (نطاق 2 كم)'),
                  const SizedBox(height: 8),
                  Text('عدد الستوتات القريبة المتصلة: \${vendors.length}'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
`
  }
];

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <!-- เพิ่ม tag สำหรับ csrf token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- เพิ่ม meta tag เพื่อบังคับ HTTPS -->
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    {{-- การเรียกใช้ route ของ ziggy  --}}
    @routes

    {{-- การทำ hot reload --}}
    @viteReactRefresh

    {{-- การเรียกใช้ component ของ react--}}
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    
    {{-- การเรียกใช้ head ของ inertia --}}
    @inertiaHead
  </head>
  <body>
    {{-- การเรียกใช้ component ของ react --}}
    @inertia
  </body>
</html>
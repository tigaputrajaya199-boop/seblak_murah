#!/usr/bin/env python3
"""
Server sederhana untuk menjalankan Website Seblak Juara UMKM
Jalankan dengan perintah: python3 server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Format log yang rapi di terminal
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def main():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("  🌶️ WEBSITE SEBLAK JUARA UMKM BERHASIL DIJALANKAN!")
        print("=" * 60)
        print(f"  👉 Buka di browser: {url}")
        print("  👉 Tekan Ctrl+C di terminal untuk menghentikan server.")
        print("=" * 60)
        
        # Coba buka browser secara otomatis
        try:
            webbrowser.open(url)
        except Exception:
            pass
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server dihentikan. Terima kasih!")

if __name__ == "__main__":
    main()

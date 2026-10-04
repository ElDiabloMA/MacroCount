# MacroCount - Desktop Wrapper & Local Server (app.py)

import os
import sys
import socket
import threading
import webbrowser
import http.server
import socketserver

# Determina la cartella in cui risiede lo script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_free_port():
    """Trova una porta TCP libera sul localhost."""
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port

class SilentHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Gestore HTTP che silenzia i log in console."""
    def log_message(self, format, *args):
        pass

def run_server(port):
    """Avvia il server web locale nella cartella del progetto."""
    os.chdir(BASE_DIR)
    handler = SilentHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(('127.0.0.1', port), handler) as httpd:
            print(f"[MacroCount] Server locale avviato su http://127.0.0.1:{port}")
            httpd.serve_forever()
    except Exception as e:
        print(f"[ERRORE] Impossibile avviare il server web: {e}")

def main():
    port = get_free_port()
    
    # Avvia il server in un thread separato (daemon)
    server_thread = threading.Thread(target=run_server, args=(port,), daemon=True)
    server_thread.start()
    
    url = f"http://127.0.0.1:{port}/index.html"
    
    # Controlla se è richiesto l'avvio forzato nel browser
    force_browser = '--browser' in sys.argv
    
    # Tenta di avviare la finestra nativa pywebview
    webview_launched = False
    if not force_browser:
        try:
            import webview
            print("[MacroCount] Avvio della finestra desktop nativa (pywebview)...")
            webview.create_window(
                title='MacroCount - Calcolatore di Alimenti',
                url=url,
                width=1150,
                height=820,
                resizable=True,
                min_size=(900, 650)
            )
            webview.start()
            # Se start termina senza eccezioni, impostiamo a True
            webview_launched = True
        except ImportError:
            print("\n[INFO] La libreria 'pywebview' non è installata.")
        except Exception as e:
            print(f"\n[INFO] Impossibile avviare la finestra desktop nativa: {e}")
    else:
        print("[INFO] Avvio forzato nel browser web richiesto...")
        
    if not webview_launched:
        # Se fallisce, avvia nel browser di default
        print("[INFO] Avvio in corso nel browser web predefinito...")
        webbrowser.open(url)
        print(f"\n>>> L'applicazione è aperta su: {url}")
        print(">>> Premi Ctrl+C in questa finestra per chiudere il server.\n")
        
        # Mantieni attivo il thread principale visto che il server è su un thread daemon
        try:
            import time
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nSpegnimento dell'applicazione...")

if __name__ == '__main__':
    main()

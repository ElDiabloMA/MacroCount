@echo off
title MacroCount App Launcher
echo ===================================================
echo             MacroCount App Launcher
echo ===================================================
echo.
echo Avvio in corso di MacroCount...
echo.

rem Verifica se Python e installato
where python >nul 2>nul
if errorlevel 1 goto NO_PYTHON

echo Seleziona la modalita di avvio:
echo [1] Avvia come App Desktop (Finestra Dedicata)
echo [2] Avvia nel Browser Web (Consigliato in caso di problemi)
echo.
set /p choice="Inserisci il numero della tua scelta (1 o 2, default 1): "

if "%choice%"=="2" goto LAUNCH_BROWSER
goto LAUNCH_DESKTOP

:LAUNCH_BROWSER
echo.
echo Avvio dell'applicazione nel browser...
python app.py --browser
goto END

:LAUNCH_DESKTOP
rem Verifica se pywebview e installato
python -c "import webview" >nul 2>nul
if not errorlevel 1 goto START_DESKTOP

echo.
echo [MacroCount] Tentativo di installazione di 'pywebview' per l'interfaccia desktop nativa...
echo (Questo passaggio avviene solo al primo avvio ed e facoltativo)
echo.
python -m pip install pywebview --quiet

rem Ricontrolla se l'installazione e andata a buon fine
python -c "import webview" >nul 2>nul
if not errorlevel 1 goto START_DESKTOP

echo.
echo [INFO] Impossibile installare 'pywebview' (nessuna connessione o restrizioni).
echo L'app verra avviata nel tuo browser web predefinito in modalita di fallback.
echo.

:START_DESKTOP
echo.
echo Avvio dell'applicazione...
python app.py
goto END

:NO_PYTHON
echo [ERRORE] Python non e installato o non e configurato nel PATH.
echo Scarica e installa Python da: https://www.python.org/
echo Ricordati di spuntare la casella "Add Python to PATH" durante l'installazione.
echo.
pause
exit /b 1

:END
echo.
echo L'applicazione e stata arrestata.
pause

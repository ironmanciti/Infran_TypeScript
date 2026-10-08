# Read demo code aloud line by line.
# Usage: powershell -ExecutionPolicy Bypass -File narrate.ps1 -File <ts file> -Narration <narration txt>
# Narration file format (UTF-8): one "lineNumber|text" per row.
# -Line <n>: read only the row for code line n.
param([string]$File, [string]$Narration, [int]$Line = 0)

Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice = $s.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Culture.Name -eq 'ko-KR' } | Select-Object -First 1
if (-not $voice) {
    Write-Error "No ko-KR voice installed."
    exit 1
}
$s.SelectVoice($voice.VoiceInfo.Name)

foreach ($row in Get-Content -Encoding UTF8 $Narration) {
    if (-not $row.Trim()) { continue }
    $num, $text = $row -split '\|', 2
    if ($Line -and [int]$num -ne $Line) { continue }
    code -r -g "${File}:${num}" 2>$null
    Write-Output "[$num] $text"
    $s.Speak($text)
}

# Kleines Last-Write-Wins Express Backend

## Erklärung der Synchronisationslogik

## 1. Client-Anfrage:
Die App sendet ein Array von Notizen an den Sync-Endpoint /sync. Jede Notiz enthält die Felder:
- id: Die eindeutige ID der Notiz.
- title: Den Titel der Notiz.
- description: Die Beschreibung der Notiz.
- updatedAt: Den Zeitstempel der letzten Änderung.

## 2. Prüfen und Speichern der Notizen:
- Für jede Notiz prüft der Server, ob sie bereits in der MongoDB-Datenbank existiert.
- Neue Notizen: Wenn eine Notiz nicht in der Datenbank existiert, wird sie als neue Notiz erstellt und gespeichert.
- Bestehende Notizen: Wenn die Notiz existiert, prüft der Server das updatedAt-Feld:
  - Wenn die Client-Version neuer ist (d. h., updatedAt der Client-Daten ist später als updatedAt in der Datenbank), wird die Notiz in der Datenbank aktualisiert.
  - Wenn die Server-Version neuer ist, wird die Client-Version ignoriert, und die Datenbankversion bleibt unverändert.

## 3. Rückgabe synchronisierter Notizen:
Der Server gibt die aktuelle Liste der Notizen (aktualisiert oder unverändert) als Antwort zurück. Der Client kann dann diese Daten verwenden, um seine lokale Datenbank zu aktualisieren und sicherzustellen, dass alle Notizen konsistent sind.

## Vorteile dieser Struktur
- Einfache Konfliktlösung: Die Last-write-wins-Strategie macht das Konfliktmanagement unkompliziert.
- Minimale Änderungen im Backend: Die Express-Route /sync kann alle Synchronisationsanforderungen bearbeiten, ohne dass zusätzliche Logik oder ein separater Konfliktlösungsmechanismus erforderlich ist.
- Einfach zu erweiternde Struktur: Falls du mehr Datenfelder oder zusätzliche Modelle hinzufügen möchtest, kannst du diese Struktur einfach anpassen.

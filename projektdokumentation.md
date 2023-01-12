# Projekt-Dokumentation

✍️ Peterhans

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
|       | 0.0.1   | ✍️ Jedes Mal, wenn Sie an dem Projekt arbeiten, fügen Sie hier eine neue Zeile ein und beschreiben in *einem* Satz, was Sie erreicht haben. |
|       | 0.0.2   |                                                              |
|       | 0.0.3   |                                                              |
|       | 0.0.4   |                                                              |
|       | 0.0.5   |                                                              |
|       | 0.0.6   |                                                              |
|       | 1.0.0   |                                                              |

# 0 Ihr Projekt

✍️ Beschreiben Sie Ihr Projekt in einem griffigen Satz.

# 1 Analyse

✍️ Beschreiben Sie, auf welchem Tier Sie die dynamischen Elemente der Anwendung unterbringen möchten:

* Tier 1 (Presentation): ...
* Tier 2 (Webserver):
* Tier 3 (Application Server):
* Tier 4 (Dataserver):

# 2 Technologie

✍️ Beschreiben Sie für dieselben Tiers, welche Programmiersprache bzw. Technologie Sie verwenden möchten.

# 3 Datenbank

Als Datenbank wird "Firebase" benutzt. Mit einer Initialisierung in einer JavaScript-Datei kann man auf sie zugreifen. Das Interface der Datenbank ist mit Sammlungen und in denen mit Dokumentationen aufgebaut.

# 4.1 User Stories

✍️ Formulieren Sie weitere, eigene Anforderungen und Testfälle, wie Sie Ihre Applikation erweitern möchten. Geben Sie diesen statt einer Nummer einen Buchstaben (`A`, `B`, etc.)

| US-№ | Verbindlichkeit | Typ  | Beschreibung                       |
| ---- | --------------- | ---- | ---------------------------------- |
| 1    | Muss | Funktional | Als Administrator möchte ich mich anmelden können, damit ich das Spiel administrieren kann. |
| 2    | Muss | Funktional | Als Administrator möchte ich Phrasen und Rätselwörter administrieren können, damit diese während dem Spiel angewandt werden können. |
| 3    | Muss | Funktional | Als Administrator möchte ich Kategorien anlegen können, damit ich weitere neue Wörter oder Fragen zu diesen zuordnen kann |
| 4    | Muss | Funktional | Als Administrator möchte ich Einträge der Highscore-Liste löschen können, damit manipulierte Spiele nicht in dieser Liste angezeigt werden.|
| 5    | Muss | Funktional | Als Kandidat möchte ich auf die Website zugreifen können, damit ich am Spiel teilnehmen kann. |
| 6    | Muss | Funktional | Als Kandidat möchte ich meinen Namen eingeben können, damit ich auf der Highscore-Liste angezeigt werde. |
| 7    | Muss | Qualität | Als Kandidat möchte ich meinen Kontostand ansehen können, damit ich weiss, wie riskant ich das Spiel spielen soll. |
| 8    | Muss | Qualität | Als Kandidat möchte ich meine Lebenspunkte ansehen können, damit ich nicht vergesse, wieviele Lebenspunkte ich während dem Spiel habe. |
| 9    | Muss | Qualität | Als Kandidat möchte ich, dass mir mitgeteilt wird, ob ich meine Antwort richtig oder falsch war, damit ich nachvollziehen kann, warum mein Kontostand geändert hatte. |


# 4.2 Testfälle

| TC-№ | Vorbereitung | Eingabe | Erwartete Ausgabe |
| ---- | ------------ | ------- | ----------------- |
| 1.1  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Benutzername: testAdmin123<br>- Passwort: passAdmin456</li></ul> | <ol><li>Benutzername eingeben (testAdmin123)</li><li>Passwort eingeben (passAdmin456)</li><li>Auf "Anmelden" klicken</li></ol> | Dem Administrator wird die Website in Administrator-Modus angezeigt. |
| 2.1  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Phrasen und Rätselwörter administrieren"</li><li>Klicke auf "hinzufügen"</li><li>Wähle als Typ "Rätselwort" aus</li><li>Gebe "HalloTest" ein</li><li>Klicke auf "Bestätigen"</li></ol> | In der Liste mit den Phrasen und Rätselwörtern ist nach dem Erstellen dazu eine neue Zeile dazugekommen. |
| 2.2  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Phrasen und Rätselwörter administrieren"</li><li>Klicke in der Liste beim Rätselwort "Testing" auf "bearbeiten"</li><li>Gebe "HalloTest" ein</li><li>Klicke auf "Bestätigen"</li></ol> | In der Liste mit den Phrasen und Rätselwörtern ist das ausgewählte Rätselwort bearbeitet worden. |
| 2.3  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Phrasen und Rätselwörter administrieren"</li><li>Klicke in der Liste beim Rätselwort "Testing2" auf "löschen"</li><li>Klicke auf "Bestätigen"</li></ol> | In der Liste mit den Phrasen und Rätselwörtern wurde das ausgewählte Rätselwort gelöscht. |
| 3.1  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Kategorien administrieren"</li><li>Klicke auf "erstellen"</li><li>Gebe "HalloTest" ein</li><li>Klicke auf "Bestätigen"</li></ol> | In der Liste wurde die Kategorie hinzugefügt. |
| 3.2  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Kategorien administrieren"</li><li>Klicke in der Liste bei der Kategorie "KatTesting" auf "hinzufügen"</li><li>Wähle "KatWort" aus</li><li>Klicke auf "Bestätigen"</li></ol> | Unter der Kategorie wird das ausgewählte Wort hinzugefügt und unter dieser Kategorie angezeigt. |
| 4.1  | <ul><li>Die Webapplikation ist auf einem Webbrowser geöffnet</li><li>Administrator-Modus ist an (Benutzername = "testAdmin123", Passwort = "passAdmin456")</li></ul> | <ol><li>Klicke auf "Highscore-Liste administrieren"</li><li>Klicke in der Liste beim Kandidat "DerManipulierer" auf "entfernen"</li><li>Klicke auf "Bestätigen"</li></ol> | Von der Highscore-Liste wurde der ausgewählte Kandidat entfernt. |
| 5.1  | <ul><li>Das Git-Repository <a href='https://github.com/benjyros/PeterhansBenjamin_LB151' target="_blank">PeterhansBenjamin_LB151</a> ist geöffnet</li></ul> | <ol><li>Klicke rechts auf den Link für die Website</li></ol> | Dem Benutzer wird die Website zum Spiel angezeigt. |
| 6.1  |              |         |                   |
| 7.1  |              |         |                   |
| 8.1  |              |         |                   |
| 9.1  |              |         |                   |

✍️ Die Nummer hat das Format `N.m`, wobei `N` die Nummer der User Story ist, die der Testfall abdeckt, und `m` von `1` an nach oben gezählt. Beispiel: Der dritte Testfall, der die zweite User Story abdeckt, hat also die Nummer `2.3`.

# 5 Prototyp

✍️ Erstellen Sie Prototypen für das GUI (Admin-Interface und Quiz-Seite).

# 6 Implementation

✍️ Halten Sie fest, wann Sie welche User Story bearbeitet haben

| User Story | Datum | Beschreibung |
| ---------- | ----- | ------------ |
| ...        |       |              |

# 7 Projektdokumentation

| US-№ | Erledigt? | Entsprechende Code-Dateien oder Erklärung |
| ---- | --------- | ----------------------------------------- |
| 1    | ja / nein |                                           |
| ...  |           |                                           |

# 8 Testprotokoll

✍️ Fügen Sie hier den Link zu dem Video ein, welches den Testdurchlauf dokumentiert.

| TC-№ | Datum | Resultat | Tester |
| ---- | ----- | -------- | ------ |
| 1.1  |       |          |        |
| ...  |       |          |        |

✍️ Vergessen Sie nicht, ein Fazit hinzuzufügen, welches das Test-Ergebnis einordnet.

# 9 `README.md`

✍️ Beschreiben Sie ausführlich in einer README.md, wie Ihre Applikation gestartet und ausgeführt wird. Legen Sie eine geeignete Möglichkeit (Skript, Export, …) bei, Ihre Datenbank wiederherzustellen.

# 10 Allgemeines

- [ ] Ich habe die Rechtschreibung überprüft
- [ ] Ich habe überprüft, dass die Nummerierung von Testfällen und User Stories übereinstimmen
- [ ] Ich habe alle mit ✍️ markierten Teile ersetzt

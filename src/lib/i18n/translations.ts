export type SupportedLanguage = 'en' | 'de' | 'fr' | 'it' | 'pl' | 'zh-CN' | 'zh-TW';

export interface Translations {
    // Common
    common: {
        close: string;
        cancel: string;
        confirm: string;
        loading: string;
        error: string;
        save: string;
        clearAllData: string;
        clearAllDataConfirm: string;
        clearAllDataDescription: string;
    };

    // Header
    header: {
        tagline: string;
        buyMeABeer: string;
        github: string;
    };

    // Start Screen
    start: {
        title: string;
        settings: string;
        language: string;
        apiKey: string;
        apiKeyPlaceholder: string;
        getApiKey: string;
        startGame: string;
        resumeGame: string;
        startNewGame: string;
        chooseCoach: string;
        importPosition: string;
        importPositionPlaceholder: string;
        formatDetected: string;
        formatFen: string;
        formatPgn: string;
        formatInvalid: string;
        apiKeyRequired: string;
        colorSelection: string;
        playAsWhite: string;
        playAsBlack: string;
        randomColor: string;
        analyzeGame: string;
        learningArea: string;
        savedGamesTitle: string;
        savedGamesEmpty: string;
        opponentLabel: string;
        evaluationLabel: string;
        noEvaluation: string;
        deleteGame: string;
        analyzeThisGame: string;
    };

    // Game
    game: {
        playingAs: string;
        vs: string;
        backToMenu: string;
        stockfishStrength: string;
        stockfishLevel: string;
        depth: string;
        undoMove: string;
        resign: string;
        resignConfirm: string;
        resignation: string;
        gameHistory: string;
        analyze: string;
        noMovesYet: string;
        white: string;
        black: string;
        download: string;
        evalChange: string;
    };

    // Tutor
    tutor: {
        aiCoach: string;
        askCoach: string;
        hint: string;
        bestMove: string;
    };

    // Game Over
    gameOver: {
        title: string;
        checkmate: string;
        youWon: string;
        youLost: string;
        draw: string;
        stalemate: string;
        mistakes: string;
        aiSummary: string;
        move: string;
        evalBefore: string;
        evalAfter: string;
        bestMove: string;
        newGame: string;
    };

    // Analysis
    analysis: {
        title: string;
        currentPosition: string;
        evaluation: string;
        bestMove: string;
        aiAnalysis: string;
        playFromHere: string;
        playDescription: string;
        chooseOpponent: string;
        chooseSide: string;
        chooseStrength: string;
        startPlay: string;
        modeTitle: string;
        modeDescription: string;
        pasteLabel: string;
        pastePlaceholder: string;
        chooseCoach: string;
        orientation: string;
        startButton: string;
        next: string;
        previous: string;
        step: string;
        missedTactics: string;
        cpLoss: string;
        none: string;
        opening: string;
        enginePending: string;
        coachPending: string;
        importError: string;
        loadNewGame: string;
        openingsExplorer: string;
        generatingExplanation: string;
        noApiKey: string;
        askFollowUp: string;
        possibleOpenings: string;
        downloadGame: string;
        downloadPGN: string;
        downloadFEN: string;
        downloadTitle: string;
    };

    // API Key Input
    apiKeyInput: {
        title: string;
        description: string;
        placeholder: string;
        submit: string;
        getKey: string;
    };

    // Onboarding
    onboarding: {
        welcome: {
            title: string;
            subtitle: string;
            claim: string;
        };
        language: {
            title: string;
            description: string;
        };
        value: {
            title: string;
            bullets: string[];
        };
        api: {
            title: string;
            description: string;
            inputLabel: string;
            placeholder: string;
            storage: string;
            serverUse: string;
            costNote: string;
            privacy: string;
            getKey: string;
            consentLabel: string;
            consentRequired: string;
        };
        actions: {
            next: string;
            back: string;
            finish: string;
        };
        stepIndicator: (step: number, total: number) => string;
    };

    // Learning Area
    learning: {
        title: string;
        subtitle: string;
        tacticalPatterns: string;
        openings: string;
        comingSoon: string;
        backToMenu: string;
        patterns: {
            pin: string;
            skewer: string;
            fork: string;
            discoveredCheck: string;
            doubleAttack: string;
            overloading: string;
            backRankWeakness: string;
            trappedPiece: string;
        };
        practice: {
            title: string;
            hint: string;
            makeYourMove: string;
            correct: string;
            incorrect: string;
            tryAgain: string;
            nextExercise: string;
            backToLearning: string;
            findTheMove: string;
        };
        openingTrainer: {
            loadingSession: string;
            openingNotFound: string;
            openingNotFoundDescription: string;
            backToOpeningSelection: string;
            loadingBackground: string;
            noBackgroundInfo: string;
            wikipediaSource: string;
            deviationTitle: string;
            deviationMessage: string;
            deviationTip: string;
            continuePlayingButton: string;
            undoReturnButton: string;
            exploreVariationButton: string;
            move: string;
            moves: string;
            noMovesHint: string;
        };
    };
}

const en: Translations = {
    common: {
        close: 'Close',
        cancel: 'Cancel',
        confirm: 'Confirm',
        loading: 'Loading...',
        error: 'Error',
        save: 'Save',
        clearAllData: 'Clear All Data',
        clearAllDataConfirm: 'Are you sure you want to clear all data? This will delete all saved games, settings, and usernames. This action cannot be undone.',
        clearAllDataDescription: 'Remove all saved games, settings, and cached data from your browser.',
    },
    header: {
        tagline: 'with Gemini & Stockfish',
        buyMeABeer: 'Buy Me a Beer',
        github: 'GitHub',
    },
    start: {
        title: 'Chess Tutor AI',
        settings: '1. Settings',
        language: 'Language',
        apiKey: 'LLM API Key',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: 'Get free key',
        startGame: 'Start Game',
        resumeGame: 'Resume Previous Game',
        startNewGame: 'Start New Game',
        chooseCoach: 'Choose Your Coach:',
        importPosition: 'Import Position or Game (FEN or PGN)',
        importPositionPlaceholder: 'Paste FEN position or PGN game here...',
        formatDetected: 'Format detected:',
        formatFen: 'FEN Position',
        formatPgn: 'PGN Game',
        formatInvalid: 'Invalid format - please paste a valid FEN or PGN',
        apiKeyRequired: 'Please enter a valid API Key to continue.',
        colorSelection: 'Choose Your Color:',
        playAsWhite: 'Play as White',
        playAsBlack: 'Play as Black',
        randomColor: 'Random',
        analyzeGame: 'Analyze a Game',
        learningArea: 'Learning Area',
        savedGamesTitle: 'Unfinished games',
        savedGamesEmpty: 'No unfinished games yet.',
        opponentLabel: 'Opponent',
        evaluationLabel: 'Evaluation',
        noEvaluation: 'No evaluation yet',
        deleteGame: 'Delete game',
        analyzeThisGame: 'Analyze this game',
    },
    game: {
        playingAs: 'Playing as',
        vs: 'vs',
        backToMenu: '← Back to Menu',
        stockfishStrength: 'Stockfish Strength',
        stockfishLevel: 'Stockfish Level',
        depth: 'Depth',
        undoMove: 'Undo Last Move',
        resign: 'Resign',
        resignConfirm: 'Are you sure you want to resign? This action cannot be undone.',
        resignation: 'You resigned.',
        gameHistory: 'Game History',
        analyze: 'Analyze',
        noMovesYet: 'No moves yet.',
        white: 'White',
        black: 'Black',
        download: 'Download',
        evalChange: 'Eval Δ',
    },
    tutor: {
        aiCoach: 'AI Coach',
        askCoach: 'Ask your coach...',
        hint: 'Hint',
        bestMove: 'Best Move',
    },
    gameOver: {
        title: 'Game Over',
        checkmate: 'Checkmate!',
        youWon: 'You won!',
        youLost: 'You lost.',
        draw: 'Draw!',
        stalemate: 'Stalemate!',
        mistakes: 'Your Mistakes',
        aiSummary: 'AI Summary',
        move: 'Move',
        evalBefore: 'Eval Before',
        evalAfter: 'Eval After',
        bestMove: 'Best Move',
        newGame: 'New Game',
    },
    analysis: {
        title: 'Position Analysis',
        currentPosition: 'Current Position',
        evaluation: 'Evaluation',
        bestMove: 'Best Move',
        aiAnalysis: 'AI Analysis',
        playFromHere: 'Play from this position',
        playDescription: 'Pick a character, side, and engine strength to continue playing from the current move.',
        chooseOpponent: 'Choose your opponent',
        chooseSide: 'Choose your color',
        chooseStrength: 'Opponent strength',
        startPlay: 'Start from here',
        modeTitle: 'Analyze an Existing Game',
        modeDescription: 'Upload a PGN or FEN and let your coach walk you through every move with engine-backed insights.',
        pasteLabel: 'PGN or FEN Input',
        pastePlaceholder: 'Paste PGN or FEN here to review the game move by move...',
        chooseCoach: 'Choose Coach Personality',
        orientation: 'Board Orientation',
        startButton: 'Start Analysis',
        next: 'Next Move',
        previous: 'Previous Move',
        step: 'Move',
        missedTactics: 'Missed Tactics',
        cpLoss: 'Evaluation Change',
        none: 'None detected',
        opening: 'Opening',
        enginePending: 'Running engine evaluation...',
        coachPending: 'Coach is preparing feedback...',
        importError: 'Could not load that PGN or FEN. Please check the notation.',
        loadNewGame: 'Load New Game',
        openingsExplorer: 'Opening Explorer',
        generatingExplanation: 'Generating explanation...',
        noApiKey: 'Please add an API key in settings to get opening explanations.',
        askFollowUp: 'Ask a follow-up question about this opening...',
        possibleOpenings: 'possible openings',
        downloadGame: 'Download Game',
        downloadPGN: 'Download as PGN',
        downloadFEN: 'Download Current Position (FEN)',
        downloadTitle: 'Export Game',
    },
    apiKeyInput: {
        title: 'API Key Required',
        description: 'Please enter your Google Gemini API key to continue.',
        placeholder: 'Enter your API key...',
        submit: 'Submit',
        getKey: 'Get a free API key',
    },
    onboarding: {
        welcome: {
            title: 'Chess Tutor AI',
            subtitle: 'Your personal coach to level up your chess.',
            claim: 'Play, learn, and analyze with AI guidance powered by Gemini & Stockfish.',
        },
        language: {
            title: 'Choose your language',
            description: 'We will personalize your experience and future messages in the language you choose.',
        },
        value: {
            title: 'What you get',
            bullets: [
                'Practice with personalities that match your style.',
                'Import FEN or PGN to analyze games with live advice.',
                'Blend Google Gemini creativity with Stockfish precision.',
                'Keep your progress locally—resume anytime.',
            ],
        },
        api: {
            title: 'Add your LLM API key',
            description: 'We need your LLM provider’s API key (any OpenAI-compatible service) to generate coaching moves and explanations.',
            inputLabel: 'LLM API Key',
            placeholder: 'sk-... (or your provider\'s key)',
            storage: 'Your key is stored in your browser and never shared.',
            serverUse: 'We only send it to our server when making requests and never log it.',
            costNote: 'LLM tokens are billed by your provider, so you control the usage.',
            privacy: 'We never use your key for anything outside this tutor.',
            getKey: 'Get an API key',
            consentLabel: 'I understand and agree that my API key will be stored in my browser\'s local storage',
            consentRequired: 'You must agree to store the API key in local storage to continue',
        },
        actions: {
            next: 'Next',
            back: 'Back',
            finish: 'Save & start playing',
        },
        stepIndicator: (step: number, total: number) => `Step ${step} of ${total}`,
    },
    learning: {
        title: 'Learning Area',
        subtitle: 'Practice tactical patterns and openings',
        tacticalPatterns: 'Tactical Patterns',
        openings: 'Openings',
        comingSoon: 'Coming Soon',
        backToMenu: 'Back to Menu',
        patterns: {
            pin: 'Pin',
            skewer: 'Skewer',
            fork: 'Fork',
            discoveredCheck: 'Discovered Check',
            doubleAttack: 'Double Attack',
            overloading: 'Overloading',
            backRankWeakness: 'Back Rank Weakness',
            trappedPiece: 'Trapped Piece',
        },
        practice: {
            title: 'Tactical Practice',
            hint: 'Hint',
            makeYourMove: 'Make your move on the board',
            correct: 'Correct! Well done!',
            incorrect: 'Not quite. Try again!',
            tryAgain: 'Try Again',
            nextExercise: 'Next Exercise',
            backToLearning: 'Back to Learning Area',
            findTheMove: 'Find the move that creates a',
        },
        openingTrainer: {
            loadingSession: 'Loading opening training session...',
            openingNotFound: 'Opening Not Found',
            openingNotFoundDescription: 'The requested opening could not be found.',
            backToOpeningSelection: 'Back to Opening Selection',
            loadingBackground: 'Loading opening background...',
            noBackgroundInfo: 'No background information available for this opening.',
            wikipediaSource: 'Source: Wikipedia (cached',
            deviationTitle: "You've Left the Opening!",
            deviationMessage: "You've studied",
            deviationTip: 'Tip: You can always navigate back using the move history',
            continuePlayingButton: 'Continue Playing (Start Game)',
            undoReturnButton: 'Undo & Return to Opening',
            exploreVariationButton: 'Explore This Variation',
            move: 'move',
            moves: 'moves',
            noMovesHint: 'No moves yet. Make your first move!',
        },
    },
};

const de: Translations = {
    common: {
        close: 'Schließen',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        loading: 'Lädt...',
        error: 'Fehler',
        save: 'Speichern',
        clearAllData: 'Alle Daten löschen',
        clearAllDataConfirm: 'Sind Sie sicher, dass Sie alle Daten löschen möchten? Dies löscht alle gespeicherten Spiele, Einstellungen und Benutzernamen. Diese Aktion kann nicht rückgängig gemacht werden.',
        clearAllDataDescription: 'Alle gespeicherten Spiele, Einstellungen und zwischengespeicherten Daten aus Ihrem Browser entfernen.',
    },
    header: {
        tagline: 'mit Gemini & Stockfish',
        buyMeABeer: 'Spendier mir ein Bier',
        github: 'GitHub',
    },
    start: {
        title: 'Chess Tutor AI',
        settings: '1. Einstellungen',
        language: 'Sprache',
        apiKey: 'LLM API Key',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: 'Kostenlosen Schlüssel erhalten',
        startGame: 'Spiel starten',
        resumeGame: 'Vorheriges Spiel fortsetzen',
        startNewGame: 'Neues Spiel starten',
        chooseCoach: 'Wähle deinen Trainer:',
        importPosition: 'Position oder Partie importieren (FEN oder PGN)',
        importPositionPlaceholder: 'FEN-Position oder PGN-Partie hier einfügen...',
        formatDetected: 'Format erkannt:',
        formatFen: 'FEN-Position',
        formatPgn: 'PGN-Partie',
        formatInvalid: 'Ungültiges Format - bitte gültiges FEN oder PGN einfügen',
        apiKeyRequired: 'Bitte geben Sie einen gültigen API-Schlüssel ein, um fortzufahren.',
        colorSelection: 'Wähle deine Farbe:',
        playAsWhite: 'Als Weiß spielen',
        playAsBlack: 'Als Schwarz spielen',
        randomColor: 'Zufällig',
        analyzeGame: 'Partie analysieren',
        learningArea: 'Lernbereich',
        savedGamesTitle: 'Unfertige Partien',
        savedGamesEmpty: 'Keine unfertigen Partien vorhanden.',
        opponentLabel: 'Gegner',
        evaluationLabel: 'Bewertung',
        noEvaluation: 'Keine Bewertung',
        deleteGame: 'Partie löschen',
        analyzeThisGame: 'Diese Partie analysieren',
    },
    game: {
        playingAs: 'Spielst als',
        vs: 'gegen',
        backToMenu: '← Zurück zum Menü',
        stockfishStrength: 'Stockfish-Stärke',
        stockfishLevel: 'Stockfish-Stufe',
        depth: 'Tiefe',
        undoMove: 'Letzten Zug rückgängig',
        resign: 'Aufgeben',
        resignConfirm: 'Möchtest du wirklich aufgeben? Diese Aktion kann nicht rückgängig gemacht werden.',
        resignation: 'Du hast aufgegeben.',
        gameHistory: 'Spielverlauf',
        analyze: 'Analysieren',
        noMovesYet: 'Noch keine Züge.',
        white: 'Weiß',
        black: 'Schwarz',
        download: 'Herunterladen',
        evalChange: 'Bew. Δ',
    },
    tutor: {
        aiCoach: 'KI-Trainer',
        askCoach: 'Frage deinen Trainer...',
        hint: 'Hinweis',
        bestMove: 'Bester Zug',
    },
    gameOver: {
        title: 'Spiel beendet',
        checkmate: 'Schachmatt!',
        youWon: 'Du hast gewonnen!',
        youLost: 'Du hast verloren.',
        draw: 'Remis!',
        stalemate: 'Patt!',
        mistakes: 'Deine Fehler',
        aiSummary: 'KI-Zusammenfassung',
        move: 'Zug',
        evalBefore: 'Bewertung vorher',
        evalAfter: 'Bewertung nachher',
        bestMove: 'Bester Zug',
        newGame: 'Neues Spiel',
    },
    analysis: {
        title: 'Stellungsanalyse',
        currentPosition: 'Aktuelle Stellung',
        evaluation: 'Bewertung',
        bestMove: 'Bester Zug',
        aiAnalysis: 'KI-Analyse',
        playFromHere: 'Von dieser Stellung spielen',
        playDescription: 'Wähle Charakter, Farbe und Engine-Stärke, um ab dem aktuellen Zug weiterzuspielen.',
        chooseOpponent: 'Gegner auswählen',
        chooseSide: 'Wähle deine Farbe',
        chooseStrength: 'Stärke des Gegners',
        startPlay: 'Hier weiterspielen',
        modeTitle: 'Bestehende Partie analysieren',
        modeDescription: 'PGN oder FEN hochladen und vom Coach mit Engine-Unterstützung durch die Partie führen lassen.',
        pasteLabel: 'PGN- oder FEN-Eingabe',
        pastePlaceholder: 'PGN oder FEN hier einfügen, um die Partie Zug für Zug anzusehen...',
        chooseCoach: 'Coach-Persönlichkeit wählen',
        orientation: 'Brettausrichtung',
        startButton: 'Analyse starten',
        next: 'Nächster Zug',
        previous: 'Vorheriger Zug',
        step: 'Zug',
        missedTactics: 'Verpasste Taktiken',
        cpLoss: 'Bewertungsänderung',
        none: 'Keine erkannt',
        opening: 'Eröffnung',
        enginePending: 'Engine-Bewertung läuft...',
        coachPending: 'Coach bereitet Feedback vor...',
        importError: 'PGN oder FEN konnte nicht geladen werden. Bitte Notation prüfen.',
        loadNewGame: 'Neue Partie laden',
        openingsExplorer: 'Eröffnungs-Explorer',
        generatingExplanation: 'Erklärung wird generiert...',
        noApiKey: 'Bitte fügen Sie in den Einstellungen einen API-Schlüssel hinzu.',
        askFollowUp: 'Stellen Sie eine Folgefrage zu dieser Eröffnung...',
        possibleOpenings: 'mögliche Eröffnungen',
        downloadGame: 'Partie herunterladen',
        downloadPGN: 'Als PGN herunterladen',
        downloadFEN: 'Aktuelle Position herunterladen (FEN)',
        downloadTitle: 'Partie exportieren',
    },
    apiKeyInput: {
        title: 'API-Schlüssel erforderlich',
        description: 'Bitte geben Sie Ihren Google Gemini API-Schlüssel ein, um fortzufahren.',
        placeholder: 'Geben Sie Ihren API-Schlüssel ein...',
        submit: 'Absenden',
        getKey: 'Kostenlosen API-Schlüssel erhalten',
    },
    onboarding: {
        welcome: {
            title: 'Chess Tutor AI',
            subtitle: 'Dein persönlicher Coach für den nächsten Spielzug.',
            claim: 'Spiele, lerne und analysiere mit KI-Unterstützung von Gemini & Stockfish.',
        },
        language: {
            title: 'Wähle deine Sprache',
            description: 'Wir passen das Erlebnis und zukünftige Nachrichten an deine Sprache an.',
        },
        value: {
            title: 'Deine Vorteile',
            bullets: [
                'Trainiere mit Persönlichkeiten, die zu deinem Stil passen.',
                'Importiere FEN oder PGN und erhalte Live-Hinweise zur Analyse.',
                'Kombiniere die Kreativität von Google Gemini mit der Präzision von Stockfish.',
                'Speichere deinen Fortschritt lokal – spiele jederzeit weiter.',
            ],
        },
        api: {
            title: 'Füge deinen LLM-API-Schlüssel hinzu',
            description: 'Wir benötigen den API-Schlüssel deines LLM-Anbieters (jeder OpenAI-kompatible Dienst), um Züge und Erklärungen zu generieren.',
            inputLabel: 'LLM-API-Schlüssel',
            placeholder: 'sk-... (oder der Schlüssel deines Anbieters)',
            storage: 'Dein Schlüssel bleibt im Browser gespeichert und wird nicht geteilt.',
            serverUse: 'Wir senden ihn nur für Anfragen an unseren Server und protokollieren ihn nicht.',
            costNote: 'LLM-Tokens werden von deinem Anbieter abgerechnet – du behältst die Kontrolle.',
            privacy: 'Wir nutzen deinen Schlüssel ausschließlich für diesen Tutor.',
            getKey: 'API-Schlüssel holen',
            consentLabel: 'Ich verstehe und stimme zu, dass mein API-Schlüssel im lokalen Speicher meines Browsers gespeichert wird',
            consentRequired: 'Du musst der Speicherung des API-Schlüssels im lokalen Speicher zustimmen, um fortzufahren',
        },
        actions: {
            next: 'Weiter',
            back: 'Zurück',
            finish: 'Speichern & starten',
        },
        stepIndicator: (step: number, total: number) => `Schritt ${step} von ${total}`,
    },
    learning: {
        title: 'Lernbereich',
        subtitle: 'Übe taktische Muster und Eröffnungen',
        tacticalPatterns: 'Taktische Muster',
        openings: 'Eröffnungen',
        comingSoon: 'Demnächst',
        backToMenu: 'Zurück zum Menü',
        patterns: {
            pin: 'Fesselung',
            skewer: 'Spieß',
            fork: 'Gabel',
            discoveredCheck: 'Abzugsschach',
            doubleAttack: 'Doppelangriff',
            overloading: 'Überlastung',
            backRankWeakness: 'Grundreihenschwäche',
            trappedPiece: 'Gefangene Figur',
        },
        practice: {
            title: 'Taktiktraining',
            hint: 'Hinweis',
            makeYourMove: 'Mache deinen Zug auf dem Brett',
            correct: 'Richtig! Gut gemacht!',
            incorrect: 'Nicht ganz. Versuch es nochmal!',
            tryAgain: 'Nochmal versuchen',
            nextExercise: 'Nächste Übung',
            backToLearning: 'Zurück zum Lernbereich',
            findTheMove: 'Finde den Zug, der eine',
        },
        openingTrainer: {
            loadingSession: 'Lade Eröffnungstraining...',
            openingNotFound: 'Eröffnung nicht gefunden',
            openingNotFoundDescription: 'Die angeforderte Eröffnung konnte nicht gefunden werden.',
            backToOpeningSelection: 'Zurück zur Eröffnungsauswahl',
            loadingBackground: 'Lade Eröffnungshintergrund...',
            noBackgroundInfo: 'Keine Hintergrundinformationen für diese Eröffnung verfügbar.',
            wikipediaSource: 'Quelle: Wikipedia (zwischengespeichert',
            deviationTitle: 'Du hast die Eröffnung verlassen!',
            deviationMessage: 'Du hast',
            deviationTip: 'Tipp: Du kannst jederzeit über die Zughistorie zurücknavigieren',
            continuePlayingButton: 'Weiterspielen (Spiel starten)',
            undoReturnButton: 'Rückgängig & zur Eröffnung zurück',
            exploreVariationButton: 'Diese Variante erkunden',
            move: 'Zug',
            moves: 'Züge',
            noMovesHint: 'Noch keine Züge. Mache deinen ersten Zug!',
        },
    },
};

const fr: Translations = {
    common: {
        close: 'Fermer',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        loading: 'Chargement...',
        error: 'Erreur',
        save: 'Enregistrer',
        clearAllData: 'Effacer toutes les données',
        clearAllDataConfirm: 'Êtes-vous sûr de vouloir effacer toutes les données ? Cela supprimera toutes les parties sauvegardées, les paramètres et les noms d\'utilisateur. Cette action est irréversible.',
        clearAllDataDescription: 'Supprimer toutes les parties sauvegardées, les paramètres et les données en cache de votre navigateur.',
    },
    header: {
        tagline: 'avec Gemini & Stockfish',
        buyMeABeer: 'Offrez-moi une bière',
        github: 'GitHub',
    },
    start: {
        title: 'Chess Tutor AI',
        settings: '1. Paramètres',
        language: 'Langue',
        apiKey: 'Clé API LLM',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: 'Obtenir une clé gratuite',
        startGame: 'Démarrer la partie',
        resumeGame: 'Reprendre la partie précédente',
        startNewGame: 'Démarrer une nouvelle partie',
        chooseCoach: 'Choisissez votre coach :',
        importPosition: 'Importer une position ou partie (FEN ou PGN)',
        importPositionPlaceholder: 'Collez une position FEN ou partie PGN ici...',
        formatDetected: 'Format détecté :',
        formatFen: 'Position FEN',
        formatPgn: 'Partie PGN',
        formatInvalid: 'Format invalide - veuillez coller un FEN ou PGN valide',
        apiKeyRequired: 'Veuillez entrer une clé API valide pour continuer.',
        colorSelection: 'Choisissez votre couleur :',
        playAsWhite: 'Jouer Blancs',
        playAsBlack: 'Jouer Noirs',
        randomColor: 'Aléatoire',
        analyzeGame: 'Analyser une partie',
        learningArea: 'Zone d\'apprentissage',
        savedGamesTitle: 'Parties inachevées',
        savedGamesEmpty: 'Aucune partie en cours.',
        opponentLabel: 'Adversaire',
        evaluationLabel: 'Évaluation',
        noEvaluation: 'Pas d\'évaluation',
        deleteGame: 'Supprimer la partie',
        analyzeThisGame: 'Analyser cette partie',
    },
    game: {
        playingAs: 'Jouant',
        vs: 'contre',
        backToMenu: '← Retour au menu',
        stockfishStrength: 'Force de Stockfish',
        stockfishLevel: 'Niveau Stockfish',
        depth: 'Profondeur',
        undoMove: 'Annuler le dernier coup',
        resign: 'Abandonner',
        resignConfirm: 'Êtes-vous sûr de vouloir abandonner ? Cette action est irréversible.',
        resignation: 'Vous avez abandonné.',
        gameHistory: 'Historique de la partie',
        analyze: 'Analyser',
        noMovesYet: 'Aucun coup pour le moment.',
        white: 'Blancs',
        black: 'Noirs',
        download: 'Télécharger',
        evalChange: 'Éval Δ',
    },
    tutor: {
        aiCoach: 'Coach IA',
        askCoach: 'Demandez à votre coach...',
        hint: 'Indice',
        bestMove: 'Meilleur coup',
    },
    gameOver: {
        title: 'Partie terminée',
        checkmate: 'Échec et mat !',
        youWon: 'Vous avez gagné !',
        youLost: 'Vous avez perdu.',
        draw: 'Nulle !',
        stalemate: 'Pat !',
        mistakes: 'Vos erreurs',
        aiSummary: 'Résumé IA',
        move: 'Coup',
        evalBefore: 'Éval. avant',
        evalAfter: 'Éval. après',
        bestMove: 'Meilleur coup',
        newGame: 'Nouvelle partie',
    },
    analysis: {
        title: 'Analyse de position',
        currentPosition: 'Position actuelle',
        evaluation: 'Évaluation',
        bestMove: 'Meilleur coup',
        aiAnalysis: 'Analyse IA',
        playFromHere: 'Jouer depuis cette position',
        playDescription: 'Choisissez un personnage, une couleur et la force du moteur pour continuer depuis ce coup.',
        chooseOpponent: 'Choisir votre adversaire',
        chooseSide: 'Choisissez votre couleur',
        chooseStrength: 'Force de l’adversaire',
        startPlay: 'Commencer ici',
        modeTitle: 'Analyser une partie existante',
        modeDescription: 'Importez un PGN ou un FEN et laissez le coach commenter chaque coup avec l’aide du moteur.',
        pasteLabel: 'Saisie PGN ou FEN',
        pastePlaceholder: 'Collez ici un PGN ou un FEN pour revoir la partie coup par coup...',
        chooseCoach: 'Choisir la personnalité du coach',
        orientation: 'Orientation de l’échiquier',
        startButton: 'Lancer l’analyse',
        next: 'Coup suivant',
        previous: 'Coup précédent',
        step: 'Coup',
        missedTactics: 'Tactiques manquées',
        cpLoss: 'Changement d’évaluation',
        none: 'Aucune détectée',
        opening: 'Ouverture',
        enginePending: 'Évaluation du moteur en cours...',
        coachPending: 'Le coach prépare son retour...',
        importError: 'Impossible de charger ce PGN ou FEN. Merci de vérifier la notation.',
        loadNewGame: 'Charger nouvelle partie',
        openingsExplorer: 'Explorateur d\'ouvertures',
        generatingExplanation: 'Génération de l\'explication...',
        noApiKey: 'Veuillez ajouter une clé API dans les paramètres.',
        askFollowUp: 'Posez une question sur cette ouverture...',
        possibleOpenings: 'ouvertures possibles',
        downloadGame: 'Télécharger la partie',
        downloadPGN: 'Télécharger en PGN',
        downloadFEN: 'Télécharger la position actuelle (FEN)',
        downloadTitle: 'Exporter la partie',
    },
    apiKeyInput: {
        title: 'Clé API requise',
        description: 'Veuillez entrer votre clé API Google Gemini pour continuer.',
        placeholder: 'Entrez votre clé API...',
        submit: 'Soumettre',
        getKey: 'Obtenir une clé API gratuite',
    },
    onboarding: {
        welcome: {
            title: 'Chess Tutor AI',
            subtitle: 'Votre coach personnel pour progresser aux échecs.',
            claim: 'Jouez, apprenez et analysez avec l’aide de Gemini et Stockfish.',
        },
        language: {
            title: 'Choisissez votre langue',
            description: 'Nous personnaliserons votre expérience et les messages dans la langue choisie.',
        },
        value: {
            title: 'Ce que vous obtenez',
            bullets: [
                'Entraînez-vous avec des personnalités adaptées à votre style.',
                'Importez du FEN ou du PGN et analysez vos parties avec des conseils en direct.',
                'Combinez la créativité de Google Gemini avec la précision de Stockfish.',
                'Gardez vos progrès en local et reprenez votre partie à tout moment.',
            ],
        },
        api: {
            title: 'Ajoutez votre clé API LLM',
            description: 'Nous avons besoin de la clé API de votre fournisseur LLM (tout service compatible OpenAI) pour générer des coups et des explications.',
            inputLabel: 'Clé API LLM',
            placeholder: 'sk-... (ou la clé de votre fournisseur)',
            storage: 'Votre clé est stockée dans votre navigateur et n’est jamais partagée.',
            serverUse: 'Elle n’est envoyée au serveur que pour les requêtes et n’est jamais journalisée.',
            costNote: 'Les jetons LLM sont facturés par votre fournisseur, vous gardez le contrôle.',
            privacy: 'Nous n’utilisons votre clé que pour ce tuteur.',
            getKey: 'Obtenir une clé API',
            consentLabel: 'Je comprends et j\'accepte que ma clé API soit stockée dans le stockage local de mon navigateur',
            consentRequired: 'Vous devez accepter le stockage de la clé API dans le stockage local pour continuer',
        },
        actions: {
            next: 'Suivant',
            back: 'Retour',
            finish: 'Enregistrer et commencer',
        },
        stepIndicator: (step: number, total: number) => `Étape ${step} sur ${total}`,
    },
    learning: {
        title: 'Zone d\'apprentissage',
        subtitle: 'Pratiquez les motifs tactiques et les ouvertures',
        tacticalPatterns: 'Motifs tactiques',
        openings: 'Ouvertures',
        comingSoon: 'Bientôt disponible',
        backToMenu: 'Retour au menu',
        patterns: {
            pin: 'Clouage',
            skewer: 'Enfilade',
            fork: 'Fourchette',
            discoveredCheck: 'Échec à la découverte',
            doubleAttack: 'Double attaque',
            overloading: 'Surcharge',
            backRankWeakness: 'Faiblesse de la dernière rangée',
            trappedPiece: 'Pièce piégée',
        },
        practice: {
            title: 'Pratique tactique',
            hint: 'Indice',
            makeYourMove: 'Faites votre coup sur l\'échiquier',
            correct: 'Correct ! Bien joué !',
            incorrect: 'Pas tout à fait. Réessayez !',
            tryAgain: 'Réessayer',
            nextExercise: 'Exercice suivant',
            backToLearning: 'Retour à la zone d\'apprentissage',
            findTheMove: 'Trouvez le coup qui crée un',
        },
        openingTrainer: {
            loadingSession: 'Chargement de la session d\'entraînement...',
            openingNotFound: 'Ouverture non trouvée',
            openingNotFoundDescription: 'L\'ouverture demandée n\'a pas pu être trouvée.',
            backToOpeningSelection: 'Retour à la sélection d\'ouverture',
            loadingBackground: 'Chargement des informations sur l\'ouverture...',
            noBackgroundInfo: 'Aucune information disponible pour cette ouverture.',
            wikipediaSource: 'Source : Wikipédia (en cache',
            deviationTitle: 'Vous avez quitté l\'ouverture !',
            deviationMessage: 'Vous avez étudié',
            deviationTip: 'Astuce : Vous pouvez toujours revenir en arrière en utilisant l\'historique des coups',
            continuePlayingButton: 'Continuer à jouer (Démarrer la partie)',
            undoReturnButton: 'Annuler et retourner à l\'ouverture',
            exploreVariationButton: 'Explorer cette variante',
            move: 'coup',
            moves: 'coups',
            noMovesHint: 'Aucun coup pour le moment. Faites votre premier coup !',
        },
    },
};

const it: Translations = {
    common: {
        close: 'Chiudi',
        cancel: 'Annulla',
        confirm: 'Conferma',
        loading: 'Caricamento...',
        error: 'Errore',
        save: 'Salva',
        clearAllData: 'Cancella tutti i dati',
        clearAllDataConfirm: 'Sei sicuro di voler cancellare tutti i dati? Questo eliminerà tutte le partite salvate, le impostazioni e i nomi utente. Questa azione non può essere annullata.',
        clearAllDataDescription: 'Rimuovi tutte le partite salvate, le impostazioni e i dati memorizzati dal tuo browser.',
    },
    header: {
        tagline: 'con Gemini & Stockfish',
        buyMeABeer: 'Offrimi una birra',
        github: 'GitHub',
    },
    start: {
        title: 'Chess Tutor AI',
        settings: '1. Impostazioni',
        language: 'Lingua',
        apiKey: 'Chiave API LLM',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: 'Ottieni chiave gratuita',
        startGame: 'Inizia partita',
        resumeGame: 'Riprendi partita precedente',
        startNewGame: 'Inizia nuova partita',
        chooseCoach: 'Scegli il tuo allenatore:',
        importPosition: 'Importa posizione o partita (FEN o PGN)',
        importPositionPlaceholder: 'Incolla posizione FEN o partita PGN qui...',
        formatDetected: 'Formato rilevato:',
        formatFen: 'Posizione FEN',
        formatPgn: 'Partita PGN',
        formatInvalid: 'Formato non valido - incolla un FEN o PGN valido',
        apiKeyRequired: 'Inserisci una chiave API valida per continuare.',
        colorSelection: 'Scegli il tuo colore:',
        playAsWhite: 'Gioca Bianco',
        playAsBlack: 'Gioca Nero',
        randomColor: 'Casuale',
        analyzeGame: 'Analizza una partita',
        learningArea: 'Area di apprendimento',
        savedGamesTitle: 'Partite non finite',
        savedGamesEmpty: 'Nessuna partita in corso.',
        opponentLabel: 'Avversario',
        evaluationLabel: 'Valutazione',
        noEvaluation: 'Nessuna valutazione',
        deleteGame: 'Elimina partita',
        analyzeThisGame: 'Analizza questa partita',
    },
    game: {
        playingAs: 'Giocando',
        vs: 'contro',
        backToMenu: '← Torna al menu',
        stockfishStrength: 'Forza di Stockfish',
        stockfishLevel: 'Livello Stockfish',
        depth: 'Profondità',
        undoMove: 'Annulla ultima mossa',
        resign: 'Abbandona',
        resignConfirm: 'Sei sicuro di voler abbandonare? Questa azione non può essere annullata.',
        resignation: 'Hai abbandonato.',
        gameHistory: 'Cronologia partita',
        analyze: 'Analizza',
        noMovesYet: 'Nessuna mossa ancora.',
        white: 'Bianco',
        black: 'Nero',
        download: 'Scarica',
        evalChange: 'Val Δ',
    },
    tutor: {
        aiCoach: 'Allenatore IA',
        askCoach: 'Chiedi al tuo allenatore...',
        hint: 'Suggerimento',
        bestMove: 'Mossa migliore',
    },
    gameOver: {
        title: 'Partita terminata',
        checkmate: 'Scacco matto!',
        youWon: 'Hai vinto!',
        youLost: 'Hai perso.',
        draw: 'Patta!',
        stalemate: 'Stallo!',
        mistakes: 'I tuoi errori',
        aiSummary: 'Riepilogo IA',
        move: 'Mossa',
        evalBefore: 'Val. prima',
        evalAfter: 'Val. dopo',
        bestMove: 'Mossa migliore',
        newGame: 'Nuova partita',
    },
    analysis: {
        title: 'Analisi posizione',
        currentPosition: 'Posizione attuale',
        evaluation: 'Valutazione',
        bestMove: 'Mossa migliore',
        aiAnalysis: 'Analisi IA',
        playFromHere: 'Gioca da questa posizione',
        playDescription: 'Scegli personaggio, colore e forza del motore per continuare da questa mossa.',
        chooseOpponent: 'Scegli l’avversario',
        chooseSide: 'Scegli il tuo colore',
        chooseStrength: 'Forza dell’avversario',
        startPlay: 'Inizia da qui',
        modeTitle: 'Analizza una partita esistente',
        modeDescription: 'Carica un PGN o un FEN e lascia che il coach commenti ogni mossa con il supporto del motore.',
        pasteLabel: 'Input PGN o FEN',
        pastePlaceholder: 'Incolla qui PGN o FEN per rivedere la partita mossa per mossa...',
        chooseCoach: 'Scegli la personalità del coach',
        orientation: 'Orientamento della scacchiera',
        startButton: 'Avvia analisi',
        next: 'Mossa successiva',
        previous: 'Mossa precedente',
        step: 'Mossa',
        missedTactics: 'Tattiche mancate',
        cpLoss: 'Variazione di valutazione',
        none: 'Nessuna rilevata',
        opening: 'Apertura',
        enginePending: 'Valutazione del motore in corso...',
        coachPending: 'Il coach sta preparando il feedback...',
        importError: 'Impossibile caricare questo PGN o FEN. Controlla la notazione.',
        loadNewGame: 'Carica nuova partita',
        openingsExplorer: 'Esplora aperture',
        generatingExplanation: 'Generazione spiegazione...',
        noApiKey: 'Aggiungi una chiave API nelle impostazioni.',
        askFollowUp: 'Fai una domanda su questa apertura...',
        possibleOpenings: 'aperture possibili',
        downloadGame: 'Scarica partita',
        downloadPGN: 'Scarica come PGN',
        downloadFEN: 'Scarica posizione attuale (FEN)',
        downloadTitle: 'Esporta partita',
    },
    apiKeyInput: {
        title: 'Chiave API richiesta',
        description: 'Inserisci la tua chiave API Google Gemini per continuare.',
        placeholder: 'Inserisci la tua chiave API...',
        submit: 'Invia',
        getKey: 'Ottieni chiave API gratuita',
    },
    onboarding: {
        welcome: {
            title: 'Chess Tutor AI',
            subtitle: 'Il tuo coach personale per migliorare negli scacchi.',
            claim: 'Gioca, impara e analizza con il supporto di Gemini e Stockfish.',
        },
        language: {
            title: 'Scegli la tua lingua',
            description: "Personalizzeremo l'esperienza e i messaggi nella lingua selezionata.",
        },
        value: {
            title: 'Cosa ottieni',
            bullets: [
                'Allenati con personalità che si adattano al tuo stile.',
                'Importa FEN o PGN e analizza le partite con suggerimenti in tempo reale.',
                'Unisci la creatività di Google Gemini con la precisione di Stockfish.',
                'Conserva i tuoi progressi in locale e riprendi quando vuoi.',
            ],
        },
        api: {
            title: 'Aggiungi la tua chiave API LLM',
            description: 'Abbiamo bisogno della chiave API del tuo fornitore LLM (qualsiasi servizio compatibile con OpenAI) per generare mosse e spiegazioni.',
            inputLabel: 'Chiave API LLM',
            placeholder: 'sk-... (o la chiave del tuo fornitore)',
            storage: 'La chiave viene salvata nel tuo browser e non viene condivisa.',
            serverUse: 'La inviamo solo per le richieste e non la registriamo mai.',
            costNote: 'I token LLM sono fatturati dal tuo fornitore, quindi hai tu il controllo.',
            privacy: 'Usiamo la tua chiave solo per questo tutor.',
            getKey: 'Ottieni una chiave API',
            consentLabel: 'Comprendo e accetto che la mia chiave API verrà memorizzata nel local storage del mio browser',
            consentRequired: 'Devi accettare la memorizzazione della chiave API nel local storage per continuare',
        },
        actions: {
            next: 'Avanti',
            back: 'Indietro',
            finish: 'Salva e inizia',
        },
        stepIndicator: (step: number, total: number) => `Passo ${step} di ${total}`,
    },
    learning: {
        title: 'Area di apprendimento',
        subtitle: 'Pratica schemi tattici e aperture',
        tacticalPatterns: 'Schemi tattici',
        openings: 'Aperture',
        comingSoon: 'Prossimamente',
        backToMenu: 'Torna al menu',
        patterns: {
            pin: 'Inchiodatura',
            skewer: 'Infilata',
            fork: 'Forchetta',
            discoveredCheck: 'Scacco di scoperta',
            doubleAttack: 'Doppio attacco',
            overloading: 'Sovraccarico',
            backRankWeakness: 'Debolezza dell\'ultima traversa',
            trappedPiece: 'Pezzo intrappolato',
        },
        practice: {
            title: 'Pratica tattica',
            hint: 'Suggerimento',
            makeYourMove: 'Fai la tua mossa sulla scacchiera',
            correct: 'Corretto! Ben fatto!',
            incorrect: 'Non proprio. Riprova!',
            tryAgain: 'Riprova',
            nextExercise: 'Prossimo esercizio',
            backToLearning: 'Torna all\'area di apprendimento',
            findTheMove: 'Trova la mossa che crea un',
        },
        openingTrainer: {
            loadingSession: 'Caricamento sessione di allenamento...',
            openingNotFound: 'Apertura non trovata',
            openingNotFoundDescription: 'L\'apertura richiesta non è stata trovata.',
            backToOpeningSelection: 'Torna alla selezione delle aperture',
            loadingBackground: 'Caricamento informazioni sull\'apertura...',
            noBackgroundInfo: 'Nessuna informazione disponibile per questa apertura.',
            wikipediaSource: 'Fonte: Wikipedia (in cache',
            deviationTitle: 'Hai lasciato l\'apertura!',
            deviationMessage: 'Hai studiato',
            deviationTip: 'Suggerimento: Puoi sempre tornare indietro usando la cronologia delle mosse',
            continuePlayingButton: 'Continua a giocare (Inizia partita)',
            undoReturnButton: 'Annulla e torna all\'apertura',
            exploreVariationButton: 'Esplora questa variante',
            move: 'mossa',
            moves: 'mosse',
            noMovesHint: 'Nessuna mossa ancora. Fai la tua prima mossa!',
        },
    },
};

const pl: Translations = {
    common: {
        close: 'Zamknij',
        cancel: 'Anuluj',
        confirm: 'Potwierdź',
        loading: 'Ładowanie...',
        error: 'Błąd',
        save: 'Zapisz',
        clearAllData: 'Wyczyść wszystkie dane',
        clearAllDataConfirm: 'Czy na pewno chcesz wyczyścić wszystkie dane? Spowoduje to usunięcie wszystkich zapisanych gier, ustawień i nazw użytkowników. Ta akcja jest nieodwracalna.',
        clearAllDataDescription: 'Usuń wszystkie zapisane gry, ustawienia i dane z pamięci podręcznej przeglądarki.',
    },
    header: {
        tagline: 'z Gemini i Stockfish',
        buyMeABeer: 'Postaw mi piwo',
        github: 'GitHub',
    },
    start: {
        title: 'Chess Tutor AI',
        settings: '1. Ustawienia',
        language: 'Język',
        apiKey: 'Klucz API LLM',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: 'Zdobądź darmowy klucz',
        startGame: 'Rozpocznij grę',
        resumeGame: 'Wznów poprzednią partię',
        startNewGame: 'Rozpocznij nową partię',
        chooseCoach: 'Wybierz swojego trenera:',
        importPosition: 'Importuj pozycję lub partię (FEN lub PGN)',
        importPositionPlaceholder: 'Wklej tutaj pozycję FEN lub partię PGN...',
        formatDetected: 'Wykryto format:',
        formatFen: 'Pozycja FEN',
        formatPgn: 'Partia PGN',
        formatInvalid: 'Nieprawidłowy format - wklej poprawny FEN lub PGN',
        apiKeyRequired: 'Podaj prawidłowy klucz API, aby kontynuować.',
        colorSelection: 'Wybierz kolor:',
        playAsWhite: 'Graj białymi',
        playAsBlack: 'Graj czarnymi',
        randomColor: 'Losowo',
        analyzeGame: 'Analizuj partię',
        learningArea: 'Strefa nauki',
        savedGamesTitle: 'Niedokończone partie',
        savedGamesEmpty: 'Brak niedokończonych partii.',
        opponentLabel: 'Przeciwnik',
        evaluationLabel: 'Ocena',
        noEvaluation: 'Brak oceny',
        deleteGame: 'Usuń partię',
        analyzeThisGame: 'Analizuj tę partię',
    },
    game: {
        playingAs: 'Grasz jako',
        vs: 'przeciw',
        backToMenu: '← Powrót do menu',
        stockfishStrength: 'Siła Stockfish',
        stockfishLevel: 'Poziom Stockfish',
        depth: 'Głębokość',
        undoMove: 'Cofnij ruch',
        resign: 'Poddaj partię',
        resignConfirm: 'Czy na pewno chcesz się poddać? Tej akcji nie można cofnąć.',
        resignation: 'Poddano partię.',
        gameHistory: 'Historia partii',
        analyze: 'Analizuj',
        noMovesYet: 'Brak ruchów.',
        white: 'Białe',
        black: 'Czarne',
        download: 'Pobierz',
        evalChange: 'Ocena Δ',
    },
    tutor: {
        aiCoach: 'Trener AI',
        askCoach: 'Zapytaj trenera...',
        hint: 'Podpowiedź',
        bestMove: 'Najlepszy ruch',
    },
    gameOver: {
        title: 'Koniec gry',
        checkmate: 'Mat!',
        youWon: 'Wygrana!',
        youLost: 'Przegrałeś.',
        draw: 'Remis!',
        stalemate: 'Pat!',
        mistakes: 'Twoje błędy',
        aiSummary: 'Podsumowanie AI',
        move: 'Ruch',
        evalBefore: 'Ocena przed',
        evalAfter: 'Ocena po',
        bestMove: 'Najlepszy ruch',
        newGame: 'Nowa partia',
    },
    analysis: {
        title: 'Analiza pozycji',
        currentPosition: 'Aktualna pozycja',
        evaluation: 'Ocena',
        bestMove: 'Najlepszy ruch',
        aiAnalysis: 'Analiza AI',
        playFromHere: 'Graj od tej pozycji',
        playDescription: 'Wybierz charakter, kolor i siłę silnika, aby grać od bieżącego ruchu.',
        chooseOpponent: 'Wybierz przeciwnika',
        chooseSide: 'Wybierz kolor',
        chooseStrength: 'Siła przeciwnika',
        startPlay: 'Graj odtąd',
        modeTitle: 'Analizuj istniejącą partię',
        modeDescription: 'Prześlij PGN lub FEN, aby coach przeprowadził Cię przez partię z pomocą silnika.',
        pasteLabel: 'Wejście PGN lub FEN',
        pastePlaceholder: 'Wklej PGN lub FEN, aby przeglądać partię ruch po ruchu...',
        chooseCoach: 'Wybierz osobowość trenera',
        orientation: 'Orientacja szachownicy',
        startButton: 'Rozpocznij analizę',
        next: 'Następny ruch',
        previous: 'Poprzedni ruch',
        step: 'Ruch',
        missedTactics: 'Przegapione taktyki',
        cpLoss: 'Zmiana oceny',
        none: 'Brak',
        opening: 'Otwarcie',
        enginePending: 'Ocena silnika w toku...',
        coachPending: 'Trener przygotowuje opinię...',
        importError: 'Nie udało się wczytać PGN ani FEN. Sprawdź zapis.',
        loadNewGame: 'Załaduj nową partię',
        openingsExplorer: 'Eksplorator otwarć',
        generatingExplanation: 'Generowanie wyjaśnienia...',
        noApiKey: 'Dodaj klucz API w ustawieniach.',
        askFollowUp: 'Zadaj pytanie uzupełniające o to otwarcie...',
        possibleOpenings: 'możliwe otwarcia',
        downloadGame: 'Pobierz grę',
        downloadPGN: 'Pobierz jako PGN',
        downloadFEN: 'Pobierz aktualną pozycję (FEN)',
        downloadTitle: 'Eksportuj grę',
    },
    apiKeyInput: {
        title: 'Wymagany klucz API',
        description: 'Podaj swój klucz Google Gemini, aby kontynuować.',
        placeholder: 'Wprowadź klucz API...',
        submit: 'Wyślij',
        getKey: 'Zdobądź darmowy klucz API',
    },
    onboarding: {
        welcome: {
            title: 'Chess Tutor AI',
            subtitle: 'Twój osobisty trener szachowy.',
            claim: 'Graj, ucz się i analizuj z pomocą Gemini i Stockfish.',
        },
        language: {
            title: 'Wybierz język',
            description: 'Dostosujemy doświadczenie i wiadomości do wybranego języka.',
        },
        value: {
            title: 'Twoje korzyści',
            bullets: [
                'Trenuj z osobowościami dopasowanymi do twojego stylu.',
                'Importuj FEN lub PGN i otrzymuj wskazówki na żywo podczas analizy.',
                'Połącz kreatywność Google Gemini z precyzją Stockfish.',
                'Zapisuj postęp lokalnie — wróć do gry w dowolnym momencie.',
            ],
        },
        api: {
            title: 'Dodaj swój klucz API LLM',
            description: 'Potrzebujemy klucza API twojego dostawcy LLM (dowolna usługa zgodna z OpenAI), aby generować ruchy i objaśnienia.',
            inputLabel: 'Klucz API LLM',
            placeholder: 'sk-... (lub klucz twojego dostawcy)',
            storage: 'Twój klucz jest przechowywany w przeglądarce i nigdy nie jest udostępniany.',
            serverUse: 'Wysyłamy go na nasz serwer tylko podczas wykonywania zapytań i nigdy go nie logujemy.',
            costNote: 'Tokeny LLM są rozliczane przez twojego dostawcę, więc masz kontrolę nad zużyciem.',
            privacy: 'Nigdy nie używamy twojego klucza do niczego poza tym trenerem.',
            getKey: 'Zdobądź klucz API',
            consentLabel: 'Rozumiem i zgadzam się, że mój klucz API będzie przechowywany w pamięci lokalnej mojej przeglądarki',
            consentRequired: 'Musisz wyrazić zgodę na przechowywanie klucza API w pamięci lokalnej, aby kontynuować',
        },
        actions: {
            next: 'Dalej',
            back: 'Wstecz',
            finish: 'Zapisz i zacznij grać',
        },
        stepIndicator: (step: number, total: number) => `Krok ${step} z ${total}`,
    },
    learning: {
        title: 'Strefa nauki',
        subtitle: 'Ćwicz wzorce taktyczne i otwarcia',
        tacticalPatterns: 'Wzorce taktyczne',
        openings: 'Otwarcia',
        comingSoon: 'Wkrótce',
        backToMenu: 'Powrót do menu',
        patterns: {
            pin: 'Związanie',
            skewer: 'Szpikulec',
            fork: 'Widły',
            discoveredCheck: 'Szach z odkrycia',
            doubleAttack: 'Podwójny atak',
            overloading: 'Przeciążenie',
            backRankWeakness: 'Słabość ostatniej linii',
            trappedPiece: 'Uwięziona figura',
        },
        practice: {
            title: 'Trening taktyczny',
            hint: 'Podpowiedź',
            makeYourMove: 'Wykonaj ruch na szachownicy',
            correct: 'Poprawnie! Dobra robota!',
            incorrect: 'Nie do końca. Spróbuj ponownie!',
            tryAgain: 'Spróbuj ponownie',
            nextExercise: 'Następne ćwiczenie',
            backToLearning: 'Powrót do strefy nauki',
            findTheMove: 'Znajdź ruch, który tworzy',
        },
        openingTrainer: {
            loadingSession: 'Ładowanie sesji treningowej...',
            openingNotFound: 'Nie znaleziono otwarcia',
            openingNotFoundDescription: 'Żądane otwarcie nie zostało znalezione.',
            backToOpeningSelection: 'Powrót do wyboru otwarcia',
            loadingBackground: 'Ładowanie informacji o otwarciu...',
            noBackgroundInfo: 'Brak informacji o tym otwarciu.',
            wikipediaSource: 'Źródło: Wikipedia (w pamięci podręcznej',
            deviationTitle: 'Opuściłeś otwarcie!',
            deviationMessage: 'Przestudiowałeś',
            deviationTip: 'Wskazówka: Zawsze możesz wrócić używając historii ruchów',
            continuePlayingButton: 'Kontynuuj grę (Rozpocznij partię)',
            undoReturnButton: 'Cofnij i wróć do otwarcia',
            exploreVariationButton: 'Zbadaj tę wariant',
            move: 'ruch',
            moves: 'ruchy',
            noMovesHint: 'Brak ruchów. Wykonaj swój pierwszy ruch!',
        },
    },
};

const zhCN: Translations = {
    common: {
        close: '关闭',
        cancel: '取消',
        confirm: '确认',
        loading: '加载中…',
        error: '错误',
        save: '保存',
        clearAllData: '清除所有数据',
        clearAllDataConfirm: '确定要清除所有数据吗？这将删除所有已保存的对局、设置和用户名，且无法撤销。',
        clearAllDataDescription: '从浏览器中移除所有已保存的对局、设置和缓存数据。',
    },
    header: {
        tagline: '由 Gemini 与 Stockfish 驱动',
        buyMeABeer: '请我喝杯啤酒',
        github: 'GitHub',
    },
    start: {
        title: '国际象棋导师 AI',
        settings: '1. 设置',
        language: '语言',
        apiKey: 'LLM API 密钥',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: '获取免费密钥',
        startGame: '开始对局',
        resumeGame: '继续上一局',
        startNewGame: '开始新对局',
        chooseCoach: '选择你的教练：',
        importPosition: '导入棋局或局面（FEN 或 PGN）',
        importPositionPlaceholder: '在此粘贴 FEN 局面或 PGN 棋谱…',
        formatDetected: '已识别格式：',
        formatFen: 'FEN 局面',
        formatPgn: 'PGN 棋谱',
        formatInvalid: '格式无效——请粘贴有效的 FEN 或 PGN',
        apiKeyRequired: '请输入有效的 API 密钥以继续。',
        colorSelection: '选择你的执棋方：',
        playAsWhite: '执白',
        playAsBlack: '执黑',
        randomColor: '随机',
        analyzeGame: '分析棋局',
        learningArea: '学习中心',
        savedGamesTitle: '未完成的棋局',
        savedGamesEmpty: '暂无未完成的棋局。',
        opponentLabel: '对手',
        evaluationLabel: '评估',
        noEvaluation: '暂无评估',
        deleteGame: '删除棋局',
        analyzeThisGame: '分析此局',
    },
    game: {
        playingAs: '执棋方',
        vs: '对',
        backToMenu: '← 返回菜单',
        stockfishStrength: 'Stockfish 强度',
        stockfishLevel: 'Stockfish 等级',
        depth: '深度',
        undoMove: '撤销上一步',
        resign: '认输',
        resignConfirm: '确定要认输吗？此操作无法撤销。',
        resignation: '你已认输。',
        gameHistory: '对局记录',
        analyze: '分析',
        noMovesYet: '还没有走子。',
        white: '白方',
        black: '黑方',
        download: '下载',
        evalChange: '评估变化',
    },
    tutor: {
        aiCoach: 'AI 教练',
        askCoach: '向你的教练提问…',
        hint: '提示',
        bestMove: '最佳着法',
    },
    gameOver: {
        title: '对局结束',
        checkmate: '将死！',
        youWon: '你赢了！',
        youLost: '你输了。',
        draw: '和棋！',
        stalemate: '逼和！',
        mistakes: '你的失误',
        aiSummary: 'AI 总结',
        move: '着法',
        evalBefore: '走子前评估',
        evalAfter: '走子后评估',
        bestMove: '最佳着法',
        newGame: '新对局',
    },
    analysis: {
        title: '局面分析',
        currentPosition: '当前局面',
        evaluation: '评估',
        bestMove: '最佳着法',
        aiAnalysis: 'AI 分析',
        playFromHere: '从此局面开始对弈',
        playDescription: '选择角色、执棋方和引擎强度，从当前着法继续对弈。',
        chooseOpponent: '选择对手',
        chooseSide: '选择你的执棋方',
        chooseStrength: '对手强度',
        startPlay: '从此开始',
        modeTitle: '分析已有棋局',
        modeDescription: '上传 PGN 或 FEN，让教练借助引擎逐着为你讲解。',
        pasteLabel: 'PGN 或 FEN 输入',
        pastePlaceholder: '在此粘贴 PGN 或 FEN，逐步回顾棋局…',
        chooseCoach: '选择教练风格',
        orientation: '棋盘方向',
        startButton: '开始分析',
        next: '下一着',
        previous: '上一着',
        step: '着法',
        missedTactics: '错过的战术',
        cpLoss: '评估变化',
        none: '未检测到',
        opening: '开局',
        enginePending: '正在运行引擎评估…',
        coachPending: '教练正在准备反馈…',
        importError: '无法加载该 PGN 或 FEN，请检查棋谱记法。',
        loadNewGame: '加载新棋局',
        openingsExplorer: '开局探索',
        generatingExplanation: '正在生成解说…',
        noApiKey: '请在设置中添加 API 密钥以获取开局讲解。',
        askFollowUp: '对此开局提问…',
        possibleOpenings: '个可能的开局',
        downloadGame: '下载棋局',
        downloadPGN: '下载为 PGN',
        downloadFEN: '下载当前局面（FEN）',
        downloadTitle: '导出棋局',
    },
    apiKeyInput: {
        title: '需要 API 密钥',
        description: '请输入你的 Google Gemini API 密钥以继续。',
        placeholder: '输入你的 API 密钥…',
        submit: '提交',
        getKey: '获取免费 API 密钥',
    },
    onboarding: {
        welcome: {
            title: '国际象棋导师 AI',
            subtitle: '你的专属教练，助你提升棋力。',
            claim: '在 Gemini 与 Stockfish 的 AI 指导下，对弈、学习与分析。',
        },
        language: {
            title: '选择你的语言',
            description: '我们将以你选择的语言个性化你的体验与后续消息。',
        },
        value: {
            title: '你将获得',
            bullets: [
                '与契合你风格的教练角色一起练习。',
                '导入 FEN 或 PGN，借助实时建议分析棋局。',
                '融合 Google Gemini 的创意与 Stockfish 的精准。',
                '进度保存在本地，随时继续。',
            ],
        },
        api: {
            title: '添加你的 LLM API 密钥',
            description: '我们需要你所用 LLM 服务商的 API 密钥（任何 OpenAI 兼容服务）来生成教练着法与解说。',
            inputLabel: 'LLM API 密钥',
            placeholder: 'sk-...（或你的服务商密钥）',
            storage: '你的密钥仅保存在浏览器中，绝不共享。',
            serverUse: '我们仅在发起请求时将其发送至服务器，且从不记录。',
            costNote: 'LLM Token 由你的服务商计费，用量由你掌控。',
            privacy: '我们绝不会将该密钥用于本导师之外的任何用途。',
            getKey: '获取 API 密钥',
            consentLabel: '我理解并同意将我的 API 密钥存储在浏览器的本地存储中',
            consentRequired: '你必须同意将 API 密钥存入本地存储才能继续',
        },
        actions: {
            next: '下一步',
            back: '上一步',
            finish: '保存并开始对弈',
        },
        stepIndicator: (step: number, total: number) => `第 ${step} 步，共 ${total} 步`,
    },
    learning: {
        title: '学习中心',
        subtitle: '练习战术套路与开局',
        tacticalPatterns: '战术套路',
        openings: '开局',
        comingSoon: '敬请期待',
        backToMenu: '返回菜单',
        patterns: {
            pin: '牵制',
            skewer: '串击',
            fork: '叉攻',
            discoveredCheck: '闪将',
            doubleAttack: '双重攻击',
            overloading: '过载',
            backRankWeakness: '底线的弱点',
            trappedPiece: '被困的子',
        },
        practice: {
            title: '战术练习',
            hint: '提示',
            makeYourMove: '在棋盘上走子',
            correct: '正确！做得好！',
            incorrect: '不太对，再试一次！',
            tryAgain: '再试一次',
            nextExercise: '下一题',
            backToLearning: '返回学习中心',
            findTheMove: '找出能形成以下战术的着法：',
        },
        openingTrainer: {
            loadingSession: '正在加载开局训练…',
            openingNotFound: '未找到开局',
            openingNotFoundDescription: '找不到所请求的开局。',
            backToOpeningSelection: '返回开局选择',
            loadingBackground: '正在加载开局背景…',
            noBackgroundInfo: '该开局暂无背景信息。',
            wikipediaSource: '来源：维基百科（已缓存',
            deviationTitle: '你已偏离开局！',
            deviationMessage: '你已学习',
            deviationTip: '提示：随时可通过着法记录返回',
            continuePlayingButton: '继续对弈（开始对局）',
            undoReturnButton: '撤销并返回开局',
            exploreVariationButton: '探索此变着',
            move: '着',
            moves: '着',
            noMovesHint: '还没有走子，请走出第一步！',
        },
    },
};

const zhTW: Translations = {
    common: {
        close: '關閉',
        cancel: '取消',
        confirm: '確認',
        loading: '載入中…',
        error: '錯誤',
        save: '儲存',
        clearAllData: '清除所有資料',
        clearAllDataConfirm: '確定要清除所有資料嗎？這將刪除所有已儲存的对局、設定與使用者名稱，且無法復原。',
        clearAllDataDescription: '從瀏覽器中移除所有已儲存的对局、設定與快取資料。',
    },
    header: {
        tagline: '由 Gemini 與 Stockfish 驅動',
        buyMeABeer: '請我喝杯啤酒',
        github: 'GitHub',
    },
    start: {
        title: '國際象棋導師 AI',
        settings: '1. 設定',
        language: '語言',
        apiKey: 'LLM API 金鑰',
        apiKeyPlaceholder: 'sk-... (your provider key)',
        getApiKey: '取得免費金鑰',
        startGame: '開始對局',
        resumeGame: '繼續上一局',
        startNewGame: '開始新對局',
        chooseCoach: '選擇你的教練：',
        importPosition: '匯入棋局或局面（FEN 或 PGN）',
        importPositionPlaceholder: '在此貼上 FEN 局面或 PGN 棋譜…',
        formatDetected: '已辨識格式：',
        formatFen: 'FEN 局面',
        formatPgn: 'PGN 棋譜',
        formatInvalid: '格式無效——請貼上有效的 FEN 或 PGN',
        apiKeyRequired: '請輸入有效的 API 金鑰以繼續。',
        colorSelection: '選擇你的執棋方：',
        playAsWhite: '執白',
        playAsBlack: '執黑',
        randomColor: '隨機',
        analyzeGame: '分析棋局',
        learningArea: '學習中心',
        savedGamesTitle: '未完成的對局',
        savedGamesEmpty: '暫無未完成的對局。',
        opponentLabel: '對手',
        evaluationLabel: '評估',
        noEvaluation: '尚無評估',
        deleteGame: '刪除對局',
        analyzeThisGame: '分析此局',
    },
    game: {
        playingAs: '執棋方',
        vs: '對',
        backToMenu: '← 返回選單',
        stockfishStrength: 'Stockfish 強度',
        stockfishLevel: 'Stockfish 等級',
        depth: '深度',
        undoMove: '撤銷上一步',
        resign: '認輸',
        resignConfirm: '確定要認輸嗎？此操作無法復原。',
        resignation: '你已認輸。',
        gameHistory: '對局記錄',
        analyze: '分析',
        noMovesYet: '還沒有走子。',
        white: '白方',
        black: '黑方',
        download: '下載',
        evalChange: '評估變化',
    },
    tutor: {
        aiCoach: 'AI 教練',
        askCoach: '向你的教練提問…',
        hint: '提示',
        bestMove: '最佳著法',
    },
    gameOver: {
        title: '對局結束',
        checkmate: '將死！',
        youWon: '你贏了！',
        youLost: '你輸了。',
        draw: '和棋！',
        stalemate: '逼和！',
        mistakes: '你的失誤',
        aiSummary: 'AI 總結',
        move: '著法',
        evalBefore: '走子前評估',
        evalAfter: '走子後評估',
        bestMove: '最佳著法',
        newGame: '新對局',
    },
    analysis: {
        title: '局面分析',
        currentPosition: '目前局面',
        evaluation: '評估',
        bestMove: '最佳著法',
        aiAnalysis: 'AI 分析',
        playFromHere: '從此局面開始對弈',
        playDescription: '選擇角色、執棋方與引擎強度，從目前著法繼續對弈。',
        chooseOpponent: '選擇對手',
        chooseSide: '選擇你的執棋方',
        chooseStrength: '對手強度',
        startPlay: '從此開始',
        modeTitle: '分析已有棋局',
        modeDescription: '上傳 PGN 或 FEN，讓教練借助引擎逐步為你講解。',
        pasteLabel: 'PGN 或 FEN 輸入',
        pastePlaceholder: '在此貼上 PGN 或 FEN，逐步回顧棋局…',
        chooseCoach: '選擇教練風格',
        orientation: '棋盤方向',
        startButton: '開始分析',
        next: '下一著',
        previous: '上一著',
        step: '著法',
        missedTactics: '錯過的戰術',
        cpLoss: '評估變化',
        none: '未偵測到',
        opening: '開局',
        enginePending: '正在執行引擎評估…',
        coachPending: '教練正在準備回饋…',
        importError: '無法載入該 PGN 或 FEN，請檢查棋譜記法。',
        loadNewGame: '載入新對局',
        openingsExplorer: '開局探索',
        generatingExplanation: '正在產生解說…',
        noApiKey: '請在設定中加入 API 金鑰以取得開局講解。',
        askFollowUp: '對此開局提問…',
        possibleOpenings: '個可能的開局',
        downloadGame: '下載對局',
        downloadPGN: '下載為 PGN',
        downloadFEN: '下載目前局面（FEN）',
        downloadTitle: '匯出對局',
    },
    apiKeyInput: {
        title: '需要 API 金鑰',
        description: '請輸入你的 Google Gemini API 金鑰以繼續。',
        placeholder: '輸入你的 API 金鑰…',
        submit: '提交',
        getKey: '取得免費 API 金鑰',
    },
    onboarding: {
        welcome: {
            title: '國際象棋導師 AI',
            subtitle: '你的專屬教練，助你提升棋力。',
            claim: '在 Gemini 與 Stockfish 的 AI 指導下，對弈、學習與分析。',
        },
        language: {
            title: '選擇你的語言',
            description: '我們將以你選擇的語言個人化你的體驗與後續訊息。',
        },
        value: {
            title: '你將獲得',
            bullets: [
                '與契合你風格的教練角色一起練習。',
                '匯入 FEN 或 PGN，借助即時建議分析棋局。',
                '融合 Google Gemini 的創意與 Stockfish 的精準。',
                '進度儲存在本地，隨時繼續。',
            ],
        },
        api: {
            title: '加入你的 LLM API 金鑰',
            description: '我們需要你所用 LLM 服務商的 API 金鑰（任何 OpenAI 相容服務）來產生教練著法與解說。',
            inputLabel: 'LLM API 金鑰',
            placeholder: 'sk-...（或你的服務商金鑰）',
            storage: '你的金鑰僅儲存在瀏覽器中，絕不共享。',
            serverUse: '我們僅在發起請求時將其發送至伺服器，且從不記錄。',
            costNote: 'LLM Token 由你的服務商計費，用量由你掌控。',
            privacy: '我們絕不會將該金鑰用於本導師之外的任何用途。',
            getKey: '取得 API 金鑰',
            consentLabel: '我理解並同意將我的 API 金鑰儲存在瀏覽器的本地儲存中',
            consentRequired: '你必須同意將 API 金鑰存入本地儲存才能繼續',
        },
        actions: {
            next: '下一步',
            back: '上一步',
            finish: '儲存並開始對弈',
        },
        stepIndicator: (step: number, total: number) => `第 ${step} 步，共 ${total} 步`,
    },
    learning: {
        title: '學習中心',
        subtitle: '練習戰術套路與開局',
        tacticalPatterns: '戰術套路',
        openings: '開局',
        comingSoon: '敬請期待',
        backToMenu: '返回選單',
        patterns: {
            pin: '牽制',
            skewer: '串擊',
            fork: '叉攻',
            discoveredCheck: '閃將',
            doubleAttack: '雙重攻擊',
            overloading: '過載',
            backRankWeakness: '底線的弱點',
            trappedPiece: '被困的子',
        },
        practice: {
            title: '戰術練習',
            hint: '提示',
            makeYourMove: '在棋盤上走子',
            correct: '正確！做得好！',
            incorrect: '不太對，再試一次！',
            tryAgain: '再試一次',
            nextExercise: '下一題',
            backToLearning: '返回學習中心',
            findTheMove: '找出能形成以下戰術的著法：',
        },
        openingTrainer: {
            loadingSession: '正在載入開局訓練…',
            openingNotFound: '未找到開局',
            openingNotFoundDescription: '找不到所請求的開局。',
            backToOpeningSelection: '返回開局選擇',
            loadingBackground: '正在載入開局背景…',
            noBackgroundInfo: '該開局暫無背景資訊。',
            wikipediaSource: '來源：維基百科（已快取',
            deviationTitle: '你已偏離開局！',
            deviationMessage: '你已學習',
            deviationTip: '提示：隨時可透過著法記錄返回',
            continuePlayingButton: '繼續對弈（開始對局）',
            undoReturnButton: '撤銷並返回開局',
            exploreVariationButton: '探索此變著',
            move: '著',
            moves: '著',
            noMovesHint: '還沒有走子，請走出第一步！',
        },
    },
};

export const languageNames: Record<SupportedLanguage, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    pl: 'Polski',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
};

export const translations: Record<SupportedLanguage, Translations> = {
    en,
    de,
    fr,
    it,
    pl,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
};

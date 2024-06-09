"use server";

import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";
import { chapters, lessons } from "@/lib/database/schema";

const dataDe = {
    "lection-8hg": {
        "title": "Quantenannealer: Eine Einführung",
        "description": "...Aber was genau sind Quantencomputer? Wie funktionieren sie? Auf diese Fragen und mehr gibt diese Einführungslektion eine Antwort!",
        "content": {
            "lesson-S6N": {
                "title": "Was ist ein Qubit?",
                "readingtime": 4,
            },
            "lesson-75N": {
                "title": "Das Innenleben von Quantenannealern",
                "readingtime": 3,
            },
            "lesson-XOQ": {
                "title": "Optimierungsprobleme und Anneals",
                "readingtime": 5,
            },
            "lesson-WrU": {
                "title": "Die QUBO-Gleichung",
                "readingtime": 6,
            },
            "lesson-Bwk": {
                "title": "Kommunikations-Schnittstelle: (Hamilton-)Matrizen",
                "readingtime": 4,
            }
        }
    },
    "lection-fC9": {
        "title": "Das N-Damen-Problem",
        "description": "Eine Frage nach optimalen Schachstellungen — für viele heutige Rechner nach wie vor komplex. Aber auch für Quantenphysik?",
        "content": {
            "lesson-uFZ": {
                "title": "Einführung zum N-Damen-Problem",
                "readingtime": 2,
            },
            "lesson-cOU": {
                "title": "Formulierung der QUBO-Gleichung",
                "readingtime": 3,
            },
            "lesson-t8i": {
                "title": "Von Koeffizienten zur Hamilton-Matrix",
                "readingtime": 2,
            },
            "lesson-qhs": {
                "title": "Experimentelle Ergebnisse (und Grenzen)",
                "readingtime": 4,
            },
            "lesson-rdx": {
                "title": "Möglichkeiten zur Optimierung",
                "readingtime": 2,
            },
            "lesson-nAh": {
                "title": "Bonus: Eine andere Perspektive auf die Kostenfunktion",
                "readingtime": 1,
            }
        }
    },
    "lection-chj": {
        "title": "Das Traveling-Salesman-Problem",
        "description": "Immer die richtige Route finden — geht das auch mit Quantencomputern als Navi? Das erfährst du in dieser Lektion!",
        "content": {
            "lesson-wgr": {
                "title": "Einführung zum Traveling-Salesman-Problem",
                "readingtime": 2,
            },
            "lesson-CWC": {
                "title": "Was ist Graphentheorie?",
                "readingtime": 3,
            },
            "lesson-Bgf": {
                "title": "Umwandlung der Problemstellung für Quantenannealer",
                "readingtime": 3,
            },
            "lesson-lNJ": {
                "title": "QUBO-Gleichung und Hamilton-Matrix",
                "readingtime": 5,
            },
            "lesson-56h": {
                "title": "Wie man Messungen verbessern kann",
                "readingtime": 4,
            },
            "lesson-IQu": {
                "title": "Optimierungen und Erweiterungen",
                "readingtime": 2,
            },
            "lesson-Y7A": {
                "title": "Bonus: Erstelle deine eigenen Graphen!",
                "readingtime": 1,
            }
        }
    },
    "lection-BiE": {
        "title": "Sudoku-Rätsel Lösen",
        "description": "Jeder kennt sie: Die magischen Zahlentabellen aus Japan. Schaffen sie es auch, das Gehirn von Quantenannealern zu fordern?",
        "content": {
            "lesson-2D9": {
                "title": "Einführung in die Prinzipien von Sudoku",
                "readingtime": 2,
            },
            "lesson-A3P": {
                "title": "QUBO-Gleichung: Naive vs. optimierte Formulierung",
                "readingtime": 5,
            },
            "lesson-PBv": {
                "title": "Experimentelle Ergebnisse",
                "readingtime": 2,
            },
            "lesson-kJN": {
                "title": "Bonus: Schlussfazit und Gratulation!",
                "readingtime": 2,
            }
        }
    }
}

const dataEn = {
    "lection-8hg": {
        "title": "Introduction To Quantum Annealers",
        "description": "...But what exactly are quantum computers? How do they work? These questions and more will be answered in this introductory lection!",
        "content": {
            "lesson-S6N": {
                "title": "What is a qubit?",
                "readingtime": 4,
            },
            "lesson-75N": {
                "title": "The inner workings of quantum annealers",
                "readingtime": 3,
            },
            "lesson-XOQ": {
                "title": "Optimization problems and anneals",
                "readingtime": 5,
            },
            "lesson-WrU": {
                "title": "The QUBO equation",
                "readingtime": 6,
            },
            "lesson-Bwk": {
                "title": "Communication interface: (Hamiltonian) matrices",
                "readingtime": 4,
            }
        }
    },
    "lection-fC9": {
        "title": "The N Queens Problem",
        "description": "The search for optimal chess positions  — still complex for many of today's computers. But also for quantum physics?",
        "content": {
            "lesson-uFZ": {
                "title": "Introduction to the N queens problem",
                "readingtime": 2,
            },
            "lesson-cOU": {
                "title": "Formulating the QUBO equation",
                "readingtime": 3,
            },
            "lesson-t8i": {
                "title": "From coefficients to the Hamiltonian matrix",
                "readingtime": 2,
            },
            "lesson-qhs": {
                "title": "Experimental results (and limitations)",
                "readingtime": 4,
            },
            "lesson-rdx": {
                "title": "Possibilities for optimization",
                "readingtime": 2,
            },
            "lesson-nAh": {
                "title": "Bonus: Another perspective on the cost function",
                "readingtime": 1,
            }
        }
    },
    "lection-chj": {
        "title": "The Traveling Salesman Problem",
        "description": "Always find the best route — is that also possible with quantum computers as a navigation system? Find out in this lection!",
        "content": {
            "lesson-wgr": {
                "title": "Introduction to the traveling salesman problem",
                "readingtime": 2,
            },
            "lesson-CWC": {
                "title": "What is graph theory?",
                "readingtime": 3,
            },
            "lesson-Bgf": {
                "title": "Transforming the problem for quantum annealers",
                "readingtime": 3,
            },
            "lesson-lNJ": {
                "title": "QUBO equation and Hamiltonian matrix",
                "readingtime": 5,
            },
            "lesson-56h": {
                "title": "How to improve measurements",
                "readingtime": 4,
            },
            "lesson-IQu": {
                "title": "Optimizations and enhancements",
                "readingtime": 2,
            },
            "lesson-Y7A": {
                "title": "Bonus: Create your own graphs!",
                "readingtime": 1,
            }
        }
    },
    "lection-BiE": {
        "title": "Solving Sudoku Riddles",
        "description": "Everyone recognizes them: The magic number tables from Japan. Do they also manage to challenge the brains of quantum anealers?",
        "content": {
            "lesson-2D9": {
                "title": "Introduction to the principles of Sudoku",
                "readingtime": 2,
            },
            "lesson-A3P": {
                "title": "QUBO equation: Naive vs. optimized formulation",
                "readingtime": 5,
            },
            "lesson-PBv": {
                "title": "Experimental results",
                "readingtime": 2,
            },
            "lesson-kJN": {
                "title": "Bonus: Final conclusion and congratulations!",
                "readingtime": 2,
            }
        }
    }
}

function makeURLFriendly(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD") // Normalize the string to NFD (Normalization Form D)
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
}

export async function postOutline() {
    let chapterPos = 0;

    for (const [lectionId, lectionData] of Object.entries(dataEn)) {
        const chapterId = makeURLFriendly(lectionData.title);
        const chapterData = {
            chapterId,
            locale: "en",
            title: lectionData.title,
            description: lectionData.description,
            iconPath: `icons-and-thumbnails/${chapterId}/icon.riv`,
            thumbnailPath: `icons-and-thumbnails/${chapterId}/thumbnail.riv`,
            position: chapterPos,
        };

        await db.insert(chapters).values(chapterData);
        const lessonIds = [];

        let position = 0;
        for (const [lessonId, lessonData] of Object.entries(lectionData.content)) {
            const lessonFriendlyId = makeURLFriendly(lessonData.title);
            const lessonDataToInsert = {
                lessonId: lessonFriendlyId,
                chapter: chapterId,
                title: lessonData.title,
                readTime: lessonData.readingtime,
                position
            };

            await db.insert(lessons).values(lessonDataToInsert);
            lessonIds.push(lessonFriendlyId);
            position++;
        }

        // Update the chapter row with the collected lesson IDs
        await db.update(chapters).set({ lessons: lessonIds }).where(eq(chapters.chapterId, chapterId));
        chapterPos++;
    }
}
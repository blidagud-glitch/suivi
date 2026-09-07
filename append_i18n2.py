import json

missing_translations = {
    "Partie II — État d'avancement et diagnostic": "الجزء الثاني - حالة التقدم والتشخيص",
    "Suivi de la présentation au GUD et conditions de réalisation (Capital, Financement).": "متابعة الحضور لدى الشباك الوحيد اللامركزي وشروط الإنجاز (رأس المال، التمويل).",
    "4. Suivi de la présentation au GUD": "4. متابعة حضور صاحب المشروع لدى الشباك الوحيد اللامركزي",
    "4.1 Présentation au GUD (Le promoteur s'est-il présenté ?)": "4.1 الحضور لدى الشباك الوحيد اللامركزي (هل حضر صاحب المشروع؟)",
    "4.2. Proposition d'un autre rendez-vous": "4.2 اقتراح موعد آخر",
    "Oui": "نعم",
    "Non": "لا",
    "Autre :": "أخرى:",
    "Date prévue :": "التاريخ المقترح:",
    "Précisez...": "يرجى التوضيح...",
    "4.3 Motif de non-présentation ou de non-renseignement": "4.3 سبب عدم الحضور أو عدم استيفاء الاستمارة",
    "5. Informations sur les conditions de réalisation du projet": "5. معلومات حول شروط إنجاز المشروع",
    "5.1. Répartition du capital :": "5.1 توزيع رأس المال:",
    "N°": "رقم",
    "Associé / Actionnaire": "الشريك / المساهم",
    "Nationalité": "الجنسية",
    "Part du capital (%)": "حصة رأس المال (%)",
    "Montant": "المبلغ",
    "Devise (USD/Euro)": "العملة (دولار أمريكي/يورو)",
    "Total:": "المجموع:",
    "+ Ajouter un associé": "+ إضافة شريك",
    "La répartition totale devrait être de 100%": "يجب أن يكون إجمالي التوزيع 100%",
    "5.2. Financement :": "5.2 التمويل:",
    "5.2.1. Le projet nécessite-t-il un crédit bancaire ?": "5.2.1 هل يحتاج المشروع إلى قرض بنكي؟",
    "Oui (Aller à la question 5.2.2)": "نعم (الانتقال إلى السؤال 5.2.2)",
    "Non (Aller à la question 5.3)": "لا (الانتقال إلى السؤال 5.3)",
    "5.2.2. Si oui, quel est l'état d'avancement de votre demande de crédit ?": "5.2.2 إذا كانت الإجابة بنعم، ما هي حالة تقدم طلب القرض الخاص بكم؟",
}

with open('src/lib/i18n.ts', 'r') as f:
    content = f.read()

import re

insertion_str = ""
for k, v in missing_translations.items():
    if f'"{k}"' not in content:
        k_safe = k.replace('"', '\\"')
        v_safe = v.replace('"', '\\"')
        insertion_str += f'  "{k_safe}": "{v_safe}",\n'

idx = content.find('export const translations: Record<string, string> = {')
if idx != -1:
    content = content[:idx+53] + "\n" + insertion_str + content[idx+53:]

with open('src/lib/i18n.ts', 'w') as f:
    f.write(content)


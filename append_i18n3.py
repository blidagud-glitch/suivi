import json

missing_translations = {
    "5.3 Foncier": "5.3 العقار",
    "Le projet nécessite-t-il une assiette foncière ?": "هل يتطلب المشروع وعاء عقاريا؟",
    "Oui": "نعم",
    "Non": "لا",
    "Type de foncier": "نوع العقار",
    "Sélectionner": "اختر",
    "Industriel": "صناعي",
    "Urbain": "حضري",
    "Touristique": "سياحي",
    "Agricole": "فلاحي",
    "Superficie prévue (m²)": "المساحة المبرمجة (م²)",
    "Localisation (Commune / Wilaya)": "الموقع (البلدية / الولاية)",
    "5.3.5. Mode d'accès au foncier": "5.3.5 طريقة الحصول على العقار",
    "5.3.6. État d'avancement des démarches foncières": "5.3.6 حالة تقدم الإجراءات العقارية",
    "5.4. Permis de construire :": "5.4 رخصة البناء:",
    "5.4.1. Le projet nécessite-t-il un permis de construire ?": "5.4.1 هل يتطلب المشروع رخصة بناء؟",
    "Oui (Aller à la question 5.4.2)": "نعم (الانتقال إلى السؤال 5.4.2)",
    "Non (Aller à la question 5.5)": "لا (الانتقال إلى السؤال 5.5)",
    "5.4.2. État d'avancement des démarches pour l'obtention du permis de construire": "5.4.2 حالة تقدم الإجراءات للحصول على رخصة البناء",
    "Aucune démarche engagée": "لم يتم اتخاذ أي إجراء",
    "Demande déposée → Date du dépôt :": "تم إيداع الطلب ← تاريخ الإيداع:",
    "Dossier en cours d'instruction": "الملف قيد الدراسة",
    "Permis obtenu → Date d'obtention :": "تم الحصول على الرخصة ← تاريخ الحصول:",
    "Réserves formulées": "تحفظات مسجلة",
    "Dossier rejeté": "الملف مرفوض",
    "5.5 Programme prévisionnel d’importation (PPI)": "5.5 البرنامج التقديري للاستيراد (PPI)",
    "5.5.1. Le projet nécessite-t-il l’accomplissement de formalités relatives au PPI ?": "5.5.1 هل يتطلب المشروع استكمال إجراءات متعلقة بالبرنامج التقديري للاستيراد؟",
    "Oui (continuer)": "نعم (متابعة)",
    "Date de dépôt :": "تاريخ الإيداع:",
    "Non (Aller à la question 6)": "لا (الانتقال إلى السؤال 6)",
    "5.5.2. État d’avancement de la demande relative au PPI": "5.5.2 حالة تقدم الطلب المتعلق بالبرنامج التقديري للاستيراد",
    "5.5.3. Date de dépôt de la demande :": "5.5.3 تاريخ إيداع الطلب:",
    "Date :": "التاريخ:",
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


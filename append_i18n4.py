import json

missing_translations = {
    "Montant d'investissement réalisé (en DA) :": "مبلغ الاستثمار المنجز (بالدينار الجزائري):",
    "Nombre d'emplois créés :": "عدد مناصب الشغل المستحدثة:",
    "i. Exécution :": "1. تنفيذ:",
    "ii. Maitrise :": "2. تحكم:",
    "iii. Cadre :": "3. إطار:",
    "Taux global d'avancement physique estimé (%) :": "النسبة الإجمالية المقدرة للتقدم المادي (%):",
    "Taux d'utilisation des capacité de production (%) :": "نسبة استخدام طاقة الإنتاج (%):",
    "Sélectionner la contrainte principale": "تحديد العائق الرئيسي",
    "6. Etat d'avancement du projet": "6. حالة تقدم المشروع",
    "6.1. Etat actuel du projet": "6.1 الحالة الحالية للمشروع",
    "6.2. Si Abandonné, Annulé, en Arrêt": "6.2 إذا كان متخلى عنه، ملغى، في توقف",
    "6.4. Perspectives de relance/de mise en exécution du projet": "6.4 آفاق إعادة إطلاق/تنفيذ المشروع",
    "Le projet présente-t-il des perspectives de relance/Mise en exécution ?": "هل يقدم المشروع آفاقا لإعادة الإطلاق/التنفيذ؟",
    "6.5. Date prévisionnelle de relance ou d'entame du projet :": "6.5 التاريخ المتوقع لإعادة الإطلاق أو بدء المشروع:",
    "6.6. En cours de réalisation : procédures et démarches réalisées": "6.6 قيد الإنجاز: الإجراءات والخطوات المنجزة",
    "6.7. Mise en exploitation :": "6.7 الدخول في الاستغلال:",
    "6.8. Réalisation :": "6.8 الإنجاز:",
    "6.9. Date prévue de pleine exploitation :": "6.9 التاريخ المتوقع للاستغلال الكامل:",
    "7. Types de soutien supplémentaire": "7. أنواع الدعم الإضافي",
    "Autre": "أخرى",
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


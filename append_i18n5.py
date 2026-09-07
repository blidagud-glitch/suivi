import json

missing_translations = {
    "8. Suivi du traitement des projets": "8. متابعة معالجة المشاريع",
    "8.1. Action engagée pour lever l'obstacle": "8.1 الإجراء المتخذ لرفع العقبة",
    "8.2. Partie intervenante": "8.2 الجهة المتدخلة",
    "8.3. État du traitement": "8.3 حالة المعالجة",
    "8.4. Échéance de traitement": "8.4 أجل المعالجة",
    "Date prévue de réalisation ou d'achèvement de l'action :": "التاريخ المتوقع لإنجاز أو استكمال الإجراء:",
    "Si aucune échéance n'est fixée, ne pas renseigner cette rubrique.": "إذا لم يحدد أي أجل، يرجى عدم ملء هذه الخانة.",
    "8.5. Résultat du traitement (À la date de l'exercice)": "8.5 نتيجة المعالجة (في تاريخ التقييم)",
    "8.6. Date de mise à jour du suivi": "8.6 تاريخ تحديث المتابعة",
    "Date du dernier suivi ou de la dernière action réalisée :": "تاريخ آخر متابعة أو آخر إجراء تم اتخاذه:",
    "Observations :": "ملاحظات:",
    "8.7. Possibilité de réactivation du projet": "8.7 إمكانية إعادة تفعيل المشروع",
    "Signature Numérique du Promoteur": "التوقيع الإلكتروني لصاحب المشروع",
    "Veuillez signer dans le cadre ci-dessous avant de valider le formulaire.": "يرجى التوقيع في الإطار أدناه قبل تأكيد الاستمارة.",
    "Effacer": "مسح",
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


with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "import { initialFormState, FormState } from './types';",
    "import { initialFormState, FormState } from './types';\nimport { LanguageProvider } from './lib/LanguageContext';"
)

content = content.replace(
    "export default function App() {",
    "export default function App() {\n  return (\n    <LanguageProvider>\n      <AppContent />\n    </LanguageProvider>\n  );\n}\n\nfunction AppContent() {"
)

with open("src/App.tsx", "w") as f:
    f.write(content)

#!/bin/bash

echo "🧼 Cleaning up backend environment..."

# Gå til backend
cd backend || { echo "❌ 'backend/' directory not found"; exit 1; }

# 1. Slett node_modules og dist
rm -rf node_modules dist
echo "✅ Removed 'node_modules/' and 'dist/'"

# 2. Legg til .gitignore-innhold hvis det ikke finnes
grep -qxF 'node_modules/' .gitignore || echo 'node_modules/' >> .gitignore
grep -qxF 'dist/' .gitignore || echo 'dist/' >> .gitignore
echo "✅ Ensured 'node_modules/' and 'dist/' are in .gitignore"

# 3. Fjern fra Git cache hvis de har blitt versjonert
git rm -r --cached node_modules dist 2>/dev/null
echo "✅ Cleaned up Git cache (if applicable)"

# 4. Vis status
echo ""
echo "📦 Git status:"
git status

echo ""
echo "🎉 Done! You can now commit the cleanup:"
echo "   git commit -m 'Cleaned node_modules and dist; updated .gitignore'"
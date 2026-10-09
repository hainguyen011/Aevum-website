import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CONTENT_DIR = path.resolve(rootDir, 'content');
const DOCS_CONTENT_DIR = path.resolve(CONTENT_DIR, 'docs');
const EXPLORE_CONTENT_DIR = path.resolve(CONTENT_DIR, 'explore');
const MEDIA_CONTENT_DIR = path.resolve(CONTENT_DIR, 'media');
const PUBLIC_MEDIA_DIR = path.resolve(rootDir, 'public/assets/content');

const GENERATED_DOCS_JSON = path.resolve(rootDir, 'src/data/generatedDocs.json');
const GENERATED_CURRICULUM_JSON = path.resolve(rootDir, 'src/data/generatedCurriculum.json');

// Simple YAML Frontmatter Serializer & Parser (zero external dependencies)
function stringifyFrontmatter(data, content) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${JSON.stringify(item)}`);
      }
    } else if (typeof value === 'object') {
      lines.push(`${key}:`);
      for (const [subKey, subVal] of Object.entries(value)) {
        lines.push(`  ${subKey}: ${JSON.stringify(subVal)}`);
      }
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push('---');
  lines.push('');
  lines.push(content.trim());
  lines.push('');
  return lines.join('\n');
}

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent.trim() };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const data = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey = null;
  let isArray = false;
  let isSubObject = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // Sub-item list (  - "value")
    if (line.match(/^\s+-\s+(.*)$/) && currentKey && isArray) {
      const valStr = line.match(/^\s+-\s+(.*)$/)[1].trim();
      try {
        data[currentKey].push(JSON.parse(valStr));
      } catch {
        data[currentKey].push(valStr.replace(/^["']|["']$/g, ''));
      }
      continue;
    }

    // Sub-object property (  subKey: "value")
    if (line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/) && currentKey && isSubObject) {
      const subMatch = line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/);
      const subKey = subMatch[1];
      const subValStr = subMatch[2].trim();
      try {
        data[currentKey][subKey] = subValStr ? JSON.parse(subValStr) : '';
      } catch {
        data[currentKey][subKey] = subValStr.replace(/^["']|["']$/g, '');
      }
      continue;
    }

    // Top-level property (key: value or key:)
    const topMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (topMatch) {
      currentKey = topMatch[1];
      const valStr = topMatch[2].trim();

      if (!valStr) {
        // Peek next line to see if it's array or sub-object
        const nextLine = lines[i + 1] || '';
        if (nextLine.trim().startsWith('-')) {
          isArray = true;
          isSubObject = false;
          data[currentKey] = [];
        } else {
          isArray = false;
          isSubObject = true;
          data[currentKey] = {};
        }
      } else {
        isArray = false;
        isSubObject = false;
        try {
          data[currentKey] = JSON.parse(valStr);
        } catch {
          data[currentKey] = valStr.replace(/^["']|["']$/g, '');
        }
      }
    }
  }

  return { data, content };
}

// Ensure base directories exist
function ensureDirs() {
  [CONTENT_DIR, DOCS_CONTENT_DIR, EXPLORE_CONTENT_DIR, MEDIA_CONTENT_DIR, PUBLIC_MEDIA_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

/**
 * 1. EXPORT MODE: Extract hardcoded JS datasets into individual Markdown files
 */
async function exportContentFromCodebase() {
  ensureDirs();
  console.log('🚀 [Content Sync] Bắt đầu xuất tài liệu hiện hữu sang Markdown files...');

  // 1. Export Docs
  const { docsData } = await import('../src/data/docsData.js');
  console.log(`📄 Tìm thấy ${docsData.length} tài liệu trong docsData.js`);

  docsData.forEach((doc, idx) => {
    const filename = `${String(idx + 1).padStart(2, '0')}-${doc.id}.md`;
    const targetFile = path.resolve(DOCS_CONTENT_DIR, filename);

    const meta = {
      id: doc.id,
      title: doc.title,
      category: doc.category,
      order: idx + 1
    };

    const mdString = stringifyFrontmatter(meta, doc.content);
    fs.writeFileSync(targetFile, mdString, 'utf-8');
    console.log(`   ✓ Exported: ${filename}`);
  });

  // 2. Export Curriculum / Explore
  const { curriculumModules } = await import('../src/data/learningCurriculum.js');
  console.log(`🎓 Tìm thấy ${curriculumModules.length} Modules giáo trình Explore`);

  curriculumModules.forEach((mod, modIdx) => {
    const modDir = path.resolve(EXPLORE_CONTENT_DIR, `${String(modIdx + 1).padStart(2, '0')}-${mod.id}`);
    if (!fs.existsSync(modDir)) {
      fs.mkdirSync(modDir, { recursive: true });
    }

    // Save module metadata
    const moduleMeta = {
      id: mod.id,
      title: mod.title,
      categoryName: mod.categoryName,
      badgeColor: mod.badgeColor,
      description: mod.description,
      order: modIdx + 1
    };
    fs.writeFileSync(path.resolve(modDir, '_module.json'), JSON.stringify(moduleMeta, null, 2), 'utf-8');

    // Save each lesson
    mod.lessons.forEach((lesson, lessonIdx) => {
      const lessonFilename = `${String(lessonIdx + 1).padStart(2, '0')}-${lesson.id}.md`;
      const lessonFile = path.resolve(modDir, lessonFilename);

      const lessonMeta = {
        id: lesson.id,
        title: lesson.title,
        category: lesson.category,
        targetAudience: lesson.targetAudience,
        readTime: lesson.readTime,
        level: lesson.level,
        tags: lesson.tags || [],
        author: lesson.author,
        summary: lesson.summary,
        order: lessonIdx + 1
      };

      const mdString = stringifyFrontmatter(lessonMeta, lesson.content);
      fs.writeFileSync(lessonFile, mdString, 'utf-8');
      console.log(`   ✓ [${mod.id}] Exported: ${lessonFilename}`);
    });
  });

  console.log('✨ [Content Sync] Xuất dữ liệu hoàn tất 100%! Toàn bộ tài liệu đã nằm trong `content/`');
}

/**
 * 2. COMPILE MODE: Read Markdown files and compile to optimized JSON for runtime/prerender
 */
function compileContentToJSON() {
  ensureDirs();
  console.log('⚡ [Content Sync] Bắt đầu quét và biên dịch Markdown ➔ JSON dataset...');

  // 0. Sync media files from content/media to public/media
  const publicMediaDir = path.resolve(rootDir, 'public/media');
  if (!fs.existsSync(publicMediaDir)) {
    fs.mkdirSync(publicMediaDir, { recursive: true });
  }
  if (fs.existsSync(MEDIA_CONTENT_DIR)) {
    const mediaFiles = fs.readdirSync(MEDIA_CONTENT_DIR);
    mediaFiles.forEach((file) => {
      const srcFile = path.resolve(MEDIA_CONTENT_DIR, file);
      const destFile = path.resolve(publicMediaDir, file);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    });
    console.log(`   ✓ Đồng bộ ${mediaFiles.length} media files vào public/media`);
  }

  // 1. Compile Docs
  const docFiles = fs.readdirSync(DOCS_CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const docsList = [];

  docFiles.forEach((file) => {
    const filePath = path.resolve(DOCS_CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(raw);

    const docId = data.id || file.replace(/^\d+-/, '').replace(/\.md$/, '');
    docsList.push({
      id: docId,
      title: data.title || docId,
      category: data.category || 'Tài liệu',
      order: data.order !== undefined ? data.order : 999,
      content: content
    });
  });

  docsList.sort((a, b) => a.order - b.order);
  fs.writeFileSync(GENERATED_DOCS_JSON, JSON.stringify(docsList, null, 2), 'utf-8');
  console.log(`   ✓ Đã biên dịch ${docsList.length} tài liệu Docs ➔ generatedDocs.json`);

  // 2. Compile Explore Modules
  const exploreDirs = fs
    .readdirSync(EXPLORE_CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const modulesList = [];

  exploreDirs.forEach((dirName) => {
    const dirPath = path.resolve(EXPLORE_CONTENT_DIR, dirName);
    const metaFile = path.resolve(dirPath, '_module.json');
    let modMeta = {};
    if (fs.existsSync(metaFile)) {
      try {
        modMeta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
      } catch (err) {
        console.warn(`Lỗi đọc _module.json tại ${dirName}:`, err);
      }
    }

    const moduleId = modMeta.id || dirName.replace(/^\d+-/, '');
    const lessonFiles = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
    const lessonsList = [];

    lessonFiles.forEach((f) => {
      const filePath = path.resolve(dirPath, f);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = parseFrontmatter(raw);

      const lessonId = data.id || f.replace(/^\d+-/, '').replace(/\.md$/, '');
      lessonsList.push({
        id: lessonId,
        title: data.title || lessonId,
        coverImage: data.coverImage || data.image || '/media/7c9853f453cc1123e6b41db03292d945.jpg',
        category: data.category || modMeta.categoryName || 'Khám phá',
        targetAudience: data.targetAudience || 'Lập trình viên & Người học',
        readTime: data.readTime || '5 phút',
        level: data.level || 'Cơ bản',
        tags: data.tags || [],
        author: data.author || {
          id: 'an',
          name: 'An',
          role: 'AI Companion',
          aid: 'ENG-AN-7B9F1D'
        },
        summary: data.summary || '',
        order: data.order !== undefined ? data.order : 999,
        content: content
      });
    });

    lessonsList.sort((a, b) => a.order - b.order);

    modulesList.push({
      id: moduleId,
      title: modMeta.title || moduleId,
      categoryName: modMeta.categoryName || 'Chủ đề',
      badgeColor: modMeta.badgeColor || 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10',
      description: modMeta.description || '',
      order: modMeta.order !== undefined ? modMeta.order : 999,
      lessons: lessonsList
    });
  });

  modulesList.sort((a, b) => a.order - b.order);
  fs.writeFileSync(GENERATED_CURRICULUM_JSON, JSON.stringify(modulesList, null, 2), 'utf-8');
  console.log(`   ✓ Đã biên dịch ${modulesList.length} Modules giáo trình Explore ➔ generatedCurriculum.json`);

  // 3. Write compiled JS datasets for transparent runtime & SSR compatibility
  const docsDataJsPath = path.resolve(rootDir, 'src/data/docsData.js');
  const curriculumJsPath = path.resolve(rootDir, 'src/data/learningCurriculum.js');

  const docsJsContent = `// Auto-generated by scripts/sync-content.mjs from content/docs/\n// Source of truth: content/docs/*.md\n\nexport const docsData = ${JSON.stringify(docsList, null, 2)};\n`;
  fs.writeFileSync(docsDataJsPath, docsJsContent, 'utf-8');
  console.log(`   ✓ Đồng bộ mã nguồn: src/data/docsData.js`);

  const curriculumJsContent = `// Auto-generated by scripts/sync-content.mjs from content/explore/\n// Source of truth: content/explore/*/*.md\n\nexport const curriculumModules = ${JSON.stringify(modulesList, null, 2)};\n\nexport const findLessonById = (lessonId) => {\n  for (const mod of curriculumModules) {\n    const found = mod.lessons.find((l) => l.id === lessonId);\n    if (found) {\n      return { lesson: found, module: mod };\n    }\n  }\n  return { lesson: curriculumModules[0]?.lessons[0], module: curriculumModules[0] };\n};\n`;
  fs.writeFileSync(curriculumJsPath, curriculumJsContent, 'utf-8');
  console.log(`   ✓ Đồng bộ mã nguồn: src/data/learningCurriculum.js`);

  console.log('🎉 [Content Sync] Toàn bộ dữ liệu Markdown đã được biên dịch thành công 100%!');
}

// CLI Command Router
const args = process.argv.slice(2);
if (args.includes('--export')) {
  exportContentFromCodebase();
} else {
  // If content directory is empty, run export first
  ensureDirs();
  const docFiles = fs.existsSync(DOCS_CONTENT_DIR) ? fs.readdirSync(DOCS_CONTENT_DIR).filter((f) => f.endsWith('.md')) : [];
  if (docFiles.length === 0) {
    console.log('ℹ️ Thư mục `content/` đang trống. Tự động xuất nội dung từ codebase trước...');
    exportContentFromCodebase().then(() => {
      compileContentToJSON();
    });
  } else {
    compileContentToJSON();
  }
}

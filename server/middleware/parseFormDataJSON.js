export const parseFormDataJSON = (req, res, next) => {
    if (typeof req.body.dimensions === 'string') {
        try {
            const parsed = JSON.parse(req.body.dimensions);
            if (typeof parsed === 'object' && parsed !== null) {
                // 🔄 Перетворення colors на масив, якщо потрібно
                if (typeof parsed.colors === 'string') {
                    parsed.colors = parsed.colors.split(',').map(c => c.trim()).filter(Boolean);
                }
                if (!Array.isArray(parsed.colors)) {
                    parsed.colors = [parsed.colors];
                }

                req.body.dimensions = parsed;
                console.log('✅ Parsed dimensions:', req.body.dimensions);
            }
        } catch (err) {
            console.warn('⚠️ Failed to parse dimensions:', err.message);
        }
    }
    next();
};

/*export const logRequestBodyTypes = (req, res, next) => {
  console.log('🧾 Incoming POST data:');

  // 🔍 Перебираємо всі ключі в req.body
  Object.entries(req.body).forEach(([key, value]) => {
    const type = Array.isArray(value) ? 'array' : typeof value;
    console.log(`  🔹 ${key}: ${type}`);
  });

  // 📦 Якщо є файл або файли
  if (req.file) {
    console.log(`  📁 file: ${req.file.originalname} (${req.file.mimetype})`);
  }

  if (req.files && Array.isArray(req.files)) {
    req.files.forEach((file, index) => {
      console.log(`  📁 file[${index}]: ${file.originalname} (${file.mimetype})`);
    });
  }

  next();
};/*

/*

curl -X POST http://localhost:3005/store \
  -F "title=karas" \
  -F "description=szczukająjólai" \
  -F "price=800" \
  -F "length":55\
  -F "height":5\
  -F "width":4\
  -F "weight":25,\
  -F "colors":["black","red"]}\
  -F "image=@R.jpg"


  */
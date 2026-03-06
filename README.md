# Green Earth 🌿

## 🌱 প্রজেক্ট পরিচিতি (Project Introduction)

**Green Earth** হলো একটি গাছের অনলাইন দোকান। এখানে আপনি বিভিন্ন ধরনের গাছ দেখতে এবং কিনতে পারবেন।

### এই প্রজেক্টে কী কী আছে?

| ফাইল | কাজ |
|------|-----|
| `index.html` | ওয়েবসাইটের মূল গঠন (কাঠামো) |
| `style.css` | ওয়েবসাইটের ডিজাইন ও রঙ |
| `script.js` | ওয়েবসাইটের সব কার্যকারিতা (JavaScript) |

### কীভাবে চালাবেন?

1. `index.html` ফাইলটি যেকোনো ব্রাউজারে (Chrome, Firefox) খুলুন।
2. ওয়েবসাইটটি ইন্টারনেট থেকে গাছের তথ্য আনবে।
3. বাম দিকে ক্যাটাগরি বাটন, মাঝে গাছের কার্ড, ডানে কার্ট দেখতে পাবেন।

> **⚠️ সমস্যা হলে (If there's an issue):**
> সরাসরি ফাইল খুললে কখনো কখনো API কাজ না-ও করতে পারে (CORS সমস্যা)।
> সেক্ষেত্রে একটি লোকাল সার্ভার ব্যবহার করুন:
> - **VS Code**: "Live Server" এক্সটেনশন ইনস্টল করে `index.html`-এ রাইট ক্লিক → "Open with Live Server"
> - **Python**: টার্মিনালে `python -m http.server 8000` চালিয়ে `http://localhost:8000` খুলুন
> - **Node.js**: `npx http-server` চালিয়ে দেখানো লিঙ্কটি খুলুন

### ওয়েবসাইটটি কীভাবে কাজ করে?

```
পেজ লোড হয়
    ↓
API থেকে ক্যাটাগরি আনা হয় → বাম পাশে বাটন তৈরি হয়
    ↓
API থেকে সব গাছ আনা হয় → মাঝখানে কার্ড দেখায়
    ↓
কোনো গাছে ক্লিক করলে → মোডালে বিস্তারিত দেখায়
    ↓
"Cart" বাটনে ক্লিক করলে → ডান পাশে কার্টে যোগ হয়
```

### ব্যবহৃত টেকনোলজি

- **HTML** - ওয়েবপেজের কাঠামো
- **CSS / Tailwind CSS** - ডিজাইন ও স্টাইলিং
- **DaisyUI** - সুন্দর UI কম্পোনেন্ট (বাটন, কার্ড, মোডাল)
- **JavaScript** - ডেটা লোড, কার্ট ম্যানেজমেন্ট
- **REST API** - ইন্টারনেট থেকে গাছের তথ্য আনা

---

## 🌴 API Endpoints

> **API কী?** (What is API?)
> API হলো দুটি প্রোগ্রামের মধ্যে যোগাযোগের রাস্তা।
> এখানে আমাদের ওয়েবসাইট একটি সার্ভার থেকে গাছের তথ্য নিয়ে আসে।
> `fetch()` ফাংশন দিয়ে এই লিঙ্কগুলোতে request পাঠানো হয়।

## 1. Get 🌴 All Categories

> **এই API কী করে?**
> এই লিঙ্ক থেকে সব ক্যাটাগরির তালিকা আনা হয়।
> যেমন: Fruit Tree (ফলের গাছ), Flowering Tree (ফুলের গাছ)।
> `script.js`-এর `loadCategories()` ফাংশনে ব্যবহার করা হয়।

```bash
https://openapi.programming-hero.com/api/categories
```

**Response:**

```json
{
  "status": true,
  "message": "successfully fetched categories data",
  "categories": [
    {
      "id": 1,
      "category_name": "Fruit Tree",
      "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
    },
    {
      "id": 2,
      "category_name": "Flowering Tree",
      "small_description": "Trees grown for their beautiful and fragrant flowers."
    }
  ]
}
```

---

## 2. Get 🌴 All Plants

> **এই API কী করে?**
> এই লিঙ্ক থেকে সব গাছের তালিকা আনা হয়।
> প্রতিটি গাছের নাম, ছবি, বিবরণ, ক্যাটাগরি এবং দাম পাওয়া যায়।
> `script.js`-এর `loadTrees()` ফাংশনে ব্যবহার করা হয়।

```bash
https://openapi.programming-hero.com/api/plants
```

**Response:**

```json
{
  "status": true,
  "message": "successfully fetched plants data",
  "plants": [
    {
      "id": 1,
      "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
      "name": "Mango Tree",
      "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
      "category": "Fruit Tree",
      "price": 500
    },
    {
      "id": 2,
      "image": "https://i.ibb.co.com/WNbbx3rn/guava-min.jpg",
      "name": "Guava Tree",
      "description": "A hardy fruit tree that grows in various climates, yielding guavas packed with Vitamin C. Its low maintenance nature makes it a favorite for home gardens.",
      "category": "Fruit Tree",
      "price": 350
    },
    {
      "id": 3,
      "image": "https://i.ibb.co.com/xt98PwZq/jackfruit-min.jpg",
      "name": "Jackfruit Tree",
      "description": "A large tropical tree that bears the world's biggest fruit, the jackfruit. Its sweet and aromatic flesh is both nutritious and filling, and the tree itself provides generous shade.",
      "category": "Fruit Tree",
      "price": 800
    },
    {
      "id": 4,
      "image": "https://i.ibb.co.com/1YzsVWjm/Gulmohar-min.jpg",
      "name": "Gulmohar",
      "description": "Known as the 'Flame of the Forest', this tree bursts into a vibrant display of red flowers every summer. Perfect for beautifying avenues and gardens.",
      "category": "Flowering Tree",
      "price": 400
    },
    {
      "id": 5,
      "image": "https://i.ibb.co.com/qY8qS7YN/champa-min.jpg",
      "name": "Champa",
      "description": "A fragrant flowering tree that adorns gardens with its delicate white blossoms. Widely cherished in traditional rituals and perfumery.",
      "category": "Flowering Tree",
      "price": 300
    }
  ]
}
```

---

## 3. Get 🌴 Plants by Category

> **এই API কী করে?**
> এই লিঙ্কে ক্যাটাগরির `id` দিলে শুধু সেই ক্যাটাগরির গাছগুলো পাওয়া যায়।
> যেমন: `id=1` দিলে শুধু ফলের গাছ আসবে।
> `script.js`-এর `selectCategory()` ফাংশনে ব্যবহার করা হয়।

```bash
https://openapi.programming-hero.com/api/category/${id}
```

Example:

```bash
https://openapi.programming-hero.com/api/category/1
```

**Response:**

```json
{
  "status": true,
  "message": "successfully fetched plants data filtered by category",
  "plants": [
    {
      "id": 1,
      "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
      "name": "Mango Tree",
      "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
      "category": "Fruit Tree",
      "price": 500
    },
    {
      "id": 2,
      "image": "https://i.ibb.co.com/WNbbx3rn/guava-min.jpg",
      "name": "Guava Tree",
      "description": "A hardy fruit tree that grows in various climates, yielding guavas packed with Vitamin C. Its low maintenance nature makes it a favorite for home gardens.",
      "category": "Fruit Tree",
      "price": 350
    }
  ]
}
```

---

## 4. Get 🌴 Plant Details

> **এই API কী করে?**
> এই লিঙ্কে গাছের `id` দিলে সেই গাছের সম্পূর্ণ তথ্য পাওয়া যায়।
> গাছের ছবিতে বা নামে ক্লিক করলে মোডালে এই তথ্য দেখানো হয়।
> `script.js`-এর `openTreeModal()` ফাংশনে ব্যবহার করা হয়।

```bash
https://openapi.programming-hero.com/api/plant/${id}
```

Example:

```bash
https://openapi.programming-hero.com/api/plant/1
```

**Response:**

```json
{
  "status": true,
  "message": "successfully fetched plant data",
  "plants": {
    "id": 1,
    "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
    "name": "Mango Tree",
    "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
    "category": "Fruit Tree",
    "price": 500
  }
}
```

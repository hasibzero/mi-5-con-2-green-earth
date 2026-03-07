/**
 * ====================================================
 * Green Earth - গাছের দোকান (Tree Shopping Website)
 * ====================================================
 *
 * এই ফাইলটি ওয়েবসাইটের সকল JavaScript কোড ধারণ করে।
 * এখানে গাছের তথ্য লোড করা, ক্যাটাগরি দেখানো,
 * কার্টে যোগ করা এবং মোডাল খোলার কাজ করা হয়।
 *
 * API বেস URL: https://openapi.programming-hero.com/api
 * (এই লিঙ্ক থেকে গাছের সকল তথ্য আনা হয়)
 */

/**
 * ====================================================
 * ধাপে ধাপে কার্যপ্রবাহ (Step-by-Step Workflow)
 * ====================================================
 *
 * ধাপ ১: পেজ লোড হওয়া
 *   → ব্রাউজারে index.html খোলার সাথে সাথে script.js লোড হয়।
 *   → ফাইলের একদম শেষে loadCategories() এবং loadTrees() কল হয়।
 *
 * ধাপ ২: ক্যাটাগরি লোড করা — loadCategories()
 *   → API-তে request পাঠানো হয় ক্যাটাগরির তালিকা আনতে।
 *   → প্রতিটি ক্যাটাগরির জন্য একটি বাটন তৈরি হয়।
 *   → বাটনে ক্লিক ইভেন্ট যোগ করা হয় (selectCategory)।
 *   → বাটনগুলো categoriesContainer-এ যোগ হয়।
 *
 * ধাপ ৩: সব গাছ লোড করা — loadTrees()
 *   → showLoading() কল হয়: স্পিনার দেখায়, পুরনো কার্ড মোছে।
 *   → API থেকে সব গাছের তালিকা আনা হয়।
 *   → hideLoading() কল হয়: স্পিনার লুকানো হয়।
 *   → displayTrees() কল হয়: গাছের কার্ড তৈরি হয়।
 *
 * ধাপ ৪: গাছের কার্ড দেখানো — displayTrees()
 *   → প্রতিটি গাছের জন্য একটি card div তৈরি হয়।
 *   → দাম $500-এর বেশি হলে লাল বর্ডার, না হলে সবুজ বর্ডার।
 *   → কার্ডে ছবি, নাম, বিবরণ, ক্যাটাগরি ব্যাজ, দাম ও Cart বাটন থাকে।
 *   → কার্ডটি treesContainer-এ যোগ হয়।
 *
 * ধাপ ৫: ক্যাটাগরি নির্বাচন — selectCategory()
 *   → কোনো ক্যাটাগরি বাটনে ক্লিক করলে এই ধাপ শুরু হয়।
 *   → showLoading() কল হয়।
 *   → সব বাটনের active স্টাইল সরিয়ে দেওয়া হয়।
 *   → ক্লিক করা বাটনটি active (btn-primary) করা হয়।
 *   → API থেকে শুধু সেই ক্যাটাগরির গাছ আনা হয়।
 *   → displayTrees() কল হয়।
 *   → hideLoading() কল হয়।
 *
 * ধাপ ৬: সব গাছ দেখানো — "All Trees" বাটন ইভেন্ট
 *   → "All Trees" বাটনে ক্লিক করলে এই ধাপ শুরু হয়।
 *   → সব বাটনের active স্টাইল সরিয়ে "All Trees" বাটনকে active করা হয়।
 *   → loadTrees() কল হয় (ধাপ ৩-এর মতো)।
 *
 * ধাপ ৭: গাছের বিস্তারিত তথ্য দেখানো — openTreeModal()
 *   → গাছের ছবিতে বা নামে ক্লিক করলে এই ধাপ শুরু হয়।
 *   → API থেকে সেই গাছের বিস্তারিত তথ্য আনা হয়।
 *   → মোডালের ভেতরে নাম, ছবি, ক্যাটাগরি, বিবরণ, দাম সেট করা হয়।
 *   → treeDetailsModal.showModal() দিয়ে মোডাল খোলা হয়।
 *
 * ধাপ ৮: কার্টে গাছ যোগ করা — addToCart()
 *   → "Cart" বাটনে ক্লিক করলে এই ধাপ শুরু হয়।
 *   → কার্টে গাছটি আগে থেকে আছে কিনা খোঁজা হয়।
 *   → থাকলে: quantity ১ বাড়ানো হয়।
 *   → না থাকলে: নতুন আইটেম হিসেবে cart array-এ যোগ করা হয়।
 *   → updateCart() কল হয় (ধাপ ৯)।
 *
 * ধাপ ৯: কার্ট UI আপডেট করা — updateCart()
 *   → cartContainer পরিষ্কার করা হয়।
 *   → কার্ট খালি থাকলে: empty বার্তা দেখানো হয়, মোট দাম $0।
 *   → কার্টে আইটেম থাকলে: প্রতিটি আইটেমের HTML তৈরি হয়।
 *   → দাম × পরিমাণ যোগ করে মোট দাম দেখানো হয়।
 *
 * ধাপ ১০: কার্ট থেকে গাছ সরানো — removeFromCart()
 *   → কার্ট আইটেমের "X" বাটনে ক্লিক করলে এই ধাপ শুরু হয়।
 *   → filter() দিয়ে সেই গাছটি বাদ দিয়ে নতুন array তৈরি হয়।
 *   → cart আপডেট হয়।
 *   → updateCart() কল হয় (ধাপ ৯)।
 */

// =====================================================
// DOM এলিমেন্ট নির্বাচন (HTML থেকে উপাদান ধরা)
// =====================================================
// document.getElementById() দিয়ে HTML-এর id ব্যবহার করে উপাদান খোঁজা হয়

// ক্যাটাগরি বাটনগুলো যেখানে যোগ হবে সেই div
const categoriesContainer = document.getElementById("categoriesContainer");

// গাছের কার্ডগুলো যেখানে দেখানো হবে সেই div
const treesContainer = document.getElementById("treesContainer");

// লোডিং স্পিনার (ডেটা আসার সময় ঘুরতে থাকে)
const loadingSpinner = document.getElementById("loadingSpinner");

// "All Trees" বাটন
const allTreesbtn = document.getElementById("allTreesbtn");

// গাছের বিস্তারিত তথ্য দেখানোর মোডাল (popup উইন্ডো)
const treeDetailsModal = document.getElementById("tree-details-modal");

// মোডালের ভেতরের উপাদানগুলো
const modalImage = document.getElementById("modalImage");         // গাছের ছবি
const modalCategory = document.getElementById("modalCategory");   // ক্যাটাগরির নাম
const modalDescription = document.getElementById("modalDescription"); // বিবরণ
const modalPrice = document.getElementById("modalPrice");         // দাম
const modalTitle = document.getElementById("modalTitle");         // গাছের নাম (শিরোনাম)

// কার্ট সেকশনের উপাদানগুলো
const cartContainer = document.getElementById("cartContainer");   // কার্টের আইটেমগুলো যেখানে দেখাবে
const totalPrice = document.getElementById("totalPrice");         // মোট দাম
const emptyCartMessage = document.getElementById("emptyCartMessage"); // কার্ট খালি থাকলে দেখানো বার্তা

// কার্টের ডেটা রাখার জন্য একটি খালি array
// প্রতিটি আইটেমে থাকবে: id, name, price, quantity
let cart = [];

// =====================================================
// লোডিং ফাংশন (Loading Functions)
// =====================================================

/**
 * showLoading() - লোডিং স্পিনার দেখানো
 * যখন API থেকে ডেটা আনা হচ্ছে তখন এই ফাংশন কল হয়।
 * এটি স্পিনার দেখায় এবং আগের গাছের কার্ডগুলো মুছে দেয়।
 *
 * ধাপ ১: hidden ক্লাস সরিয়ে স্পিনার দৃশ্যমান করা হয়।
 * ধাপ ২: treesContainer খালি করে পুরনো কার্ডগুলো মুছে ফেলা হয়।
 */
function showLoading() {
  loadingSpinner.classList.remove("hidden"); // ধাপ ১: hidden ক্লাস সরিয়ে স্পিনার দেখানো হয়
  treesContainer.innerHTML = "";             // ধাপ ২: পুরনো কার্ডগুলো মুছে ফেলা হয়
}

/**
 * hideLoading() - লোডিং স্পিনার লুকানো
 * ডেটা লোড হয়ে গেলে এই ফাংশন কল হয়।
 * এটি স্পিনারটি আবার লুকিয়ে দেয়।
 *
 * ধাপ ১: hidden ক্লাস যোগ করে স্পিনার লুকানো হয়।
 */
function hideLoading() {
  loadingSpinner.classList.add("hidden"); // ধাপ ১: hidden ক্লাস যোগ করে স্পিনার লুকানো হয়
}

// =====================================================
// ক্যাটাগরি ফাংশন (Category Functions)
// =====================================================

/**
 * loadCategories() - সকল ক্যাটাগরি লোড করা
 *
 * API লিঙ্ক: https://openapi.programming-hero.com/api/categories
 * এই লিঙ্ক থেকে সব ক্যাটাগরির তালিকা আনা হয় (যেমন: Fruit Tree, Flowering Tree)।
 *
 * async/await ব্যবহার করা হয় কারণ ইন্টারনেট থেকে ডেটা আনতে সময় লাগে।
 * fetch() দিয়ে API-তে request পাঠানো হয়।
 * res.json() দিয়ে JSON ডেটা পড়া হয়।
 *
 * ধাপ ১: fetch() দিয়ে API-তে request পাঠানো হয়।
 * ধাপ ২: res.json() দিয়ে JSON ডেটা পড়া হয়।
 * ধাপ ৩: forEach() দিয়ে প্রতিটি ক্যাটাগরির জন্য বাটন তৈরি করা হয়।
 * ধাপ ৪: বাটনে ক্লিক ইভেন্ট যোগ করা হয় → selectCategory() কল হবে।
 * ধাপ ৫: বাটনটি categoriesContainer-এ যোগ করা হয়।
 */
async function loadCategories() {
  // ধাপ ১: API-তে request পাঠানো হচ্ছে ক্যাটাগরি আনার জন্য
  // API লিঙ্ক: https://openapi.programming-hero.com/api/categories
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json(); // ধাপ ২: JSON ফরম্যাটে ডেটা রূপান্তর

  // ধাপ ৩: প্রতিটি ক্যাটাগরির জন্য একটি বাটন তৈরি করা হচ্ছে
  data.categories.forEach((category) => {
    const btn = document.createElement("button"); // নতুন বাটন তৈরি
    btn.className = "btn btn-outline w-full";      // বাটনের স্টাইল
    btn.textContent = category.category_name;      // বাটনে ক্যাটাগরির নাম লেখা
    // ধাপ ৪: বাটনে ক্লিক করলে selectCategory() ফাংশন চলবে
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn); // ধাপ ৫: বাটনটি HTML-এ যোগ করা হচ্ছে
  });
}

/**
 * selectCategory(categoryId, btn) - নির্দিষ্ট ক্যাটাগরির গাছ দেখানো
 *
 * @param {number} categoryId - যে ক্যাটাগরির id (যেমন: 1, 2, 3...)
 * @param {HTMLElement} btn - যে বাটনে ক্লিক করা হয়েছে
 *
 * API লিঙ্ক: https://openapi.programming-hero.com/api/category/{id}
 * উদাহরণ: https://openapi.programming-hero.com/api/category/1
 * এই লিঙ্কে id দিলে সেই ক্যাটাগরির সব গাছ পাওয়া যায়।
 *
 * ধাপ ১: showLoading() কল করে স্পিনার দেখানো হয় ও পুরনো কার্ড মোছা হয়।
 * ধাপ ২: সব বাটনের active স্টাইল সরিয়ে দেওয়া হয়।
 * ধাপ ৩: ক্লিক করা বাটনটিকে active (btn-primary) করা হয়।
 * ধাপ ৪: API থেকে সেই ক্যাটাগরির গাছের তালিকা আনা হয়।
 * ধাপ ৫: displayTrees() কল করে কার্ড দেখানো হয়।
 * ধাপ ৬: hideLoading() কল করে স্পিনার লুকানো হয়।
 */
async function selectCategory(categoryId, btn) {
  showLoading(); // ধাপ ১: প্রথমে লোডিং স্পিনার দেখানো হয়

  // ধাপ ২: সব বাটনের active স্টাইল সরিয়ে দেওয়া হচ্ছে
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesbtn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary"); // সব বাটন থেকে primary রঙ সরানো
    btn.classList.add("btn-outline");    // outline স্টাইল যোগ করা
  });

  // ধাপ ৩: যে বাটনে ক্লিক হয়েছে সেটিকে active করা হচ্ছে
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");

  // ধাপ ৪: নির্দিষ্ট ক্যাটাগরির গাছ আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/category/{categoryId}
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json(); // JSON ডেটা পড়া
  displayTrees(data.plants);     // ধাপ ৫: গাছগুলো স্ক্রিনে দেখানো

  hideLoading(); // ধাপ ৬: লোডিং শেষ হলে স্পিনার লুকানো
}

// "All Trees" বাটনে ক্লিক করলে সব গাছ দেখানো হবে
// ধাপ ১: সব বাটনের active স্টাইল সরানো হয়।
// ধাপ ২: "All Trees" বাটনকে active করা হয়।
// ধাপ ৩: loadTrees() কল করে সব গাছ লোড করা হয়।
allTreesbtn.addEventListener("click", () => {
  // ধাপ ১: সব বাটনের active স্টাইল সরিয়ে দেওয়া হচ্ছে
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesbtn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary"); // সব বাটন থেকে primary রঙ সরানো
    btn.classList.add("btn-outline");    // outline স্টাইল যোগ করা
  });

  // ধাপ ২: "All Trees" বাটনকে active করা হচ্ছে
  allTreesbtn.classList.add("btn-primary");
  allTreesbtn.classList.remove("btn-outline");

  loadTrees(); // ধাপ ৩: সব গাছ লোড করার ফাংশন কল
});

// =====================================================
// গাছ লোড ও দেখানোর ফাংশন (Tree Load & Display Functions)
// =====================================================

/**
 * loadTrees() - সকল গাছ লোড করা
 *
 * API লিঙ্ক: https://openapi.programming-hero.com/api/plants
 * এই লিঙ্ক থেকে সব গাছের তালিকা আনা হয়।
 * ডেটা লোড হলে displayTrees() ফাংশন দিয়ে দেখানো হয়।
 *
 * ধাপ ১: showLoading() কল করে স্পিনার দেখানো হয়।
 * ধাপ ২: fetch() দিয়ে API থেকে সব গাছের তালিকা আনা হয়।
 * ধাপ ৩: res.json() দিয়ে JSON ডেটা পড়া হয়।
 * ধাপ ৪: hideLoading() কল করে স্পিনার লুকানো হয়।
 * ধাপ ৫: displayTrees() কল করে গাছের কার্ড তৈরি হয়।
 */
async function loadTrees() {
  showLoading(); // ধাপ ১: লোডিং শুরু
  // ধাপ ২: সব গাছের তথ্য আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/plants
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json(); // ধাপ ৩: JSON ডেটা পড়া
  hideLoading();                 // ধাপ ৪: লোডিং শেষ
  displayTrees(data.plants);     // ধাপ ৫: গাছগুলো স্ক্রিনে দেখানো
}

/**
 * displayTrees(trees) - গাছের কার্ড তৈরি করে স্ক্রিনে দেখানো
 *
 * @param {Array} trees - গাছের তথ্যের array
 * প্রতিটি গাছের জন্য একটি কার্ড (card) তৈরি করা হয়।
 * দাম $500-এর বেশি হলে কার্ডের নিচে লাল রঙ, না হলে সবুজ রঙ হবে।
 *
 * ধাপ ১: forEach() দিয়ে প্রতিটি গাছের উপর লুপ চালানো হয়।
 * ধাপ ২: প্রতিটি গাছের জন্য একটি card div তৈরি করা হয়।
 * ধাপ ৩: দাম $500-এর বেশি কিনা পরীক্ষা করে বর্ডার রঙ ঠিক করা হয়।
 * ধাপ ৪: কার্ডের ভেতরে ছবি, নাম, বিবরণ, ক্যাটাগরি ব্যাজ, দাম ও Cart বাটন HTML দিয়ে তৈরি হয়।
 * ধাপ ৫: কার্ডটি treesContainer-এ যোগ করা হয়।
 */
function displayTrees(trees) {
  // ধাপ ১: প্রতিটি গাছের জন্য লুপ
  trees.forEach((tree) => {
    // ধাপ ২: প্রতিটি গাছের জন্য একটি div কার্ড তৈরি
    const card = document.createElement("div");
    // ধাপ ৩: দাম $500-এর বেশি হলে লাল বর্ডার, না হলে সবুজ বর্ডার
    card.className = `card bg-white shadow-sm border-b-2 ${tree.price > 500 ? "border-red-500" : "border-green-500"}`;
    // ধাপ ৪: কার্ডের ভেতরের HTML কোড তৈরি করা হচ্ছে
    card.innerHTML = `<figure>
        <img
          src="${tree.image}"
          alt="${tree.name}"
          title="${tree.name}"
          class="h-48 w-full object-cover cursor-pointer"
          onclick="openTreeModal(${tree.id})"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title cursor-pointer hover:text-[#4ade80]" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
        <p class="line-clamp-2">
          ${tree.description}
        </p>
        <div class="badge badge-success badge-outline">${tree.category}</div>

        <div class="flex justify-between items-center">
          <h2 class="font-bold text-xl ${tree.price > 500 ? "text-red-500" : "text-[#4ade80]"}">$${tree.price}</h2>
          <button class="btn btn-primary" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">Cart</button>
        </div>
      </div>`;
    treesContainer.appendChild(card); // ধাপ ৫: কার্ডটি HTML-এ যোগ করা
  });
}

/**
 * openTreeModal(treeId) - গাছের বিস্তারিত তথ্য মোডালে দেখানো
 *
 * @param {number} treeId - যে গাছের বিস্তারিত দেখতে চাই তার id
 *
 * API লিঙ্ক: https://openapi.programming-hero.com/api/plant/{id}
 * উদাহরণ: https://openapi.programming-hero.com/api/plant/1
 * এই লিঙ্কে id দিলে সেই গাছের সম্পূর্ণ তথ্য পাওয়া যায়।
 * ছবিতে বা নামে ক্লিক করলে এই মোডাল খোলে।
 *
 * ধাপ ১: fetch() দিয়ে নির্দিষ্ট গাছের বিস্তারিত তথ্য আনা হয়।
 * ধাপ ২: res.json() দিয়ে JSON ডেটা পড়া হয়।
 * ধাপ ৩: মোডালের ভেতরে গাছের নাম, ছবি, ক্যাটাগরি, বিবরণ ও দাম সেট করা হয়।
 * ধাপ ৪: showModal() কল করে মোডাল খোলা হয়।
 */
async function openTreeModal(treeId) {
  // ধাপ ১: নির্দিষ্ট গাছের বিস্তারিত তথ্য আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/plant/{treeId}
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();       // ধাপ ২: JSON ডেটা পড়া
  const plantDetails = data.plants;    // গাছের বিস্তারিত তথ্য

  // ধাপ ৩: মোডালের ভেতরে তথ্য সেট করা হচ্ছে
  modalTitle.textContent = plantDetails.name;           // নাম
  modalImage.src = plantDetails.image;                  // ছবি
  modalCategory.textContent = plantDetails.category;    // ক্যাটাগরি
  modalDescription.textContent = plantDetails.description; // বিবরণ
  modalPrice.textContent = plantDetails.price;          // দাম

  treeDetailsModal.showModal(); // ধাপ ৪: মোডাল খোলা হচ্ছে
}

// পেজ লোড হওয়ার সাথে সাথে ক্যাটাগরি ও গাছ লোড শুরু হবে
// (কার্যপ্রবাহের ধাপ ১ অনুযায়ী, পেজ লোড হলেই নিচের দুটি ফাংশন কল হয়)
// ধাপ ২: loadCategories() → বাম পাশে ক্যাটাগরি বাটন তৈরি হয়।
// ধাপ ৩: loadTrees() → মাঝখানে সব গাছের কার্ড দেখায়।
loadCategories(); // ধাপ ২: ক্যাটাগরি বাটন লোড
loadTrees();      // ধাপ ৩: সব গাছ লোড

// =====================================================
// কার্ট ফাংশন (Cart Functions)
// =====================================================

/**
 * addToCart(id, name, price) - কার্টে গাছ যোগ করা
 *
 * @param {number} id - গাছের id
 * @param {string} name - গাছের নাম
 * @param {number} price - গাছের দাম
 *
 * যদি গাছটি আগে থেকেই কার্টে থাকে, তাহলে পরিমাণ (quantity) ১ বাড়ানো হয়।
 * না থাকলে নতুন আইটেম হিসেবে যোগ করা হয়।
 *
 * ধাপ ১: cart array-এ এই id-র গাছ আগে থেকে আছে কিনা খোঁজা হয়।
 * ধাপ ২ (যদি থাকে): existingItem.quantity ১ বাড়ানো হয়।
 * ধাপ ২ (যদি না থাকে): নতুন অবজেক্ট তৈরি করে cart-এ push করা হয়।
 * ধাপ ৩: updateCart() কল করে কার্ট UI আপডেট করা হয়।
 */
function addToCart(id, name, price) {
  // ধাপ ১: কার্টে এই id-র গাছ আগে থেকে আছে কিনা খোঁজা হচ্ছে
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    // ধাপ ২ (থাকলে): গাছটি আগে থেকেই কার্টে আছে, তাই পরিমাণ ১ বাড়ানো হচ্ছে
    existingItem.quantity += 1;
  } else {
    // ধাপ ২ (না থাকলে): গাছটি নতুন, তাই কার্টে যোগ করা হচ্ছে
    cart.push({
      id,
      name,
      price,
      quantity: 1, // প্রথমবার যোগ হলে পরিমাণ ১
    });
  }

  updateCart(); // ধাপ ৩: কার্ট UI আপডেট করা
}

/**
 * updateCart() - কার্টের UI আপডেট করা
 *
 * কার্ট array-এর ডেটা দিয়ে HTML আপডেট করা হয়।
 * কার্ট খালি থাকলে "Your cart is empty" বার্তা দেখানো হয়।
 * মোট দাম গণনা করে দেখানো হয়।
 *
 * ধাপ ১: cartContainer খালি করে আগের আইটেমগুলো মুছে দেওয়া হয়।
 * ধাপ ২: কার্ট খালি কিনা পরীক্ষা করা হয়।
 *   → খালি থাকলে: empty বার্তা দেখানো হয়, মোট দাম $0 দেখানো হয়, ফাংশন শেষ।
 *   → না খালি থাকলে: empty বার্তা লুকানো হয়।
 * ধাপ ৩: প্রতিটি কার্ট আইটেমের জন্য HTML তৈরি করা হয়।
 * ধাপ ৪: দাম × পরিমাণ যোগ করে মোট দাম গণনা করা হয়।
 * ধাপ ৫: মোট দাম totalPrice-এ দেখানো হয়।
 */
function updateCart() {
  cartContainer.innerHTML = ""; // ধাপ ১: আগের কার্ট আইটেমগুলো মুছে দেওয়া

  if (cart.length === 0) {
    // ধাপ ২ (খালি থাকলে): কার্ট খালি হলে empty বার্তা দেখানো
    emptyCartMessage.classList.remove("hidden");
    totalPrice.textContent = `$${0}`; // মোট দাম $0
    return; // ফাংশন এখানেই শেষ
  }

  // ধাপ ২ (না খালি থাকলে): কার্টে আইটেম আছে, তাই empty বার্তা লুকানো
  emptyCartMessage.classList.add("hidden");

  let total = 0; // ধাপ ৪: মোট দাম গণনার জন্য ভেরিয়েবল

  // ধাপ ৩: প্রতিটি কার্ট আইটেমের HTML তৈরি
  cart.forEach((item) => {
    // প্রতিটি আইটেমের মোট দাম যোগ করা (দাম × পরিমাণ)
    total += item.price * item.quantity;

    // প্রতিটি কার্ট আইটেমের জন্য HTML তৈরি
    const cartItem = document.createElement("div");
    cartItem.className = "card card-body bg-slate-100 font-semibold";
    cartItem.innerHTML = `<div class="flex justify-between items-center">
                                <div>
                                    <h2>${item.name}</h2>
                                    <p> $${item.price} × ${item.quantity}</p>
                                </div>
                                <button class="btn btn-ghost" onclick="removeFromCart(${item.id})">X</button>
                            </div>
                            <p class="text-right font-semibold text-xl">$${item.price * item.quantity}</p>`;

    cartContainer.appendChild(cartItem); // কার্ট আইটেম HTML-এ যোগ করা
  });

  totalPrice.innerText = `$${total}`; // ধাপ ৫: মোট দাম দেখানো
}

/**
 * removeFromCart(treeId) - কার্ট থেকে গাছ সরানো
 *
 * @param {number} treeId - যে গাছটি কার্ট থেকে সরাতে হবে তার id
 *
 * filter() ব্যবহার করে সেই id-র গাছটি বাদ দিয়ে নতুন array তৈরি করা হয়।
 *
 * ধাপ ১: filter() দিয়ে treeId-র সাথে না মেলা আইটেমগুলো রেখে নতুন array তৈরি হয়।
 * ধাপ ২: cart ভেরিয়েবলটি নতুন array দিয়ে আপডেট করা হয়।
 * ধাপ ৩: updateCart() কল করে UI আপডেট করা হয়।
 */
function removeFromCart(treeId) {
  // ধাপ ১: treeId-র সাথে মিলে না এমন আইটেমগুলো রেখে নতুন array তৈরি
  const updatedCartElements = cart.filter((item) => item.id != treeId);
  cart = updatedCartElements; // ধাপ ২: কার্ট আপডেট করা
  updateCart();               // ধাপ ৩: UI আপডেট করা
}

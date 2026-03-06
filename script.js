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
 */
function showLoading() {
  loadingSpinner.classList.remove("hidden"); // hidden ক্লাস সরিয়ে স্পিনার দেখানো হয়
  treesContainer.innerHTML = "";             // পুরনো কার্ডগুলো মুছে ফেলা হয়
}

/**
 * hideLoading() - লোডিং স্পিনার লুকানো
 * ডেটা লোড হয়ে গেলে এই ফাংশন কল হয়।
 * এটি স্পিনারটি আবার লুকিয়ে দেয়।
 */
function hideLoading() {
  loadingSpinner.classList.add("hidden"); // hidden ক্লাস যোগ করে স্পিনার লুকানো হয়
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
 */
async function loadCategories() {
  // API-তে request পাঠানো হচ্ছে ক্যাটাগরি আনার জন্য
  // API লিঙ্ক: https://openapi.programming-hero.com/api/categories
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json(); // JSON ফরম্যাটে ডেটা রূপান্তর

  // প্রতিটি ক্যাটাগরির জন্য একটি বাটন তৈরি করা হচ্ছে
  data.categories.forEach((category) => {
    const btn = document.createElement("button"); // নতুন বাটন তৈরি
    btn.className = "btn btn-outline w-full";      // বাটনের স্টাইল
    btn.textContent = category.category_name;      // বাটনে ক্যাটাগরির নাম লেখা
    // বাটনে ক্লিক করলে selectCategory() ফাংশন চলবে
    btn.onclick = () => selectCategory(category.id, btn);
    categoriesContainer.appendChild(btn); // বাটনটি HTML-এ যোগ করা হচ্ছে
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
 */
async function selectCategory(categoryId, btn) {
  showLoading(); // প্রথমে লোডিং স্পিনার দেখানো হয়

  // সব বাটনের active স্টাইল সরিয়ে দেওয়া হচ্ছে
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesbtn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary"); // সব বাটন থেকে primary রঙ সরানো
    btn.classList.add("btn-outline");    // outline স্টাইল যোগ করা
  });

  // যে বাটনে ক্লিক হয়েছে সেটিকে active করা হচ্ছে
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");

  // নির্দিষ্ট ক্যাটাগরির গাছ আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/category/{categoryId}
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`,
  );
  const data = await res.json(); // JSON ডেটা পড়া
  displayTrees(data.plants);     // গাছগুলো স্ক্রিনে দেখানো

  hideLoading(); // লোডিং শেষ হলে স্পিনার লুকানো
}

// "All Trees" বাটনে ক্লিক করলে সব গাছ দেখানো হবে
allTreesbtn.addEventListener("click", () => {
  // সব বাটনের active স্টাইল সরিয়ে দেওয়া হচ্ছে
  const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesbtn",
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary"); // সব বাটন থেকে primary রঙ সরানো
    btn.classList.add("btn-outline");    // outline স্টাইল যোগ করা
  });

  // "All Trees" বাটনকে active করা হচ্ছে
  allTreesbtn.classList.add("btn-primary");
  allTreesbtn.classList.remove("btn-outline");

  loadTrees(); // সব গাছ লোড করার ফাংশন কল
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
 */
async function loadTrees() {
  showLoading(); // লোডিং শুরু
  // সব গাছের তথ্য আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/plants
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json(); // JSON ডেটা পড়া
  hideLoading();                 // লোডিং শেষ
  displayTrees(data.plants);     // গাছগুলো স্ক্রিনে দেখানো
}

/**
 * displayTrees(trees) - গাছের কার্ড তৈরি করে স্ক্রিনে দেখানো
 *
 * @param {Array} trees - গাছের তথ্যের array
 * প্রতিটি গাছের জন্য একটি কার্ড (card) তৈরি করা হয়।
 * দাম $500-এর বেশি হলে কার্ডের নিচে লাল রঙ, না হলে সবুজ রঙ হবে।
 */
function displayTrees(trees) {
  trees.forEach((tree) => {
    // প্রতিটি গাছের জন্য একটি div কার্ড তৈরি
    const card = document.createElement("div");
    // দাম $500-এর বেশি হলে লাল বর্ডার, না হলে সবুজ বর্ডার
    card.className = `card bg-white shadow-sm border-b-2 ${tree.price > 500 ? "border-red-500" : "border-green-500"}`;
    // কার্ডের ভেতরের HTML কোড তৈরি করা হচ্ছে
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
    treesContainer.appendChild(card); // কার্ডটি HTML-এ যোগ করা
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
 */
async function openTreeModal(treeId) {
  // নির্দিষ্ট গাছের বিস্তারিত তথ্য আনার API request
  // API লিঙ্ক: https://openapi.programming-hero.com/api/plant/{treeId}
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();       // JSON ডেটা পড়া
  const plantDetails = data.plants;    // গাছের বিস্তারিত তথ্য

  // মোডালের ভেতরে তথ্য সেট করা হচ্ছে
  modalTitle.textContent = plantDetails.name;           // নাম
  modalImage.src = plantDetails.image;                  // ছবি
  modalCategory.textContent = plantDetails.category;    // ক্যাটাগরি
  modalDescription.textContent = plantDetails.description; // বিবরণ
  modalPrice.textContent = plantDetails.price;          // দাম

  treeDetailsModal.showModal(); // মোডাল খোলা হচ্ছে
}

// পেজ লোড হওয়ার সাথে সাথে ক্যাটাগরি ও গাছ লোড শুরু হবে
loadCategories(); // ক্যাটাগরি বাটন লোড
loadTrees();      // সব গাছ লোড

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
 */
function addToCart(id, name, price) {
  // কার্টে এই id-র গাছ আগে থেকে আছে কিনা খোঁজা হচ্ছে
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    // গাছটি আগে থেকেই কার্টে আছে, তাই পরিমাণ ১ বাড়ানো হচ্ছে
    existingItem.quantity += 1;
  } else {
    // গাছটি নতুন, তাই কার্টে যোগ করা হচ্ছে
    cart.push({
      id,
      name,
      price,
      quantity: 1, // প্রথমবার যোগ হলে পরিমাণ ১
    });
  }

  updateCart(); // কার্ট UI আপডেট করা
}

/**
 * updateCart() - কার্টের UI আপডেট করা
 *
 * কার্ট array-এর ডেটা দিয়ে HTML আপডেট করা হয়।
 * কার্ট খালি থাকলে "Your cart is empty" বার্তা দেখানো হয়।
 * মোট দাম গণনা করে দেখানো হয়।
 */
function updateCart() {
  cartContainer.innerHTML = ""; // আগের কার্ট আইটেমগুলো মুছে দেওয়া

  if (cart.length === 0) {
    // কার্ট খালি হলে empty বার্তা দেখানো
    emptyCartMessage.classList.remove("hidden");
    totalPrice.textContent = `$${0}`; // মোট দাম $0
    return; // ফাংশন এখানেই শেষ
  }

  // কার্টে আইটেম আছে, তাই empty বার্তা লুকানো
  emptyCartMessage.classList.add("hidden");

  let total = 0; // মোট দাম গণনার জন্য ভেরিয়েবল

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

  totalPrice.innerText = `$${total}`; // মোট দাম দেখানো
}

/**
 * removeFromCart(treeId) - কার্ট থেকে গাছ সরানো
 *
 * @param {number} treeId - যে গাছটি কার্ট থেকে সরাতে হবে তার id
 *
 * filter() ব্যবহার করে সেই id-র গাছটি বাদ দিয়ে নতুন array তৈরি করা হয়।
 */
function removeFromCart(treeId) {
  // treeId-র সাথে মিলে না এমন আইটেমগুলো রেখে নতুন array তৈরি
  const updatedCartElements = cart.filter((item) => item.id != treeId);
  cart = updatedCartElements; // কার্ট আপডেট করা
  updateCart();               // UI আপডেট করা
}

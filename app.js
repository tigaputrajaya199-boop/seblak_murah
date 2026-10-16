/**
 * Seblak Juara UMKM - Logic & Interactive Cart System
 */

// Konfigurasi WhatsApp Toko UMKM
const SHOP_CONFIG = {
    name: "Seblak Juara UMKM",
    whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp pemilik toko (tanpa simbol + atau tanda minus)
    address: "Jl. Kuliner Raya No. 45, Sentra Kuliner UMKM Nusantara",
};

// Database Menu Seblak & Minuman
const MENU_ITEMS = [
    {
        id: 1,
        name: "Seblak Komplit Spesial",
        category: "seblak",
        price: 18000,
        description: "Kerupuk basah, makaroni, sosis sapi, bakso sapi, ceker empuk, siomay, dan telur campur kuah gurih.",
        badge: "Paling Laris 🔥",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Seblak Ceker Mercon",
        category: "seblak",
        price: 15000,
        description: "Ceker ayam super empuk melimpah dimasak dengan kuah kencur pedas mercon bikin merem melek.",
        badge: "Favorit Ceker 🍗",
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Seblak Seafood Mewah",
        category: "seblak",
        price: 22000,
        description: "Dumpling keju, crabstick, fish roll, baso ikan, dan udang segar berpadu kuah rempah pedas segar.",
        badge: "Special Seafood 🦐",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Seblak Prasmanan Ori",
        category: "seblak",
        price: 10000,
        description: "Paket dasar seblak: aneka kerupuk mawar & warna-warni, makaroni, mie/kwetiau, sawi hijau, bumbu kencur.",
        badge: "Pilihan Hemat 💰",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Seblak Mie Jebew Bakso",
        category: "seblak",
        price: 14000,
        description: "Mie kenyal pedas gurih diaduk sambal cabe rawit segar dilengkapi 3 butir bakso sapi kenyal.",
        badge: "Pedas Nagih 🍜",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Seblak Jamur Enoki & Sosis",
        category: "seblak",
        price: 16000,
        description: "Jamur enoki segar bertekstur crunchy berpadu dengan sosis sapi potong dan kuah pedas kental.",
        badge: "Viral Enoki 🍄",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Cuanki Lidah & Siomay Kering",
        category: "topping",
        price: 3000,
        description: "Topping khas sunda, renyah gurih menyerap kuah seblak hingga kenyal nikmat (isi 3 pcs).",
        badge: "Topping Renyah",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Dumpling Cheese / Keju Meleleh",
        category: "topping",
        price: 4000,
        description: "Dumpling olahan ikan lembut dengan isian keju cheddar lumer di dalam saat digigit.",
        badge: "Keju Lumer 🧀",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Extra Telur (Ceplok / Orak-Arik)",
        category: "topping",
        price: 4000,
        description: "Tambahan 1 butir telur ayam segar untuk menambah kekentalan dan kegurihan kuah seblak.",
        badge: "Protein Tambahan 🥚",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Ceker Ayam Tambahan (3 pcs)",
        category: "topping",
        price: 5000,
        description: "3 pcs ceker ayam empuk berbumbu gurih untuk porsi topping ekstra puas.",
        badge: "Ekstra Ceker",
        image: "https://images.unsplash.com/photo-1527477378407-628af335bc61?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Es Teh Manis Jumbo",
        category: "minuman",
        price: 4000,
        description: "Teh melati seduh segar disajikan dalam gelas cup jumbo dingin penawar pedas seblak.",
        badge: "Segar Penawar 🧊",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Es Jeruk Peras Segar",
        category: "minuman",
        price: 6000,
        description: "Perasan jeruk segar asli kaya vitamin C dengan es batu dingin menyegarkan tenggorokan.",
        badge: "Asli Jeruk 🍊",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
    }
];

// State Keranjang Belanja
let cart = [];
let currentSelectedItem = null;
let activeCategory = 'all';

// Format Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    // Muat data dari localStorage jika ada
    const savedCart = localStorage.getItem('seblak_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
    renderMenu();
    updateCartUI();
});

// Render Menu ke Grid
function renderMenu(items = MENU_ITEMS) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-stone-400">
                <i class="fa-solid fa-utensils text-4xl mb-3 block"></i>
                <p class="text-sm font-semibold">Menu tidak ditemukan. Coba kata kunci lain.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="food-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm">
            <div>
                <!-- Image Container -->
                <div class="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
                    ${item.badge ? `
                        <span class="absolute top-2.5 left-2.5 bg-red-600/90 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm backdrop-blur-xs">
                            ${item.badge}
                        </span>
                    ` : ''}
                </div>

                <!-- Content Container -->
                <div class="p-4 space-y-2">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="font-bold text-stone-900 text-sm sm:text-base leading-tight">${item.name}</h3>
                    </div>
                    <p class="text-xs text-stone-500 line-clamp-2 leading-relaxed">${item.description}</p>
                </div>
            </div>

            <!-- Footer Price & Button -->
            <div class="p-4 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                <div>
                    <span class="text-[10px] text-stone-400 block font-medium">Harga</span>
                    <span class="text-sm sm:text-base font-extrabold text-red-600">${formatRupiah(item.price)}</span>
                </div>
                <button onclick="openCustomizeModal(${item.id})" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-xs border border-red-200 hover:border-transparent transition-all flex items-center gap-1.5 shadow-sm">
                    <i class="fa-solid fa-plus"></i>
                    <span>Pesan</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Berdasarkan Kategori
function filterCategory(category) {
    activeCategory = category;
    
    // Update active class on buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('bg-red-600', 'text-white');
            btn.classList.remove('bg-white', 'text-stone-700', 'border');
        } else {
            btn.classList.remove('bg-red-600', 'text-white');
            btn.classList.add('bg-white', 'text-stone-700', 'border');
        }
    });

    handleSearch();
}

// Search Filter
function handleSearch() {
    const query = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    
    const filtered = MENU_ITEMS.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesQuery = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });

    renderMenu(filtered);
}

// Buka Modal Kustomisasi (Level Pedas)
function openCustomizeModal(itemId) {
    const item = MENU_ITEMS.find(m => m.id === itemId);
    if (!item) return;

    currentSelectedItem = item;
    document.getElementById('modalItemTitle').innerText = item.name;
    document.getElementById('modalItemPrice').innerText = formatRupiah(item.price);
    document.getElementById('modalItemNotes').value = '';

    // Sembunyikan pemilih level pedas jika itu minuman
    const levelContainer = document.getElementById('levelSelectionContainer');
    if (item.category === 'minuman') {
        levelContainer.classList.add('hidden');
    } else {
        levelContainer.classList.remove('hidden');
    }

    document.getElementById('customizeModal').classList.remove('hidden');
}

function closeCustomizeModal() {
    document.getElementById('customizeModal').classList.add('hidden');
    currentSelectedItem = null;
}

// Konfirmasi Tambah ke Keranjang
function confirmAddToCart() {
    if (!currentSelectedItem) return;

    const level = currentSelectedItem.category === 'minuman' 
        ? '-' 
        : document.getElementById('modalSpicyLevel').value;
    const notes = document.getElementById('modalItemNotes').value.trim();

    // Check jika item identik (nama + level pedas + catatan) sudah ada
    const cartId = `${currentSelectedItem.id}-${level}-${notes}`;
    const existingIndex = cart.findIndex(c => c.cartId === cartId);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            cartId: cartId,
            id: currentSelectedItem.id,
            name: currentSelectedItem.name,
            price: currentSelectedItem.price,
            level: level,
            notes: notes,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    closeCustomizeModal();
    showToast(`"${currentSelectedItem.name}" berhasil masuk keranjang!`);
}

// Kelola Kuantitas di Keranjang
function changeCartQty(cartId, delta) {
    const index = cart.findIndex(c => c.cartId === cartId);
    if (index > -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

// Hapus Item
function removeCartItem(cartId) {
    cart = cart.filter(c => c.cartId !== cartId);
    saveCart();
    updateCartUI();
}

// Simpan ke LocalStorage
function saveCart() {
    localStorage.setItem('seblak_cart', JSON.stringify(cart));
}

// Perbarui Tampilan Keranjang
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update Badge
    const badge = document.getElementById('cartCountBadge');
    if (badge) {
        badge.innerText = totalItems;
        badge.classList.toggle('scale-125', totalItems > 0);
        setTimeout(() => badge.classList.remove('scale-125'), 200);
    }

    // Update Ringkasan Keranjang
    const totalItemsText = document.getElementById('cartTotalItemsText');
    const totalPriceText = document.getElementById('cartTotalPriceText');
    if (totalItemsText) totalItemsText.innerText = `${totalItems} Porsi`;
    if (totalPriceText) totalPriceText.innerText = formatRupiah(totalPrice);

    // Render Container Keranjang
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="py-16 text-center text-stone-400">
                <i class="fa-solid fa-basket-shopping text-5xl mb-3 opacity-40"></i>
                <p class="text-sm font-semibold">Keranjang belanja masih kosong.</p>
                <p class="text-xs text-stone-400 mt-1">Silakan pilih menu seblak favoritmu!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold text-stone-900 text-xs sm:text-sm leading-tight">${item.name}</h4>
                    ${item.level !== '-' ? `
                        <span class="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold mt-1">
                            🌶️ ${item.level}
                        </span>
                    ` : ''}
                    ${item.notes ? `
                        <p class="text-[11px] text-stone-500 mt-1 italic">Catatan: "${item.notes}"</p>
                    ` : ''}
                </div>
                <button onclick="removeCartItem('${item.cartId}')" class="text-stone-400 hover:text-red-500 text-xs p-1">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-stone-200/60">
                <span class="text-xs font-bold text-red-600">${formatRupiah(item.price * item.qty)}</span>
                
                <div class="flex items-center gap-2">
                    <button onclick="changeCartQty('${item.cartId}', -1)" class="w-6 h-6 rounded-md bg-white border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700">
                        -
                    </button>
                    <span class="text-xs font-bold text-stone-800 w-5 text-center">${item.qty}</span>
                    <button onclick="changeCartQty('${item.cartId}', 1)" class="w-6 h-6 rounded-md bg-white border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Buka/Tutup Keranjang Modal
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

// Field Alamat jika Delivery
function toggleAddressField() {
    const orderType = document.getElementById('orderType').value;
    const addressGroup = document.getElementById('addressGroup');
    if (orderType.includes('Delivery')) {
        addressGroup.classList.remove('hidden');
    } else {
        addressGroup.classList.add('hidden');
    }
}

// Format dan Kirim ke WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong. Silakan pilih menu terlebih dahulu!');
        return;
    }

    const name = document.getElementById('custName')?.value.trim();
    if (!name) {
        alert('Mohon masukkan Nama Pemesan!');
        document.getElementById('custName')?.focus();
        return;
    }

    const orderType = document.getElementById('orderType').value;
    const isDelivery = orderType.includes('Delivery');
    const address = document.getElementById('custAddress')?.value.trim();

    if (isDelivery && !address) {
        alert('Mohon masukkan Alamat Pengiriman untuk pesanan antar!');
        document.getElementById('custAddress')?.focus();
        return;
    }

    const generalNotes = document.getElementById('custNotes')?.value.trim();

    // Susun Pesan WhatsApp
    let message = `*HALO ADMIN ${SHOP_CONFIG.name.toUpperCase()}*\n`;
    message += `Saya ingin melakukan pemesanan via website:\n\n`;
    message += `📋 *DETAIL PESANAN:*\n`;

    let totalBiaya = 0;
    cart.forEach((item, idx) => {
        const subtotal = item.price * item.qty;
        totalBiaya += subtotal;
        message += `${idx + 1}. *${item.name}* (x${item.qty})\n`;
        if (item.level !== '-') {
            message += `   - Level Pedas: ${item.level}\n`;
        }
        if (item.notes) {
            message += `   - Catatan: ${item.notes}\n`;
        }
        message += `   - Subtotal: ${formatRupiah(subtotal)}\n\n`;
    });

    message += `--------------------------------\n`;
    message += `💰 *TOTAL TAGIHAN: ${formatRupiah(totalBiaya)}*\n`;
    message += `--------------------------------\n\n`;

    message += `👤 *DATA PEMESAN:*\n`;
    message += `- *Nama*: ${name}\n`;
    message += `- *Metode*: ${orderType}\n`;
    if (isDelivery) {
        message += `- *Alamat Kirim*: ${address}\n`;
    }
    if (generalNotes) {
        message += `- *Catatan Tambahan*: ${generalNotes}\n`;
    }

    message += `\nMohon segera dikonfirmasi ya kak, terima kasih! 🙏`;

    // Encode URI dan Buka WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
}

// Toast Notifikasi
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMsg');
    if (!toast || !msg) return;

    msg.innerText = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2500);
}

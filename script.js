/**
 * script.js - Logika Data, Sinkronisasi LocalStorage, dan Pemesanan WhatsApp
 * Website Seblak UMKM
 */

// Data Default Toko
const DEFAULT_SETTINGS = {
    shopName: "Seblak sultan",
    whatsappNumber: "6281234567890",
    address: "Jl. Kuliner Raya No. 45, Sentra Kuliner UMKM Nusantara",
    adminPassword: "makansantai"
};

// Data Default Menu
const DEFAULT_MENU = [
    {
        id: 1,
        name: "Seblak Komplit Spesial",
        category: "seblak",
        price: 18000,
        description: "Kerupuk basah, makaroni, sosis sapi, bakso, ceker empuk, siomay, dan telur campur kuah gurih.",
        badge: "Paling Laris 🔥",
        image: "img/seblak-1.jpg"
    },
    {
        id: 2,
        name: "Seblak Ceker Mercon",
        category: "seblak",
        price: 15000,
        description: "Ceker ayam super empuk melimpah dimasak dengan kuah kencur pedas mercon bikin merem melek.",
        badge: "Favorit Ceker 🍗",
        image: "img/seblak-2.jpg"
    },
    {
        id: 3,
        name: "Seblak Seafood Mewah",
        category: "seblak",
        price: 22000,
        description: "Dumpling keju, crabstick, fish roll, baso ikan, dan udang segar berpadu kuah rempah pedas segar.",
        badge: "Special Seafood 🦐",
        image: "img/seblak-3.jpg"
    },
    {
        id: 4,
        name: "Seblak Prasmanan Ori",
        category: "seblak",
        price: 10000,
        description: "Paket dasar seblak: aneka kerupuk mawar, makaroni, kwetiau, sawi hijau, bumbu kencur gurih.",
        badge: "Pilihan Hemat 💰",
        image: "img/seblak-4.jpg"
    },
    {
        id: 5,
        name: "Seblak Mie Jebew Bakso",
        category: "seblak",
        price: 14000,
        description: "Mie kenyal pedas gurih diaduk sambal cabe rawit segar dilengkapi 3 butir bakso sapi kenyal.",
        badge: "Pedas Nagih 🍜",
        image: "img/seblak-5.jpg"
    },
    {
        id: 6,
        name: "Seblak Jamur Enoki & Sosis",
        category: "seblak",
        price: 16000,
        description: "Jamur enoki segar bertekstur crunchy berpadu dengan sosis sapi potong dan kuah pedas kental.",
        badge: "Viral Enoki 🍄",
        image: "img/seblak-6.jpg"
    }
];

// ----------------------------------------------------
// FUNGSI PENYIMPANAN DATA (LOCAL STORAGE)
// ----------------------------------------------------

function getSettings() {
    const data = localStorage.getItem('seblak_settings');
    if (!data) {
        localStorage.setItem('seblak_settings', JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
    }
    return JSON.parse(data);
}

function saveSettings(settings) {
    localStorage.setItem('seblak_settings', JSON.stringify(settings));
}

function getMenu() {
    const data = localStorage.getItem('seblak_menu');
    if (!data) {
        localStorage.setItem('seblak_menu', JSON.stringify(DEFAULT_MENU));
        return DEFAULT_MENU;
    }
    return JSON.parse(data);
}

function saveMenu(menuList) {
    localStorage.setItem('seblak_menu', JSON.stringify(menuList));
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// ----------------------------------------------------
// LOGIKA HALAMAN UTAMA (index.html)
// ----------------------------------------------------

let cart = [];
let currentSelectedItem = null;
let activeCategory = 'all';

function initIndexPage() {
    const settings = getSettings();
    
    // Tampilkan kontak & info toko
    const shopNameEls = document.querySelectorAll('.shop-name');
    shopNameEls.forEach(el => el.innerText = settings.shopName);

    const waDisplay = document.getElementById('displayPhone');
    if (waDisplay) waDisplay.innerText = settings.whatsappNumber;

    const addrDisplay = document.getElementById('displayAddress');
    if (addrDisplay) addrDisplay.innerText = settings.address;

    // Load keranjang
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
}

function renderMenu(items = null) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (!items) {
        items = getMenu();
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-stone-400">
                <i class="fa-solid fa-utensils text-4xl mb-3 block"></i>
                <p class="text-sm font-semibold">Belum ada menu yang tersedia.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="food-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm">
            <div>
                <div class="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover" onerror="this.src='img/foto-utama.jpg'">
                    ${item.badge ? `
                        <span class="absolute top-2.5 left-2.5 bg-red-600/90 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
                            ${item.badge}
                        </span>
                    ` : ''}
                </div>

                <div class="p-4 space-y-2">
                    <h3 class="font-bold text-stone-900 text-sm sm:text-base leading-tight">${item.name}</h3>
                    <p class="text-xs text-stone-500 line-clamp-2 leading-relaxed">${item.description || 'Porsi nikmat dengan rempah kencur khas seblak.'}</p>
                </div>
            </div>

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

function filterCategory(category) {
    activeCategory = category;
    
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

function handleSearch() {
    const query = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    const allItems = getMenu();
    
    const filtered = allItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesQuery = item.name.toLowerCase().includes(query) || (item.description && item.description.toLowerCase().includes(query));
        return matchesCategory && matchesQuery;
    });

    renderMenu(filtered);
}

function openCustomizeModal(itemId) {
    const items = getMenu();
    const item = items.find(m => m.id === itemId);
    if (!item) return;

    currentSelectedItem = item;
    document.getElementById('modalItemTitle').innerText = item.name;
    document.getElementById('modalItemPrice').innerText = formatRupiah(item.price);
    document.getElementById('modalItemNotes').value = '';

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

function confirmAddToCart() {
    if (!currentSelectedItem) return;

    const level = currentSelectedItem.category === 'minuman' 
        ? '-' 
        : document.getElementById('modalSpicyLevel').value;
    const notes = document.getElementById('modalItemNotes').value.trim();

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

function removeCartItem(cartId) {
    cart = cart.filter(c => c.cartId !== cartId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('seblak_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const badge = document.getElementById('cartCountBadge');
    if (badge) {
        badge.innerText = totalItems;
    }

    const totalItemsText = document.getElementById('cartTotalItemsText');
    const totalPriceText = document.getElementById('cartTotalPriceText');
    if (totalItemsText) totalItemsText.innerText = `${totalItems} Porsi`;
    if (totalPriceText) totalPriceText.innerText = formatRupiah(totalPrice);

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

function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) modal.classList.toggle('hidden');
}

function toggleAddressField() {
    const orderType = document.getElementById('orderType').value;
    const addressGroup = document.getElementById('addressGroup');
    if (orderType.includes('Delivery')) {
        addressGroup.classList.remove('hidden');
    } else {
        addressGroup.classList.add('hidden');
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong!');
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
        alert('Mohon isi Alamat Pengiriman!');
        document.getElementById('custAddress')?.focus();
        return;
    }

    const generalNotes = document.getElementById('custNotes')?.value.trim();
    const settings = getSettings();

    let message = `*HALO ADMIN ${settings.shopName.toUpperCase()}*\n`;
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

    message += `\nMohon konfirmasi ketersediaan pesanan ya kak, terima kasih! 🙏`;

    const encoded = encodeURIComponent(message);
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
}

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

// ----------------------------------------------------
// LOGIKA PANEL ADMIN (admin.html)
// ----------------------------------------------------

function initAdminPage() {
    const isAuthenticated = sessionStorage.getItem('seblak_admin_logged_in') === 'true';
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');

    if (isAuthenticated) {
        if (loginSection) loginSection.classList.add('hidden');
        if (adminPanel) adminPanel.classList.remove('hidden');
        loadAdminData();
    } else {
        if (loginSection) loginSection.classList.remove('hidden');
        if (adminPanel) adminPanel.classList.add('hidden');
    }
}

function checkAdminLogin(event) {
    if (event) event.preventDefault();
    const passInput = document.getElementById('adminPasswordInput')?.value;
    const settings = getSettings();

    if (passInput === settings.adminPassword) {
        sessionStorage.setItem('seblak_admin_logged_in', 'true');
        initAdminPage();
    } else {
        alert('Kata sandi salah! Silakan coba lagi.');
    }
}

function adminLogout() {
    sessionStorage.removeItem('seblak_admin_logged_in');
    window.location.reload();
}

function loadAdminData() {
    const settings = getSettings();
    const menu = getMenu();

    // Populate Settings Form
    if (document.getElementById('setShopName')) {
        document.getElementById('setShopName').value = settings.shopName;
        document.getElementById('setWhatsapp').value = settings.whatsappNumber;
        document.getElementById('setAddress').value = settings.address;
        document.getElementById('setAdminPassword').value = settings.adminPassword;
    }

    // Render Menu Table
    const tbody = document.getElementById('adminMenuTableBody');
    if (!tbody) return;

    if (menu.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-stone-400">Belum ada menu di database.</td></tr>`;
        return;
    }

    tbody.innerHTML = menu.map((item, index) => `
        <tr class="border-b border-stone-200 hover:bg-stone-50 text-xs sm:text-sm">
            <td class="py-3 px-4 font-bold text-stone-700">${index + 1}</td>
            <td class="py-3 px-4 flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg border border-stone-200" onerror="this.src='img/foto-utama.jpg'">
                <div>
                    <span class="font-bold text-stone-900 block">${item.name}</span>
                    <span class="text-[11px] text-stone-400 uppercase">${item.category}</span>
                </div>
            </td>
            <td class="py-3 px-4 font-extrabold text-red-600">${formatRupiah(item.price)}</td>
            <td class="py-3 px-4 text-stone-500 max-w-xs truncate">${item.description || '-'}</td>
            <td class="py-3 px-4 text-right space-x-2">
                <button onclick="editMenuItem(${item.id})" class="px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-xs border border-amber-200">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button onclick="deleteMenuItem(${item.id})" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs border border-red-200">
                    <i class="fa-solid fa-trash"></i> Hapus
                </button>
            </td>
        </tr>
    `).join('');
}

function saveAdminSettings(event) {
    if (event) event.preventDefault();
    const settings = {
        shopName: document.getElementById('setShopName').value.trim(),
        whatsappNumber: document.getElementById('setWhatsapp').value.trim(),
        address: document.getElementById('setAddress').value.trim(),
        adminPassword: document.getElementById('setAdminPassword').value.trim() || 'makansantai'
    };

    saveSettings(settings);
    alert('Pengaturan toko berhasil disimpan!');
}

function openAddMenuModal() {
    document.getElementById('menuFormTitle').innerText = 'Tambah Menu Seblak Baru';
    document.getElementById('menuFormId').value = '';
    document.getElementById('menuFormName').value = '';
    document.getElementById('menuFormCategory').value = 'seblak';
    document.getElementById('menuFormPrice').value = '';
    document.getElementById('menuFormBadge').value = '';
    document.getElementById('menuFormImage').value = 'img/seblak-1.jpg';
    document.getElementById('menuFormDesc').value = '';
    
    document.getElementById('menuModal').classList.remove('hidden');
}

function editMenuItem(id) {
    const menu = getMenu();
    const item = menu.find(m => m.id === id);
    if (!item) return;

    document.getElementById('menuFormTitle').innerText = 'Edit Menu Seblak';
    document.getElementById('menuFormId').value = item.id;
    document.getElementById('menuFormName').value = item.name;
    document.getElementById('menuFormCategory').value = item.category || 'seblak';
    document.getElementById('menuFormPrice').value = item.price;
    document.getElementById('menuFormBadge').value = item.badge || '';
    document.getElementById('menuFormImage').value = item.image;
    document.getElementById('menuFormDesc').value = item.description || '';

    document.getElementById('menuModal').classList.remove('hidden');
}

function closeMenuModal() {
    document.getElementById('menuModal').classList.add('hidden');
}

function saveMenuItem(event) {
    if (event) event.preventDefault();
    const id = document.getElementById('menuFormId').value;
    const name = document.getElementById('menuFormName').value.trim();
    const category = document.getElementById('menuFormCategory').value;
    const price = parseInt(document.getElementById('menuFormPrice').value) || 0;
    const badge = document.getElementById('menuFormBadge').value.trim();
    const image = document.getElementById('menuFormImage').value.trim() || 'img/foto-utama.jpg';
    const description = document.getElementById('menuFormDesc').value.trim();

    if (!name || price <= 0) {
        alert('Mohon isi nama menu dan harga yang valid!');
        return;
    }

    let menu = getMenu();

    if (id) {
        // Edit existing
        const index = menu.findIndex(m => m.id == id);
        if (index > -1) {
            menu[index] = { ...menu[index], name, category, price, badge, image, description };
        }
    } else {
        // Create new
        const newId = menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1;
        menu.push({ id: newId, name, category, price, badge, image, description });
    }

    saveMenu(menu);
    closeMenuModal();
    loadAdminData();
    alert('Menu berhasil disimpan!');
}

function deleteMenuItem(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;
    let menu = getMenu();
    menu = menu.filter(m => m.id !== id);
    saveMenu(menu);
    loadAdminData();
}

function resetDataToDefault() {
    if (!confirm('Peringatan: Seluruh data menu dan pengaturan akan dikembalikan ke setelan awal. Lanjutkan?')) return;
    localStorage.removeItem('seblak_menu');
    localStorage.removeItem('seblak_settings');
    localStorage.removeItem('seblak_cart');
    alert('Data berhasil di-reset ke setelan awal!');
    window.location.reload();
}
